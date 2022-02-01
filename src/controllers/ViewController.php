<?php

require "AppController.php";

class ViewController extends AppController
{
    public function login()
    {
        $this->render("login");
    }

}

