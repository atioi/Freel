<?php

require "AppController.php";

class ViewController extends AppController
{

    public function index(){
        $this->render("index");
    }

    public function login()
    {
        $this->render("login");
    }

}

