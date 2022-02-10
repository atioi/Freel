class Option {

    #status = 'off';
    #element;
    #callback;

    /**
     * Every clickable (clickable means it supports onclick event) html element can be passed as htmlElement.
     * The callback is executed right after user click on htmlElement.
     * */
    constructor(htmlElement, callback) {
        this.#callback = callback;
        this.#element = htmlElement;
    }

    onclick(menu) {
        this.#element.onclick = (event) => {
            if (this.#status === 'off') {
                this.#status = 'on';
                menu.switch(this);
            }
        }
    }

    run(menu) {
        this.#callback(menu);
    }

    /**
     * Off option if it is not actually in use.
     * The option which is in use is never being off because of condition option!==this, that doesn't allow to do that.
     * */
    off(option) {
        if (option !== this)
            this.#status = 'off';
    }

    get point() {
        return this.#element;
    }

}


// Menu:
class Menu {

    #options

    /**
     * Options have to be instances of Option class.
     **/
    constructor(...options) {
        this.#options = options;

        /**
         * This function connect menu with options. When an Option is clicked the Menu is asked to switch themself
         * and run callback.
         * */
        this.#options.forEach(option => option.onclick(this))

    }

    get options() {
        return this.#options;
    }

    switch(option) {
        option.run(this);
        this.options.forEach(opt => opt.off(option));
    }

}


