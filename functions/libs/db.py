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

def install_app(session_pool, member_id, client_endpoint, access_token, refresh_token):
    def callee(session):
            query = f"""
                DECLARE $member_id AS Utf8;
                DECLARE $client_endpoint AS Utf8;
                DECLARE $access_token AS Utf8;
                DECLARE $refresh_token AS Utf8;
                UPSERT 
                INTO `portals`  ( `member_id`, `client_endpoint`, `access_token`, `refresh_token`, `timestamp` ) 
                VALUES ( $member_id, $client_endpoint, $access_token, $refresh_token, CurrentUtcTimestamp() );

                UPSERT 
                INTO `robots`  ( `member_id`, `counter`, `name`, `input_params`, `output_params`, `code` ) 
                VALUES ( 
                    $member_id, 
                    0, 
                    "Тестовое активити",
                    CAST([{"name": "field_input_1", "desc": "Поле 1 ", "value": "5"}, {"name": "field_input_2", "desc": "Поле 2", "value": "4"}] as Json), 
                    CAST([{"name": "field_output_1", "desc": "Результат строка", "multiple": False}, {"name": "field_output_2", "desc": "Множественная строка", "multiple": True}] as Json),
                    "Ly8g0J/RgNC40LzQtdGAINCw0LrRgtC40LLQuNGC0Lgg0YEg0LjRgdC/0L7Qu9GM0LfQvtCy0LDQvdC40LXQvCBwYXJhbXMg0LggbG9nZ2VyCmxvZ2dlci5pbmZvKCLQkNC60YLQuNCy0LjRgtC4INC30LDQv9GD0YnQtdC90L4iKTsKCi8vINCf0L7Qu9GD0YfQtdC90LjQtSDQstGF0L7QtNGP0YnQuNGFINC/0LDRgNCw0LzQtdGC0YDQvtCyCmNvbnN0IGlucHV0MSA9IHBhcmFtc1siZmllbGRfaW5wdXRfMSJdOwpjb25zdCBpbnB1dDIgPSBwYXJhbXNbImZpZWxkX2lucHV0XzIiXTsKCmxvZ2dlci5kZWJ1Zygi0JLRhdC+0LTRj9GJ0LjQtSDQv9Cw0YDQsNC80LXRgtGA0Ys6IiwgeyBpbnB1dDEsIGlucHV0MiB9KTsKCi8vINCe0LHRgNCw0LHQvtGC0LrQsCDQtNCw0L3QvdGL0YUKdHJ5IHsKICAvLyDQn9GA0L7RgdGC0YvQtSDQstGL0YfQuNGB0LvQtdC90LjRjyDQtNC70Y8g0LTQtdC80L7QvdGB0YLRgNCw0YbQuNC4CiAgY29uc3Qgc3VtID0gTnVtYmVyKGlucHV0MSkgKyBOdW1iZXIoaW5wdXQyKTsKICBjb25zdCBwcm9kdWN0ID0gTnVtYmVyKGlucHV0MSkgKiBOdW1iZXIoaW5wdXQyKTsKICAKICBsb2dnZXIuaW5mbygi0JLRi9GH0LjRgdC70LXQvdC40Y8g0LLRi9C/0L7Qu9C90LXQvdGLIiwgeyBzdW0sIHByb2R1Y3QgfSk7CiAgCiAgLy8g0KPRgdGC0LDQvdC+0LLQutCwINC40YHRhdC+0LTRj9GJ0LjRhSDQv9Cw0YDQsNC80LXRgtGA0L7QsgogIHBhcmFtc1siZmllbGRfb3V0cHV0XzEiXSA9IHN1bTsKICBwYXJhbXNbImZpZWxkX291dHB1dF8yIl0gPSBbcHJvZHVjdF07CiAgCiAgbG9nZ2VyLmluZm8oItCe0LHRgNCw0LHQvtGC0LrQsCDQt9Cw0LLQtdGA0YjQtdC90LAg0YPRgdC/0LXRiNC90L4iKTsKICAKfSBjYXRjaCAoZXJyb3IpIHsKICBsb2dnZXIuZXJyb3IoItCe0YjQuNCx0LrQsCDQv9GA0Lgg0L7QsdGA0LDQsdC+0YLQutC1OiIsIGVycm9yKTsKICB0aHJvdyBlcnJvcjsKfQ=="
                );
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
    return session_pool.retry_operation_sync(callee)
