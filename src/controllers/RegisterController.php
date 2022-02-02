<?php

require_once 'src/models/User.php';
require_once 'src/repositories/UserRepository.php';


class RegisterController
{
    public function register()
    {
        $body = file_get_contents('php://input');
        $data = json_decode($body, true);

        $name = $data["name"];
        $surname = $data["surname"];
        $login = $data['login'];
        $email = $data["email"];
        $password = $data["password"];
        $confirmation = $data["confirmation"];

        try {

            $this->arePasswordEqual($password, $confirmation);

            # Password hashing:
            $hash = password_hash($_POST['password'], PASSWORD_BCRYPT, array('cost' => 9));

            $user = new User(
                $name,
                $surname,
                $login,
                $email,
                $hash
            );

            $userRepository = new UserRepository();
            $userRepository->saveUser($user);

        } catch (Exception $exception) {

        }

    }


    /**
     * @throws Exception
     */
    private function arePasswordEqual($password, $password_confirmation)
    {
        if (!$password == $password_confirmation)
            throw new Exception('Passwords do not match.');
    }



}
