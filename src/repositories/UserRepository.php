<?php

require_once 'Repository.php';
require_once 'src/models/User.php';
require_once 'src/models/Item.php';

class UserRepository extends Repository
{
    const ERROR_CODES = [
        23505 => "UNIQUE VIOLATION",
        23502 => "NOT NULL VIOLATION",
        23503 => "FOREIGN KEY VIOLATION"
    ];


    /**
     * @throws Exception
     */
    public function saveUser(User $user)
    {

        $this->database->connect();
        $stmt = $this->database->connect()->prepare(
            'INSERT INTO users (name, surname, login, email, password) VALUES(?, ?, ?, ?, ?) RETURNING id;'
        );

        try {

            $stmt->execute([
                $user->getName(),
                $user->getSurname(),
                $user->getLogin(),
                $user->getEmail(),
                $user->getPassword()
            ]);


            $result = $stmt->fetch();
            return $result['id'];

        } catch (Exception $exception) {
            throw new Exception(self::ERROR_CODES[$exception->getCode()]);
        }

    }


    /**
     * @throws Exception
     */
    public function fetchUser($email)
    {

        $stmt =
            $this->
            database->
            connect()->
            prepare('
                SELECT * FROM users WHERE email=:email;
            ');


        $stmt->bindParam(':email', $email);
        $stmt->execute();

        $result = $stmt->fetch(PDO::FETCH_ASSOC);


        # Check if user is found, if not throw exception:
        if (empty($result))
            throw new Exception('User not found');


        return $result;

    }

    /**
     * @throws Exception
     */
    public function saveItem($uid, Item $item)
    {
        $stmt = $this->database->connect()->prepare('
            INSERT INTO items (user_id, title, description) VALUES(?, ?, ?);
        ');


        try {

            $stmt->execute([
                $uid,
                $item->getTitle(),
                $item->getDescription()
            ]);

        } catch (PDOException $exception) {

            # This should never happen.
            if ($exception->getCode() == 23503)
                die();

            throw new Exception("Database error");
        }

    }

    /**
     * @throws Exception
     */
    public function saveAvatarColor($color, $uid)
    {
        $stmt = $this->database->connect()->prepare('
            INSERT INTO avatars (color, "user") VALUES(?, ?);
        ');

        try {
            $stmt->execute([
                $color,
                $uid
            ]);

        } catch (PDOException $exception) {
            echo $uid;
            echo $color;
            echo $exception;
            throw new Exception('Avatar error.');
        }


    }


    /**
     * @throws Exception
     */
    public function fetchAvatarColor($uid)
    {
        $stmt = $this->database->connect()->prepare('
            SELECT * FROM avatars WHERE "user"=:id; 
        ');

        $stmt->bindParam(':id', $uid);
        $stmt->execute();


        $result = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!isset($result['color']))
            throw new Exception('Avatar error');

        return $result['color'];


    }

}