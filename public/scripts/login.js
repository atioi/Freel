const eye = document.getElementById('eye');
const password = document.getElementById('password');


password.onkeyup = (event) => {
    eye.classList.remove('invisible');
}

eye.onclick = () => {
    eye.innerText = eye.innerText === 'visibility' ? 'visibility_off' : 'visibility';
    password.type = password.type === 'text' ? 'password' : 'text';
}


const loginForm = document.getElementById('login-form');
loginForm.onsubmit = async (event) => {

    event.preventDefault();

    const formData = new FormData(event.target);

    const data = {
        email: formData.get('email'),
        password: formData.get('password')
    }

    console.log(JSON.stringify(data));
    const response = await login(data);

    if (response.status === 200)
        window.location.replace('/dashboard');


}

async function login(data) {
    return await fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    });
}