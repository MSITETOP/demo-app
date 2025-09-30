import os
import json
import base64
import requests
from urllib.parse import parse_qs
from libs.applogs import logger
from libs.db import installApp, activitySet

async def handler(event, context):
    postQuery = base64.b64decode(event.get("body").encode('ascii')).decode('ascii')
    arPost = dict((k, v[-1] if isinstance(v, list) else v)
      for k, v in parse_qs(postQuery).items())
       
    logger.debug(arPost)

    if arPost.get("data[CLEAN]", "0") == "1":
        pass
        
    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'text/html',
        },  
        'body': 'ok',
    }