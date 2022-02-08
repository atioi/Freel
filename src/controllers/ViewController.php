<?php

require "AppController.php";

class ViewController extends AppController
{

    public function index()
    {
        $this->render("index");
    }

    public function login()
    {
        $this->render("login");
    }

    public function register()
    {
        $this->render("register");
    }

    public function dashboard()

    {
        session_start();

        if (!isset($_SESSION['uid'])) {
            http_response_code(401);
            $this->login();
        } else {
            $this->render("dashboard", ["name" => $_SESSION['name'], "color" => $_SESSION['color']]);
        }

    }

}

