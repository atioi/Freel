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


Routing::run($action);

