<?php

class LoginController
{

    public function login()
    {
        $body = file_get_contents('php://input');
        $body = json_decode($body, true);


        try {

            $userRepository = new UserRepository();
            $data = $userRepository->fetchUser($body['email']);

            if (password_verify($body['password'], $data['password'])) {
                $this->set_session($data['id']);

            } else
                throw new Exception("Invalid data");


        } catch (Exception $exception) {
            echo $exception;
            http_response_code(400);
        }

    }

    public function logout()
    {
        session_start();
        $_SESSION = array();
    }


    private function set_session($uid)
    {
        session_start();
        $_SESSION['uid'] = $uid;
    }

}