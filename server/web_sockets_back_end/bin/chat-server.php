<?php
header("Access-Control-Allow-Origin: https://app.gottabenc.com, http://localhost:3000");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

use Ratchet\Server\IoServer;
use Ratchet\Http\HttpServer;
use Ratchet\WebSocket\WsServer;
use GottaBeNCChat\Chat;

    require dirname(__DIR__) . '/vendor/autoload.php';
    
    // Create secure server
    /*
		$loop = React\EventLoop\Factory::create();
		$webSock = new Server('0.0.0.0:3000', $loop);
		$webSock = new SecureServer($webSock, $loop, array(
		    'local_cert' => '/path/to/your/certificate.pem',
		    'local_pk' => '/path/to/your/private.key',
	    	'allow_self_signed' => false,
    		'verify_peer' => false
		));
*/
    $server = IoServer::factory(
        new HttpServer(
            new WsServer(
                new Chat()
            )
        ),
        3000
    );

    $server->run();
