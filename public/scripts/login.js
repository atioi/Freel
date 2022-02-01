const eye = document.getElementById('eye');
const password = document.getElementById('password');


password.onkeyup = (event) => {
    eye.classList.remove('invisible');
}

eye.onclick = () => {
    eye.innerText = eye.innerText === 'visibility' ? 'visibility_off' : 'visibility';
    password.type = password.type === 'text' ? 'password' : 'text';
}