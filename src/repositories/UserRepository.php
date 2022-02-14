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


    public function savePhoto($url, $iid)
    {
        $stmt_2 = $this->database->connect()->prepare('
            INSERT INTO photos (url, item) VALUES(?, ?);  
        ');

        $stmt_2->execute([
            $url,
            $iid
        ]);
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



    # Item uploading:

    /**
     * @throws Exception
     */
    public function saveItem($uid, Item $item)
    {

        $stmt = $this->database->connect()->prepare('SELECT add_item(:title, :description, :longitude, :latitude, :user_id);');

        # Coordinates:
        $longitude = $item->getLocalization()['longitude'];
        $latitude = $item->getLocalization()['latitude'];

        $title = $item->getTitle();
        $description = $item->getDescription();

        $stmt->bindParam(':title', $title);
        $stmt->bindParam(':description', $description);
        $stmt->bindParam(':longitude', $longitude);
        $stmt->bindParam(':latitude', $latitude);
        $stmt->bindParam(':user_id', $uid);


        $stmt->execute();
        $result = $stmt->fetch();

        if (!key_exists('add_item', $result))
            throw new Exception('Item ID could not be fetched properly.');

        return $result['add_item'];

    }

    # Item's photo uploading:
    public function saveItemPhoto($item_id, $path)
    {
        $stmt = $this->database->connect()->prepare('
            INSERT INTO items_photos (item, url) VALUES(?, ?);
        ');

        $stmt->execute([
            $item_id,
            $path
        ]);
    }


    # Item fetching:

    public function fetchItems($item_id = -1, $amount = 30)
    {
        $stmt = $this->database->connect()->prepare('
            select * from fetchitems(:last, :amount);
        ');

        $stmt->bindParam(':last', $item_id);
        $stmt->bindParam(':amount', $amount);

        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }


    # Item buying:
    public function buyItem($item_id, $user_id)
    {

        $stmt = $this->database->connect()->prepare('
            CALL buy(:item_id, :user_id)
        ');

        $stmt->bindParam(':item_id', $item_id);
        $stmt->bindParam(':user_id', $user_id);

        try {
            $stmt->execute();
        } catch (PDOException $e) {
            echo $e->getMessage();
            http_response_code(400);
            die();
        }

    }

}