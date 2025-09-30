import os
import json
import uuid
import base64
import requests
from urllib.parse import parse_qs
from libs.applogs import logger
from libs.db import activitysGet

async def handler(event, context):
    params = json.loads(event.get('body', '{}'))
    logger.debug(params)

    member_id = params.get('member_id', '')

    if not member_id:
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

    activities = []
    try:
        robots = activitysGet(member_id)
        for r in robots:
            logger.debug(r)
            activities.append({
                "id": r["id"],
                "name": r["name"],
                "usage": r["counter"]
            })
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
        'body': {
        "limit": 3000,
        "activities": activities
    }
    }