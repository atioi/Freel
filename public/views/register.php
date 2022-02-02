<!doctype html>
<html lang="en">
<head>
    <!-- General: -->
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">

    <title>Freely</title>

    <!-- Remote: -->
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet">

    <!-- Style: -->
    <link rel="stylesheet" type="text/css" href="/public/css/register.css">

</head>
<body>

<main>
    <section>

    </section>
    <section>

        <div>

            <h2>Create Account</h2>

            <form id="registerForm" method="POST" action="/register">
                <!-- Name: -->
                <div>
                    <label for="name"></label>
                    <input id="name" name="name" placeholder="Name" type="text" maxlength="100">
                    <i class="material-icons Error-Outline" id="error-outline-name">error_outline</i>
                </div>

                <!-- Surname -->
                <div>
                    <label for="surname"></label>
                    <input id="surname" name="surname" placeholder="Surname" type="text" maxlength="100">
                    <i class="material-icons Error-Outline" id="error-outline-surname">error_outline</i>
                </div>

                <!-- Login -->
                <div>
                    <label for="login"></label>
                    <input id="login" name="login" placeholder="Login" type="text" maxlength="100">
                    <i class="material-icons Error-Outline" id="error-outline-login">error_outline</i>
                </div>

                <!-- Email -->
                <div>
                    <label for="email"></label>
                    <input id="email" name="email" placeholder="Email" type="email" maxlength="100">
                    <i class="material-icons Error-Outline" id="error-outline-email">error_outline</i>
                </div>

                <!-- Password -->
                <div>
                    <label for="password"></label>
                    <input id="password" name="password" placeholder="Password" type="password" maxlength="50">
                    <i class="material-icons Error-Outline" id="error-outline-password">error_outline</i>
                    <i class="material-icons Visibility">visibility_off</i>
                </div>

                <!-- Confirm Password -->
                <div>
                    <label for="confirm"></label>
                    <input id="confirm" name="confirm" placeholder="Confirm password" type="password" maxlength="50">
                    <i class="material-icons Error-Outline" id="error-outline-confirm">error_outline</i>
                    <i class="material-icons Visibility">visibility_off</i>
                </div>

                <p id="message"></p>

                <input type="submit" value="CREATE">

            </form>

            <p>Have account already? <a href="/login">Login</a></p>


        </div>

    </section>
</main>

<script src="/public/scripts/register.js"></script>

</body>
</html>