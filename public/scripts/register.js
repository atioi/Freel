const registerForm = document.getElementById('registerForm');
const message = document.getElementById('message');
const name = document.getElementById('name');
const surname = document.getElementById('surname');
const email = document.getElementById('email');
const login = document.getElementById('login');
const password = document.getElementById('password');
const confirmation = document.getElementById('confirm');

name.onkeydown = reset;
surname.onkeydown = reset;
email.onkeydown = reset;
login.onkeydown = reset;

password.onkeyup = removePasswordOption;
confirmation.onkeyup = removePasswordOption;


password.oninput = addPasswordOption;
confirmation.oninput = addPasswordOption;


function addPasswordOption(event) {
    if (event.target.value.length) {
        reset(event);
        addShowPasswordOption(event);
    }
}

function removePasswordOption(event) {
    if (!event.target.value.length)
        removeShowPasswordOption(event);
}

function removeShowPasswordOption(event) {
    const eye = event.target.parentElement.getElementsByClassName('Visibility').item(0);
    eye.setAttribute('style', 'visibility: hidden;');
}

function addShowPasswordOption(event) {
    const eye = event.target.parentElement.getElementsByClassName('Visibility').item(0);
    eye.setAttribute('style', 'visibility: visible;');
    eye.onclick = (eye_event) => showPassword(event.target, eye_event.target);
}

function showPassword(password, eye) {
    eye.innerHTML = eye.innerHTML === "visibility_off" ? "visibility" : "visibility_off";
    password.type = password.type === "password" ? "text" : "password";
}


function reset(event) {
    event.target.classList.remove('Required');
    const error_outline = event.target.parentElement.getElementsByClassName('Error-Outline').item(0);
    error_outline.setAttribute('style', 'visibility: hidden;');
}

function isRequired(element) {
    element.classList.add('Required');
    const error_outline = element.parentElement.getElementsByClassName('Error-Outline').item(0);
    error_outline.setAttribute('style', 'visibility: visible;');
}

registerForm.onsubmit = register;

async function register(event) {
    event.preventDefault();

    try {

        if (!validate())
            throw new Error('Invalid data typed!');

        const user = {
            name: name.value,
            surname: surname.value,
            login: login.value,
            email: email.value,
            password: password.value,
            confirmation: confirmation.value
        };


        const response = await fetch('/register', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        });

        registerForm.reset();

        message.innerText = 'Account created successfully.'


    } catch (e) {
        console.error(e.message);
    }

}

// Data validating:

function validate() {

    const errors = [];

    if (isEmpty(name)) {
        errors.push('Type name');
        isRequired(name);
    }

    if (isEmpty(surname)) {
        errors.push('Type surname');
        isRequired(surname);
    }

    if (isEmpty(email)) {
        errors.push('Type email');
        isRequired(email);
    }

    if (isEmpty(login)) {
        errors.push('Type login')
        isRequired(login);
    }

    if (isEmpty(password)) {
        errors.push('Type password');
        isRequired(password);
    }

    if (isEmpty(confirmation)) {
        errors.push('Confirm password');
        isRequired(confirmation);
    }

    if (!arePasswordsEqual(password, confirmation)) {
        errors.push('Password are not equal!');
    }

    if (!isStrongPassword(password)) {
        errors.push('Password is too weak!');
    }

    if (isValidEmail(email)) {

    }

    console.log(errors);

    return !errors.length;

}


function isEmpty(element) {
    return !element.value.length;
}

function arePasswordsEqual(p1, p2) {
    return p1.value === p2.value;
}

function isStrongPassword(password) {
    const regex = new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/)
    return regex.test(password.value)
}

function isValidEmail(email) {
    return true;
}

