<?php

require_once 'Repository.php';
require_once 'src/models/User.php';

class UserRepository extends Repository
{

    const MESSAGES = [
        23505 => 'Email or login already exists.'
    ];

    public function saveUser(User $user)
    {
        $this->database->connect();
        $stmt = $this->database->connect()->prepare(
            'INSERT INTO users (name, surname, login, email, password) VALUES(?, ?, ?, ?, ?);'
        );

        try {

            $stmt->execute([
                $user->getName(),
                $user->getSurname(),
                $user->getLogin(),
                $user->getEmail(),
                $user->getPassword()
            ]);

        } catch (PDOException $e) {
            # FIXME: Add better exception!
        }

    }

}