//
// password.onkeyup = visibility;
// confirmation.onkeyup = visibility;
//
//
// function visibility(event) {
//     event.preventDefault();
//
//     console.log(event.key);
//     if (event.key !== 'Enter') {
//         if (event.target.classList.contains('Required')) {
//             event.target.classList.remove('Required');
//             const error_outline = event.target.parentElement.getElementsByClassName('Error-Outline').item(0);
//             error_outline.setAttribute('style', 'visibility: hidden;');
//
//         }
//
//
//         const eye = event.target.parentElement.getElementsByClassName('Visibility').item(0);
//
//         if (event.target.value.length) {
//             eye.innerHTML = 'visibility_off';
//             event.target.type = 'password';
//             eye.setAttribute('style', 'visibility: visible');
//         }
//
//         if (!event.target.value.length)
//             eye.setAttribute('style', 'visibility: hidden');
//
//         eye.onclick = () => {
//             eye.innerHTML = eye.innerHTML === 'visibility' ? 'visibility_off' : 'visibility';
//             event.target.type = event.target.type === 'password' ? 'text' : 'password';
//         }
//     }
//
//
// }
//
// function required(input) {
//     if (!input.value.length) {
//         input.classList.add('Required');
//         const error_outline = input.parentElement.getElementsByClassName('Error-Outline').item(0);
//         error_outline.setAttribute('style', 'visibility: visible;');
//     }
// }
//
//
// function reset(event) {
//     event.target.classList.remove('Required');
//     const error_outline = event.target.parentElement.getElementsByClassName('Error-Outline').item(0);
//     error_outline.setAttribute('style', 'visibility: hidden;');
// }
//


const registerForm = document.getElementById('registerForm');

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

password.onkeydown = addPasswordOption;
confirmation.onkeydown = addPasswordOption;


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


function isEmpty(element) {
    return !element.value.length;
}

function arePasswordsEqual(p1, p2) {
    return p1.value === p2.value;
}

function isValidEmail(email) {

}


function isEverythingValid() {

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


    return !errors.length;
}


registerForm.onsubmit = register;

async function register(event) {
    event.preventDefault();

    try {

        if (!isEverythingValid())
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


    } catch (e) {
        console.error(e.message);
    }


}

