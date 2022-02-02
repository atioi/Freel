<?php

require_once "./src/models/User.php";


class RegisterController
{
    public function register()
    {
        $body = file_get_contents('php://input');
        $data = json_decode($body, true);
        echo var_dump($data);

        $user = new User(
            $data["name"],
            $data["surname"],
            $data["login"],
            $data["email"]
        );
    }

}
