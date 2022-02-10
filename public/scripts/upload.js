"use strict";

class View {

    #root = document.getElementById('root');

    constructor(name) {
        this.#root.innerHTML = null;
        this.#root.className = name;
    }

    append(element) {
        this.#root.append(element);
    }

}

/* Describes the Upload function from dashboard menu: */
class UploadView extends View {
    constructor(menu) {
        super('upload');


        // Return button that returns user to dashboard.
        const returnButton = this.returnButton(menu);
        returnButton.onclick = () => menu.switch(dashboard_option);
        this.append(returnButton);


        // Here view's components are added.
        const uploadForm = new UploadForm();
        this.append(uploadForm);

        const next = this.next();
        this.append(next);
    }


    //Mobile only!!!
    returnButton(menu) {
        const wrapper = document.createElement('div');
        wrapper.id = 'top-menu';
        const i = document.createElement('i');
        i.className = 'material-icons';
        i.innerText = 'close';
        i.id = 'close';
        wrapper.append(i);
        return wrapper;
    }

//    mobile only !!
    next() {
        const wrapper = document.createElement('div');
        wrapper.id = 'next-wrapper';
        const next = document.createElement('button');
        next.id = 'next';
        next.innerHTML = 'NEXT';

        wrapper.append(next);
        return wrapper;
    }


}



class UploadForm {

    #form

    constructor() {
        this.#form = document.createElement('form');

        const h1 = document.createElement('h1');
        h1.innerText = 'UPLOAD ITEM';
        h1.id = 'upload-form-header';

        this.#form.append(h1);


        // Map:
        const map = new Mapbox();
        this.#form.append(map);

        // Title:
        const title = this.title();
        this.#form.append(title);


        // Description:
        const description = this.description();
        this.#form.append(description);


        // Submit button:
        const submit = document.createElement('input');
        submit.type = 'submit';
        this.#form.append(submit);


        // When user submit form the event this.onsubmit will be triggered.
        this.#form.onsubmit = this.onsubmit.bind(this);


        return this.#form;

    }

    title() {
        const wrapper = document.createElement('div');
        wrapper.className = 'Title-Wrapper';

        const input = document.createElement('input');
        input.id = 'title';
        input.placeholder = 'Title';
        input.name = 'title'

        const label = document.createElement('label');
        label.for = 'title';

        const error_outline = this.error_outline();

        wrapper.append(error_outline);
        wrapper.append(input);
        wrapper.append(label);

        return wrapper;
    }

    description() {

        const wrapper = document.createElement('div');
        wrapper.className = 'Description-Wrapper';

        const textarea = document.createElement('textarea');
        textarea.id = 'description';
        textarea.placeholder = 'Description';
        textarea.name = 'description';

        const label = document.createElement('label');
        label.for = 'description';

        const error_outline = this.error_outline();

        wrapper.append(error_outline);
        wrapper.append(textarea);
        wrapper.append(label);

        return wrapper;

    }

    error_outline() {
        const icon = document.createElement('i');
        icon.className = 'material-icons error_outline';
        icon.innerText = 'error_outline'

        return icon;
    }

    /* Form's event : */
    onsubmit(event) {
        event.preventDefault();
        this.validate(event);
    }


    /* Validates data that was appended by user. */
    validate(event) {

        const title = document.getElementById('title');
        this.titleValidation(title);

        const map = document.getElementById('map');
        this.mapValidation(map);

    }


    mapValidation(map) {
        console.log(map);
    }

    titleValidation(title) {
        const value = title.value;
        if (value === '')
            this.required(title.parentElement);
    }

    required(element) {
        const error_outline = element.getElementsByClassName('error_outline').item(0);
        error_outline.style.visibility = 'visible';
    }

}

