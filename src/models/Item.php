<?php

class Item
{

    private $title;
    private $description;
    private $localization;
    private $photos;

    public function __construct($title, $description, $localization, $photos)
    {
        $this->title = $title;
        $this->description = $description;
        $this->localization = $localization;
        $this->photos = $photos;
    }

    public function setPhotos($photos)
    {
        $this->photos = $photos;
    }

    /**
     * @return mixed
     */
    public function getTitle()
    {
        return $this->title;
    }

    /**
     * @return mixed
     */
    public function getDescription()
    {
        return $this->description;
    }

    /**
     * @return mixed
     */
    public function getLocalization()
    {
        return $this->localization;
    }

    /**
     * @return mixed
     */
    public function getPhotos()
    {
        return $this->photos;
    }


}