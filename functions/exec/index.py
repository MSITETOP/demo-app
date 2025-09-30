import json
import logging
import base64
import traceback
from libs.applogs import logger
from b24pysdk import BitrixToken, BitrixApp
from b24pysdk.utils.types import JSONDict
from b24pysdk.error import BitrixAPIError, BitrixTimeout

logs = []

class MemoryHandler(logging.Handler):
    def emit(self, record):
        logs.append({
            "level": record.levelname.lower(),
            "message": record.getMessage(),
            "stack": getattr(record, "stack_info", None),
        })

memory_handler = MemoryHandler()
logger.addHandler(memory_handler)

def handler(event, context):
    global logs
    logs = []
    params = {}
    try:
        data = json.loads(event["body"])
        accessToken = data.get("accessToken")
        eventAccessToken = data.get("eventAccessToken")
        eventToken = data.get("eventToken", False)
        memberId = data.get("memberId")
        domain = data.get("domain").replace("http://","").replace("https://","").replace("/rest/","")

        if isinstance(data.get("inParams"), list):
            for item in data["inParams"]:
                params[item["name"]] = item["value"]

        if isinstance(data.get("outParams"), list):
            for item in data["outParams"]:
                if item.get("multiple", False) == True:
                    params[item["name"]] = []
                else:
                    params[item["name"]] = ""

        if not accessToken or not memberId or not domain:
            logger.error("Не переданы обязательные параметры")
            return {
                "statusCode": 200,
                "headers": {
                    "Content-Type": "application/json",
                    "Cache-Control": "no-cache"
                },
                "body": json.dumps({
                    "params": params,
                    "logs": logs
                }, ensure_ascii=False)
            }
        # Декодируем
        code = base64.b64decode(data["activityCode"]).decode("utf-8")

        bitrix_app = BitrixApp(client_id="", client_secret="")

        B24App = BitrixToken(
            domain=domain,
            auth_token=accessToken,
            bitrix_app=bitrix_app,
        )

        # Ограниченный scope
        safe_globals = {
            "__builtins__": __builtins__,
            "logger": logger,
            "params": params,
            "eventAccessToken": eventAccessToken,
            "accessToken": accessToken,
            "memberId": memberId,
            "domain": domain,
            "B24App": B24App
        }

        local_scope = {}
        exec(code, safe_globals, local_scope)

        if "result" in local_scope:
            params = local_scope["result"]

    except Exception as e:
        logger.error(str(e))
        logger.error(traceback.format_exc())

    if eventToken: # запуск из робота. нужно отправить результат
        try:
            params["logs"] = [
                f"{v.get('level')}: {v.get('message')}"
                for v in logs
            ]
            method_params:JSONDict = {
                "EVENT_TOKEN":eventToken,
                "RETURN_VALUES": params
            }
            logger.debug(method_params)
            logger.info(B24App.call_method(api_method="bizproc.event.send", params=method_params))
        except BitrixTimeout:
            logger.error("Не удалось отправить результат по таймауту для портала {domain} ({memberId})")
        except BitrixAPIError as e:
            logger.error(f"Ошибка отправки данных на портал {domain} ({memberId}): {e}")

    return {
        "statusCode": 200,
        "headers": {
            "Content-Type": "application/json",
            "Cache-Control": "no-cache"
        },
        "body": json.dumps({
            "params": params,
            "logs": logs
        }, ensure_ascii=False)
    }