import os
from libs.applogs import logger
from libs.db import getPortals,increaseRefreshCount, portalUpdate
from b24pysdk import BitrixToken, BitrixApp
from b24pysdk.error import BitrixAPIError, BitrixTimeout

def handler(event, context):  
    bitrix_app = BitrixApp(client_id=os.getenv('client_id'), client_secret=os.getenv('client_secret'))

    portals = getPortals()

    for portal in portals:  
        # logger.debug(f"Портал: {portal}") 
        member_id = portal.get("member_id","")
        auth_token = portal.get("access_token","")
        refresh_token = portal.get("refresh_token","")
        domain = portal.get("client_endpoint","").replace("http://","").replace("https://","").replace("/rest/","")
        refresh_count = portal.get("refresh_count", 0) or 0

        bitrix_token = BitrixToken(
            domain=domain,
            auth_token=auth_token,
            refresh_token=refresh_token,
            bitrix_app=bitrix_app,
        )

        newToken = {}
        try:
            newToken = bitrix_token.refresh()
            logger.debug(f"Новые креды портала {domain} ({member_id}): {newToken}") 
            portalUpdate(member_id, newToken)
        except BitrixTimeout:
            logger.error(f"Таймаут обновления токенов портала {domain} ({member_id}); Попыток: {refresh_count}") 
            refresh_count += 1
            increaseRefreshCount(member_id, refresh_count)
        except BitrixAPIError as e:
            logger.error(f"Ошибка портала {domain} ({member_id}): {e.error} {e.error_description}; Попыток: {refresh_count}") 
            refresh_count += 1
            increaseRefreshCount(member_id, refresh_count)

    return {
        'statusCode': 200,
        'body': 'ok',
    }