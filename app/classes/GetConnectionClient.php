<?php

use GraphAware\Neo4j\Client\ClientBuilder; 

/**
 * Obtiene conexión a base de datos especificada en constructor
 *
 * @author kolesker
 */
class GetConnectionClient {
    
    private static $singleton = NULL;
    private $dbConfigFilePath;
    const NEO4J_USER = 'neo4j';
    const NEO4J_PASSWORD = 'mdr55hU!';
    
    private function __construct() {}
    public function __clone() {}
    
    /*-- CONSTRUCTOR --*/
    public static function create($database) {
        
        if(is_null(self::$singleton))
            self::$singleton = new getConnectionClient;
        
        return self::$singleton->connectTo($database);
    }
    /*----------------*/
    
    private function connectTo($database) {
        
        $database = $database ? strtolower($database) : NULL;
               
        switch($database) {
            
            case 'neo4j':
                $client = self::$singleton->connectNeo4j();
                break;
                
            case 'mysql':
            	$client = self::$singleton->connectMySql();
            	break;
            
            default:
                throw new Exception(INVALID_DB);
        }
        
        return $client;
    }
    
    private function connectNeo4j() {
        
        require_once '../../vendor/autoload.php';

        $client = ClientBuilder::create()
            ->addConnection('default', 'http://' . self::NEO4J_USER . ':' . self::NEO4J_PASSWORD . '@localhost:7474')
            ->build();
        
        return $client;
    }
    
    private function connectMySql() {
    	
    	$mysqli = new mysqli(MYSQL_SERVER, MYSQL_DB_USER, MYSQL_DB_PASSWORD, MYSQL_DB_NAME);
    	$mysqli->query("SET NAMES 'utf8'");
    	
    	if($mysqli->connect_error)
    		throw new Exception('No se puede conectar a MySQL (Error code: '. mysqli_connect_errno() .' - '. mysqli_connect_error()) . ')';
	
    	// Convierte automáticamente columnas integer y float a su tipo en PHP
    	$mysqli->options(MYSQLI_OPT_INT_AND_FLOAT_NATIVE, true);
    	
    	return $mysqli;
    }
    
}
