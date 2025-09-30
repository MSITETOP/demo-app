import os
import json
import uuid
import base64
import requests
from urllib.parse import parse_qs
from libs.applogs import logger
from libs.db import activitySet, activityDel

async def handler(event, context):
    params = json.loads(event.get('body', '{}'))
    logger.debug(params)

    elid = params.get('id', "0")
    if elid == "0":
        elid = str(uuid.uuid4())
    member_id = params.get('member_id', '')
    name = params.get('name', '')
    input_params = params.get('input_params', [])
    output_params = params.get('output_params', [])
    code = params.get('code', '')
    delete = params.get('del', False)

    if delete == True and member_id and params.get('id', '0') != '0':
        activityDel(member_id, elid)
        return {
            'statusCode': 200,
            'headers': {
                'content-type':'application/json'
            },
            'body': {
                'status': 'ok'
            }
        }

    if not member_id or not name or not code:
        logger.error(f"member_id: {member_id}; name: {name}; code: {code}")
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
        activitySet(member_id, elid, name, input_params, output_params, code)
    except Exception as e:
        logger.error(f"activitySet {e}") 
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
        'body': {
            'status': 'ok',
            'id': elid
        }
    }