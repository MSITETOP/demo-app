import os
import json
import uuid
import base64
import requests
from urllib.parse import parse_qs
from libs.applogs import logger
from libs.db import activityGet

async def handler(event, context):
    params = json.loads(event.get('body', '{}'))
    logger.debug(params)

    elid = params.get('id', False)
    member_id = params.get('member_id', '')

    if not elid or not member_id:
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
        robot = activityGet(member_id, elid)
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
        
    return {
        'statusCode': 200,
        'headers': {
            'content-type':'application/json'
        },
        'body': robot
    }