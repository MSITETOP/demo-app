import os
import json
import uuid
import base64
import requests
from urllib.parse import parse_qsl
from libs.applogs import logger
from libs.db import activityGet, portalGet, increaseCount

def handler(event, context):
    body = base64.b64decode(event["messages"][0]["details"]["message"]["body"]).decode('utf-8')
    data = dict(parse_qsl(body))
    # {'workflow_id': '68c9331a5f3a55.48452815', 'code': 'activity_f597ea97-f835-4367-94b9-3f6f42f8fe64', 'document_id[0]': 'tasks', 'document_id[1]': 'Bitrix\\Tasks\\Integration\\Bizproc\\Document\\Task', 'document_id[2]': '49728', 'document_type[0]': 'tasks', 'document_type[1]': 'Bitrix\\Tasks\\Integration\\Bizproc\\Document\\Task', 'document_type[2]': 'TASK_PLAN_582', 'event_token': '68c9331a5f3a55.48452815|A8071_9616_32705_17951|CqUJbsHUqnMnu3botY6vzGSlGug5ovZh.8c663699845e9becf25d13583eff83e7d78b8c4a7d1055ab55830f64e7f559c3', 'properties[field_input_1]': '6', 'properties[field_input_2]': '2', 'timeout_duration': '0', 'ts': '1758016282', 'auth[access_token]': '2a41c968007bcbf00005bbdf000000010000008d15027e7f3155d71ace401c9383038c', 'auth[expires]': '1758019882', 'auth[expires_in]': '3600', 'auth[scope]': 'crm,bizproc', 'auth[domain]': 'portal.ipg.digital', 'auth[server_endpoint]': 'https://oauth.bitrix24.tech/rest/', 'auth[status]': 'L', 'auth[client_endpoint]': 'https://portal.ipg.digital/rest/', 'auth[member_id]': '362c1663e59da74887e85513efa10a6a', 'auth[user_id]': '1', 'auth[refresh_token]': '1ac0f068007bcbf00005bbdf00000001000000c5a82783fd51d58d5545feaeaeb61faa', 'auth[application_token]': '5a98ef3082e09bff567d11556b11b8af'}
    
    event_token = data.get("event_token","")
    member_id = data.get("auth[member_id]")
    eventAccessToken = data.get("auth[access_token]","")

    # достаем code без "activity_"
    code = data.get("code", "").replace("activity_", "", 1)

    # собираем все properties
    properties = {
        k[len("properties["):-1]: v
        for k, v in data.items()
        if k.startswith("properties[")
    }

    logger.debug(f"member_id: {member_id}; code: {code}; properties: {properties}; event_token: {event_token}")

    if not code or not member_id or not event_token:
        logger.error(f"member_id: {member_id};")
        return {
            'statusCode': 400,
            'headers': {
                'content-type':'application/json'
            },
            'body': {
                'status': 'error'
            }
        }

    try:
        robot = activityGet(member_id, code)
        portal = portalGet(member_id)
    except Exception as e:
        logger.error(f"activity_get {e}") 
        return {
            'statusCode': 400,
            'headers': {
                'content-type':'application/json'
            },
            'body': {
                'status': 'error'
            }
        }
    
    logger.debug(robot)
    increaseCount(member_id, code, int(robot.get("counter", 0)))

    try:
        in_params = [{"name": k, "value": v} for k, v in properties.items()]
        output_params_db = json.loads(robot.get("output_params", "[]"))
        out_params = [
            {"name": v.get("code", ""), "multiple": v.get("isMultiple", False)}
            for v in output_params_db
        ]
        payload = {
            "accessToken": portal.get("access_token"),
            "domain": portal.get("client_endpoint").replace("http://","").replace("https://","").replace("/rest/",""),
            "eventAccessToken": eventAccessToken,
            "memberId": member_id,
            "eventToken": event_token,
            "inParams": in_params,         
            "outParams": out_params,               
            "activityCode": robot["code"]
        }

        logger.debug(f"eval payload: {payload}")

        resp = requests.post(
            "https://roborest.ipgpromo.ru/eval",
            json=payload,
            timeout=240
        )
        resp.raise_for_status()
        result = resp.json()

        logger.debug(f"eval response: {result}")
    except Exception as e:
        logger.error(f"eval error: {e}")
        raise Exception(f"eval error: {e}")

    return {
        'statusCode': 200,
        'body': 'ok',
    }