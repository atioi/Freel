const main = document.getElementById('main');


// This element stores data for each of dashboard options:
const root = document.createElement('div');
root.id = 'root';


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


/***************** Dashboard menu's options:  ******************/


/********* Upload *********/

const upload = new Option(document.getElementById('upload'), () => {
    root.innerHTML = '';
    const form = Form();
    root.append(form);
    main.append(root);
    const map = new Mapbox();
    uploadItems(map);
});


/********* Logout *********/

const logoutElement = document.getElementById('logout');

const logoutFunction = async function () {
    const response = await fetch('/logout', {
        method: 'POST'
    })

    if (response.ok) {
        window.location.replace('/');
    }

};

const logout = new Option(logoutElement, logoutFunction);

// Dashboard menu:

const menu = new Menu(upload, logout);

