<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>

<nav>
    <h1>Freely</h1>
</nav>
<main>

    <h2>LOGIN</h2>

    <form action="/login" method="POST">
        <div>
            <label for="login"></label>
            <input id="email" name="email" placeholder="Email" type="email" required>
        </div>

        <div>
            <label for="password"></label>
            <input id="password" name="password" placeholder="Password" type="password" required>
        </div>

        <input type="submit" value="LOGIN">
    </form>

</main>
<footer>

</footer>
</body>
</html>