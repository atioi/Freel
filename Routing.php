<?php

class Routing
{

    private static $routes = [];

    public static function get($action, $controller)
    {
        self::$routes['GET'][$action] = $controller;
    }

    public static function post($action, $controller)
    {
        self::$routes['POST'][$action] = $controller;
    }


    public static function run($action)
    {
        $method = $_SERVER["REQUEST_METHOD"];

        try {

            if (!array_key_exists($method, self::$routes))
                throw new Exception('There is no defined method.');

            if (!array_key_exists($action, self::$routes[$method]))
                throw new Exception("There is no defined action");

            echo self::$routes[$method][$action];

        } catch (Exception $e) {
            http_response_code(404);
            die('404');
        }

    }


}