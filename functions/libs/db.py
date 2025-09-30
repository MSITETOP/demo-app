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

def installApp(member_id, client_endpoint, access_token, refresh_token):
    def callee(session):
            query = f"""
                DECLARE $member_id AS Utf8;
                DECLARE $client_endpoint AS Utf8;
                DECLARE $access_token AS Utf8;
                DECLARE $refresh_token AS Utf8;
                UPSERT 
                INTO `portals`  ( `member_id`, `client_endpoint`, `access_token`, `refresh_token`, `timestamp` ) 
                VALUES ( $member_id, $client_endpoint, $access_token, $refresh_token, CurrentUtcTimestamp() );
            """		
            session.transaction().execute(
                session.prepare(query),
                {
                    '$member_id': member_id,
                    '$client_endpoint': client_endpoint,
                    '$access_token': access_token,
                    '$refresh_token': refresh_token
                },
                commit_tx=True,
                settings=ydb.BaseRequestSettings().with_timeout(3).with_operation_timeout(2),
            )
            return True
    return pool.retry_operation_sync(callee)

def activitySet(member_id, elid, name, input_params, output_params, code):
    logger.debug([member_id, elid, name, input_params, output_params, code])
    def callee(session):
                query = f"""
                    DECLARE $member_id AS Utf8;
                    DECLARE $elid AS Utf8;
                    DECLARE $name AS Utf8;
                    DECLARE $input_params AS Json;
                    DECLARE $output_params AS Json;
                    DECLARE $code AS Utf8;

                    UPSERT 
                    INTO `robots`  ( `id`, `member_id`, `name`, `input_params`, `output_params`, `code` ) 
                    VALUES ( 
                        $elid, 
                        $member_id, 
                        $name,
                        $input_params,
                        $output_params,
                        $code
                    );		
                """
                session.transaction().execute(
                    session.prepare(query),
                    {
                        '$elid': elid,
                        '$member_id': member_id,
                        '$name': name,
                        '$input_params': json.dumps(input_params),
                        '$output_params': json.dumps(output_params),
                        '$code': code
                    },
                    commit_tx=True,
                    settings=ydb.BaseRequestSettings().with_timeout(3).with_operation_timeout(2),
                )
                return True
    return pool.retry_operation_sync(callee)

def activityDel(member_id, elid):
    def callee(session):
                query = f"""
                    DECLARE $member_id AS Utf8;
                    DECLARE $elid AS Utf8;

                    DELETE FROM `robots` WHERE `id` = $elid AND `member_id` = $member_id;	
                """
                session.transaction().execute(
                    session.prepare(query),
                    {
                        '$elid': elid,
                        '$member_id': member_id
                    },
                    commit_tx=True,
                    settings=ydb.BaseRequestSettings().with_timeout(3).with_operation_timeout(2),
                )
                return True
    return pool.retry_operation_sync(callee)
