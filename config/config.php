<?php

require 'constants.php';

/* Inicializa sesión */
session_start();

/* Función de carga de las clases */
function classLoader($class) {
    include_once ROOT . "/app/classes/" . $class . ".php";
}

/* Registra la clase como autoload */
spl_autoload_register("classLoader");

/**
 * Genera JSON de web response
 * @param	$status		'OK', 'NOK, 0 , 1 // 0 -> 'OK' ; 1 -> 'NOK'
 * @param	$message	a message
 * @return				json utf-8 encoded, with status and message
 */
function web_response_body($status, $message = '') {
	
	$status = $status === 0 ? 'OK' : $status;
	$status = $status === 1 ? 'NOK' : $status;
	
	strtoupper($status);
	
	if( $status != 'OK' && $status != 'NOK' && $status != 'CHANGE') {
		http_response_code(500);
		throw new Exception(INVALID_RESPONSE_STATUS);
	}
	
	return json_encode(array('status' => $status, 'msg' => $message));
}

/**
 * Setea header de HTTP response y lanza excepción con un message tipo string
 * @param integer $httpErrCode
 * @param string $errMsg
 * @throws Exception
 */
function throwHttpError($httpErrCode, string $errMsg) {
	http_response_code($httpErrCode);
	throw new Exception($errMsg);
}

/**
 * Extrae el request body de un POST y lo retorna en array asociativo
 * @return array asociativo con el body
 */
/*function web_request_body() {
	
	$requestBody = file_get_contents('php://input');
	$requestBody = isset($requestBody) ? json_decode($requestBody, true) : $requestBody;
	return $requestBody;
}*/