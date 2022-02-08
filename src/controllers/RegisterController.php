<?php

require_once 'src/models/User.php';
require_once 'src/repositories/UserRepository.php';


class RegisterController
{

    public function register()
    {
        $body = file_get_contents('php://input');
        $data = json_decode($body, true);

        # Hash password.
        $hash = password_hash($data['password'], PASSWORD_BCRYPT, array('cost' => 9));

        $user = new User(
            $data['name'],
            $data['surname'],
            $data['login'],
            $data['email'],
            $hash
        );

        try {

            $userRepository = new UserRepository();
            $uid = $userRepository->saveUser($user);
            $userRepository->saveAvatarColor($data['color'], $uid);

        } catch (Exception $exception) {

            /*
             *  Catch exceptions from database including unique, and not null violation.
             *
             * */

            http_response_code(400);
            echo $exception->getMessage();

        }

    }

}
