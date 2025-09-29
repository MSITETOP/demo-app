import os
import json
import base64
import requests
from urllib.parse import parse_qs
from libs.applogs import logger
from libs.db import pool, installApp

async def handler(event, context):
    postQuery = base64.b64decode(event.get("body").encode('ascii')).decode('ascii')
    arPost = dict((k, v[-1] if isinstance(v, list) else v)
      for k, v in parse_qs(postQuery).items())
       
    logger.debug(arPost)

    if arPost['PLACEMENT'] == 'DEFAULT':
            member_id = arPost['member_id']
            client_endpoint = f'https://{event["queryStringParameters"]["DOMAIN"]}/rest/'
            access_token = arPost['AUTH_ID']
            refresh_token = arPost['REFRESH_ID']
    else:
            member_id = arPost['auth[member_id]']
            client_endpoint = arPost['auth[client_endpoint]']
            access_token = arPost['auth[access_token]']
            refresh_token = arPost['auth[refresh_token]']

    try:
        installApp(pool, member_id, client_endpoint, access_token, refresh_token)
    except Exception as e:
        logger.error(f"installApp {e}") 
        
    try:
        host = event.get('headers').get('Host')
        data = {
            "auth": access_token,
            "event":"OnAppUninstall",
            "handler":f"https://{host}/uninstall"

        }
        logger.info(f"{host} {data}")
        response = requests.post(f"{client_endpoint}event.bind", data=data, timeout=5)
        response.raise_for_status()
        if response.status_code != 200:
            logger.error(f"Ошибка: {response.status_code}")
    except Exception as e:
        logger.error(f"Произошла ошибка при выполнении запроса: {e}")
        
    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'text/html',
        },  
        'body': '<html><head><script src="//api.bitrix24.com/api/v1/"></script><script>BX24.init(function(){ BX24.installFinish(); });</script></head></html>',
    }