<?php

require_once 'src/models/Item.php';
require_once 'src/repositories/UserRepository.php';


class ItemController
{

    public function upload()
    {

        session_start();

        if (isset($_SESSION['uid'])) {

            $title = $_POST['title'];
            $description = $_POST['description'];
            $coords = $_POST['coords'];


            # Here is a directory for the items that user sent.
            $dirname = 'public/uploads/items/' . uniqid() . '/';
            mkdir($dirname);

            # Upload photos to that directory:
            $photos = $this->uploadPhotos($dirname);

            $item = new Item($title, $description, $coords, $photos);


            $userRepository = new UserRepository();

            try {
                $userRepository->saveItem($_SESSION['uid'], $item);
            } catch (Exception $exception) {
                http_response_code(404);
            }

        } else {

            http_response_code(401);
            die('Unauthorized');

        }

    }

    private function uploadPhotos($dirname)
    {
        $photos = [];

        foreach ($_FILES as $file) {
            move_uploaded_file(
                $file['tmp_name'],
                $dirname . $file['name']
            );
            array_push($photos, $dirname . $file['name']);
        }

        return $photos;
    }


}