<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Freely</title>

    <!-- Remote: -->
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet">

    <!-- Mapbox-gl-->
    <link href="https://api.mapbox.com/mapbox-gl-js/v2.6.1/mapbox-gl.css" rel="stylesheet">
    <script src="https://api.mapbox.com/mapbox-gl-js/v2.6.1/mapbox-gl.js"></script>

    <!-- Styles: -->
    <link rel="stylesheet" type="text/css" href="/public/css/dashboard.css">

</head>
<body>

<script src="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v4.7.2/mapbox-gl-geocoder.min.js"></script>
<link rel="stylesheet"
      href="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v4.7.2/mapbox-gl-geocoder.css"
      type="text/css">


<nav>

    <div id="header">
        <h1>
            Freely
        </h1>
    </div>


    <!-- Cart: -->
    <div class="Option" id="dashboard">
        <i class="material-icons">grid_view</i>
        <button>DASHBOARD</button>
    </div>


    <!-- Cart: -->
    <div class="Option" id="cart">
        <i class="material-icons">shopping_bag</i>
        <button>CART</button>
    </div>

    <!-- Upload: -->
    <div class="Option" id="upload">
        <i class="material-icons">sell</i>
        <button>UPLOAD</button>
    </div>

    <!-- Settings: -->
    <div class="Option" id="settings">
        <i class="material-icons">settings</i>
        <button>SETTINGS</button>
    </div>

</nav>


<main id="main">
</main>

<script src="/public/scripts/mapbox.js"></script>
<script src="/public/scripts/upload.js"></script>
<script src="/public/scripts/dashboard.js"></script>

</body>
</html>