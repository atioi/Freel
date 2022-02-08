// The main element contains a root element. The root element is the element that
// change dynamically its state after user clicks one of the menu option e.g user click upload_option
// the root element will contain the form for uploading item to the database, etc.


const main = document.getElementById('main');
const root = document.createElement('div');
root.id = 'root';


/* Cookies: After the dashboard.php view had been loaded cookies are fetched to set user avatar color and provide basic user information */

const cookies = {};
document.cookie.split(';').forEach(cookie => {
    cookies[cookie.trim().split('=')[0]] = decodeURIComponent(cookie.trim().split('=')[1]);
})

// User avatar
const avatar = document.getElementById('avatar');
avatar.style.backgroundColor = cookies.color;
avatar.innerText = cookies.name.charAt(0);

// Greeting
const greeting = document.getElementById('greeting');
greeting.innerText = `Welcome back, \n ${cookies.name}`;


/*
*  Menu implementation:
*
*  The class Menu accept Option class instances, that points to the element that is part of menu and run the callback function.
*  Both element and callback function have to be passed during Option element initialization.
*
*  e.g
*
*   const menu = Menu(<option_0>, <option_1>, .. <option_n>)
*
*   Where each of options is an instance of Option class:
*
*   const hello_option = new Option(<html.element>, callback);
*
*
* */

class Option {

    #status = 'off';
    #element;
    #callback;

    constructor(element, callback) {
        this.#element = element;
        this.#callback = callback;
    }

    onclick(menu) {
        // When user click on option, option inform Menu to switch.
        this.#element.onclick = (event) => {
            menu.switch(this);
        }

    }

    switch(option) {
        this.#status = option === this ? 'on' : 'off';
        if (this.#status === 'off')
            this.#element.classList.remove('Chosen');
        if (this.#status === 'on')
            this.#element.classList.add('Chosen');
    }

    run() {
        if (this.#status === 'off')
            this.#callback();
    }
}

class Menu {

    #options

    constructor(...options) {
        this.#options = options;
        this.#options.forEach(option => option.onclick(this))
    }

    switch(option) {
        option.run();
        this.#options.forEach(opt => opt.switch(option));
    }

}


/*
* Defined options:
*
*   dashboard
*   cart_option
*   upload_option
*   logout_option
*
* */


/*  Upload-option:  */

const upload_option = new Option(
    document.getElementById('upload'),

    () => {
        root.innerHTML = '';
        const form = Form();
        root.append(form);
        main.append(root);
        const map = new Mapbox();
        uploadItems(map);
    }
);


/* Logout-option: */

const logout_option = new Option(
    document.getElementById('logout'),

    async () => {
        const response = await fetch('/logout', {
            method: 'POST'
        })

        if (response.ok) {
            window.location.replace('/');
        }

    }
);

/* Dashboard-option: */

const dashboard = new Option(
    document.getElementById('dashboard'),

    () => {

        root.innerHTML = '';

        const portrait = document.createElement('div');
        portrait.style.backgroundColor = cookies.color;
        portrait.innerText = cookies.name.charAt(0);
        portrait.id = 'portrait';

        const fullName = document.createElement('p');
        fullName.innerText = `${cookies.name} ${cookies.surname}`;


        root.append(portrait);
        root.append(fullName);
        main.append(root);

    }
)

/*
* The dashboard's view menu:
*
* */

const menu = new Menu(upload_option, logout_option, dashboard);

/*
*   The default dashboard option is switched on after the view had been loaded. In this case the default option is the dashboard option.
*   To change default option run menu.switch(<option>).
* */
menu.switch(dashboard);

