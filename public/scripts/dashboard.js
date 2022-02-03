const main = document.getElementById('main');

const header = document.getElementById('header');
header.onclick = () => {
    window.location.replace('/');
}

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


// Menu options:

const upload = new Option(document.getElementById('upload'), () => {
    root.innerHTML = '';
    const form = new Form();
    root.append(form.render());
    main.append(root);
    const map = new Mapbox();
    uploadItems(map);
});

const dashboard = new Option(document.getElementById('dashboard'), () => {
    root.innerHTML = '';
});

// Menu:
const menu = new Menu(upload, dashboard);

