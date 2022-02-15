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
    <link rel="stylesheet" type="text/css" href="/public/css/cockpit.css">
    <link rel="stylesheet" type="text/css" href="/public/css/dashboard.css">
    <link rel="stylesheet" type="text/css" href="/public/css/upload.css">

</head>
<body>


<nav id="navigation">
    <div class="Cockpit-Menu-Option" id="return-menu-option"><i class="material-icons">keyboard_backspace</i></div>

    <div class="Avatar" id="avatar"></div>

    <div class="Cockpit-Menu-Option" id="dashboard-menu-option"><i class="material-icons">dashboard</i>
        <p class="Option">DASHBOARD</p></div>
    <div class="Cockpit-Menu-Option" id="upload-menu-option"><i class="material-icons">file_upload</i>
        <p class="Option">UPLOAD</p></div>
    <div class="Cockpit-Menu-Option" id="cart-menu-option"><i class="material-icons">shopping_bag</i>
        <p class="Option">CART</p></div>
    <div class="Cockpit-Menu-Option" id="logout-menu-option"><i class="material-icons">logout</i>
        <p class="Option">LOGOUT</p></div>
</nav>
<main>
    <div id="root"></div>
</main>

<script src="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v4.7.2/mapbox-gl-geocoder.min.js"></script>
<link rel="stylesheet"
      href="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v4.7.2/mapbox-gl-geocoder.css"
      type="text/css">


<script src="/public/scripts/mapbox.js"></script>
<script src="/public/scripts/upload.js"></script>
<script src="/public/scripts/cockpit.js"></script>

</body>
</html>