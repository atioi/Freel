<?php

require_once 'src/models/Item.php';
require_once 'src/repositories/UserRepository.php';


class ItemController
{

    const SUPPORTED_TYPES = ['image/png', 'image/jpeg'];
    const MAX_FILE_SIZE = 1024 * 1024;

    public function buy()
    {
        # Authorization:
        try {
            $this->authorization();
        } catch (Exception $exception) {
            http_response_code($exception->getCode());
            die($exception->getMessage());
        };


        # Parsing:
        $item_id = $_POST['item_id'];

        # Database action:

        $userRepository = new UserRepository();
        $userRepository->buyItem($item_id, $_SESSION['uid']);


    }


    public function upload()
    {

        # Authorization:
        try {
            $this->authorization();
        } catch (Exception $exception) {
            http_response_code($exception->getCode());
            die($exception->getMessage());
        }

        # Parsing:
        $item = $this->parsing();


        # Validation:
        try {
            $this->validation($item);
        } catch (Exception $exception) {
            http_response_code(400);
            die($exception->getMessage());
        }


        # Uploading:
        try {
            $this->uploading($item);
        } catch (Exception $exception) {
            http_response_code($exception->getCode());
            die($exception->getMessage());
        }


    }

    function parsing()
    {
        $title = $_POST['title'];
        $description = $_POST['description'];
        $coords = ['longitude' => $_POST['longitude'], 'latitude' => $_POST['latitude']];
        $photos = $_FILES;

        return new Item($title, $description, $coords, $photos);
    }

    /**
     * @throws Exception
     */
    function validation(Item $item)
    {
        $this->title_validation($item->getTitle());
        $this->localization_validation($item->getLocalization());
        $this->photos_validation($item->getPhotos());
    }

    /**
     * @throws Exception
     */
    function title_validation($title)
    {
        if (!isset($title))
            throw new Exception('Title is required', 3);
    }

    /**
     * @throws Exception
     */
    function localization_validation($coords)
    {
        if (!isset($coords['longitude']) || !isset($coords['latitude']))
            throw new Exception('Localization is required', 3);
    }

    /**
     * @throws Exception
     */
    function photo_validation($photo)
    {
        if ($photo['size'] > self::MAX_FILE_SIZE)
            throw  new Exception('Photo is too large.');

        if (!isset($photo['type']) || !in_array($photo['type'], self::SUPPORTED_TYPES))
            throw new Exception('File type is not supported');
    }

    /**
     * @throws Exception
     */
    function photos_validation($photos)
    {
        foreach ($photos as $photo)
            $this->photo_validation($photo);
    }

    /**
     * @throws Exception
     */
    function authorization()
    {
        session_start();
        if (!isset($_SESSION['uid']))
            throw new Exception('Unauthorized', 401);
    }


    /**
     * @throws Exception
     */
    function uploading(Item $item)
    {
        $this->upload_item($item);
    }

    /**
     * @throws Exception
     */
    function upload_item(Item $item)
    {
        $userRepository = new UserRepository();
        $item_id = $userRepository->saveItem($_SESSION['uid'], $item);
        $this->upload_item_photos($item_id, $item->getPhotos());
    }

    /**
     * @throws Exception
     */
    function upload_item_photos($item_id, $photos)
    {
        foreach ($photos as $photo) {
            # Standardize:
            $dirname = './public/uploads/items/' . uniqid();

            if (is_dir($dirname))
                throw new Exception('Dir already exists!');

            mkdir($dirname);
            $path = $dirname . '/' . $photo['name'];

            # Local uploading:
            move_uploaded_file($photo['tmp_name'], $path);

            #Database uploading:
            $userRepository = new UserRepository();
            $userRepository->saveItemPhoto($item_id, $path);

        }
    }

    # Fetching items:

    function items()
    {
        # Fetching:
        $userRepository = new UserRepository();
        $items_data = $userRepository->fetchItems(-1, 30);

        # Parsing:
        $items = $this->parseFetched($items_data);

        # Fetching photos:
        $this->fetchPhotos($items);


        # Converting (Standardization):
        $json = $this->toJSON($items);

        # Sending:
        echo $json;
    }

    function fetchPhotos($items)
    {
        foreach ($items as $item) {
            $id = $item['id'];

            $userRepository = new UserRepository();
            $raw_photos = $userRepository->fetchPhotos($id);
            $photos = [];


            foreach ($raw_photos as $raw_photo) {
                foreach ($raw_photo as $url)
                    array_push($photos, $url);
            }

            $itemObject = $item['item'];
            $itemObject->setPhotos($photos);
        }
    }

    function toJSON($items)
    {
        $JSON = [];

        foreach ($items as $item) {
            $id = $item['id'];
            $creation_date = $item['creation_date'];

            $Item = $item['item'];
            $title = $Item->getTitle();
            $description = $Item->getDescription();
            $localization = $Item->getLocalization();
            $photos = $Item->getPhotos();


            array_push($JSON, [
                'id' => $id,
                'creation_date' => $creation_date,
                'title' => $title,
                'description' => $description,
                'coords' => $localization,
                'photos' => $photos
            ]);

        }

        return json_encode($JSON);
    }


    function parseFetched($items_data)
    {
        $items = [];
        foreach ($items_data as $item) {
            $id = $item['item'];
            $cdate = $item['cdate'];
            $title = $item['item_title'];
            $description = $item['item_description'];
            $coords = [$item['lon'], $item['lat']];
            array_push($items, ['id' => $id, 'creation_date' => $cdate, 'item' => new Item($title, $description, $coords, [])]);
        }
        return $items;
    }


}