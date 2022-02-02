<!doctype html>
<html lang="en">
<head>
    <!-- General:   -->
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">

    <title>Freely</title>

    <!-- Remote:  -->
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet">

    <!-- Style:   -->
    <link rel="stylesheet" type="text/css" href="/public/css/login.css">

</head>
<body>

<main>
    <section>
    </section>

    <section>
        <h2>LOGIN</h2>

        <form action="/login" method="POST">
            <div>
                <label for="login"></label>
                <i class="material-icons" id="letter">mail_outline</i>
                <input id="email" name="email" placeholder="Email" type="email" required>
            </div>

            <div>
                <label for="password"></label>
                <i class="material-icons" id="lock">lock</i>
                <input id="password" name="password" placeholder="Password" type="password" required>
                <i class="material-icons invisible" id="eye">visibility_off</i>
            </div>

            <input type="submit" value="LOGIN">
        </form>

        <p>or <a href="/register">Create Account</a></p>
    </section>


</main>

<script src="/public/scripts/login.js"></script>

</body>
</html>