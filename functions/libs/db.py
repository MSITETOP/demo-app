import os
import ydb
from libs.applogs import logger

try:
    driver = ydb.Driver(endpoint="grpcs://ydb.serverless.yandexcloud.net:2135/", database=os.getenv('ydb_database'), credentials=ydb.credentials_from_env_variables())
    driver.wait(fail_fast=True, timeout=5)
    pool = ydb.SessionPool(driver)
except Exception as e:
    logger.error(f"Ошибка при инициализации YDB драйвера: {e}")
    raise e

def deletePortal(member_id):
    def callee(session):
        query = f"""
            DECLARE $member_id AS Utf8;
            DELETE FROM portals
            WHERE member_id = $member_id;	
        """
        session.transaction().execute(
            session.prepare(query),
            {
                '$member_id': member_id
            },
            commit_tx=True,
            settings=ydb.BaseRequestSettings().with_timeout(3).with_operation_timeout(2),
        )
        return True
    return pool.retry_operation_sync(callee)

def increaseRefreshCount(member_id, refresh_count):
    def callee(session):
        if refresh_count > (24 * 30): # ошибки на протяжении 30 дней
            deletePortal(member_id)
            logger.error(f"Refresh_count не обновлялся больше месяца. Портал удален {member_id}")
        else:
            query = f"""
                DECLARE $member_id AS Utf8;
                DECLARE $refresh_count AS Int32;
                UPDATE portals
                SET refresh_count = $refresh_count
                WHERE member_id = $member_id;	
            """
            session.transaction().execute(
                session.prepare(query),
                {
                    '$member_id': member_id,
                    '$refresh_count': refresh_count
                },
                commit_tx=True,
                settings=ydb.BaseRequestSettings().with_timeout(3).with_operation_timeout(2),
            )
            return True
    return pool.retry_operation_sync(callee)

def portalUpdate(member_id, auth):
    def callee(session):
            query = f"""
                DECLARE $member_id AS Utf8;
                DECLARE $refresh_token AS Utf8;
                DECLARE $access_token AS Utf8;
                UPDATE portals
                SET 
                refresh_token = $refresh_token,
                access_token = $access_token,
                refresh_count = 0,
                timestamp = CurrentUtcTimestamp()
                WHERE member_id = $member_id;	
            """
            access_token = auth.get("access_token","")
            refresh_token = auth.get("refresh_token","")
            session.transaction().execute(
                session.prepare(query),
                {
                    '$member_id': member_id,
                    '$access_token': access_token,
                    '$refresh_token': refresh_token
                },
                commit_tx=True,
                settings=ydb.BaseRequestSettings().with_timeout(3).with_operation_timeout(2),
            )
            return True
    return pool.retry_operation_sync(callee)

def getPortals():
    def callee(session):
            query = f"SELECT * FROM `portals`;"
            result = session.transaction().execute(
                session.prepare(query),
                {},
                commit_tx=True,
                settings=ydb.BaseRequestSettings().with_timeout(3).with_operation_timeout(2),
            )
            return result[0].rows
    return pool.retry_operation_sync(callee)
