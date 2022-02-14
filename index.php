<?php

require 'Routing.php';

$path = $_SERVER['REQUEST_URI'];
$path = parse_url($path, PHP_URL_PATH);
$path = trim($path, '/');
$path = explode('/', $path);

$action = $path[0];
$action = $action == "" ? "index" : $action;

Routing::get("index", "ViewController");
Routing::get("login", "ViewController");
Routing::get("register", "ViewController");
Routing::get("cockpit", "ViewController");
Routing::get("items", "ItemController");


Routing::post("register", "RegisterController");
Routing::post("login", "LoginController");
Routing::post("logout", "LoginController");
Routing::post("upload", "ItemController");
Routing::post("buy", "ItemController");


Routing::run($action);

