<?php

require_once 'src/models/User.php';
require_once 'src/repositories/UserRepository.php';


class RegisterController
{
    public function register()
    {
        $body = file_get_contents('php://input');
        $data = json_decode($body, true);






        $user = new User(
            $data["name"],
            $data["surname"],
            $data["login"],
            $data["email"],
            $data["password"]
        );

        $userRepository = new UserRepository();
        $userRepository->saveUser($user);



    }

}
