<?php

class User
{

    private $name;
    private $surname;
    private $email;
    private $login;

    public function __construct($name, $surname, $email, $login)
    {
        $this->name = $name;
        $this->surname = $surname;
        $this->email = $email;
        $this->login = $login;
    }

    /**
     * @return mixed
     */
    public function getLogin()
    {
        return $this->login;
    }

    /**
     * @return mixed
     */
    public function getEmail()
    {
        return $this->email;
    }

    /**
     * @return mixed
     */
    public function getSurname()
    {
        return $this->surname;
    }

    /**
     * @return mixed
     */
    public function getName()
    {
        return $this->name;
    }

}