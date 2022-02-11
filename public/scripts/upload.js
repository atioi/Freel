"use strict";


/*
* Class Photo implements all behaviour that enable user upload item photo.
* */
class Photo {

    #photo
    #input
    #label
    #icon

    constructor(nr) {

        // #photo is a div wrapper for input and label.
        this.#photo = document.createElement('div');
        this.#photo.className = 'Photo';


        this.#label = document.createElement('label');
        this.#label.setAttribute('for', `photo_${nr}`);

        // #input is hidden for user and when user clicks on #photo wrapper click event on #input is triggered.
        this.#input = document.createElement('input');
        this.#input.type = 'file';
        this.#input.id = `photo_${nr}`;
        // preview event displays selected photo.
        this.#input.onchange = this.onchange.bind(this);


        this.#icon = document.createElement('i');
        this.#icon.className = 'material-icons';
        this.#icon.innerText = 'add_photo_alternate';

        this.#photo.append(this.#icon);
        this.#photo.append(this.#label);
        this.#photo.append(this.#input);

        // after clicking on #photo the #input is triggered and uploading start such as normal way
        this.#photo.onclick = this.upload.bind(this);

    }


    // Upload event:
    upload() {
        this.#input.click();
    }

    onchange() {
        // validate
        this.preview();
        // icons
    }

    // Displays selected photo:
    preview() {
        const reader = new FileReader();

        reader.onloadend = () => {
            const img = document.createElement('img');
            img.src = `${reader.result}`;
            this.#photo.append(img);
        }

        reader.readAsDataURL(this.#input.files[0]);
    }

    // here we can validate photo independently from the hole form.
    validate() {


    }

    get gui() {
        return this.#photo;
    }

}


class Title {

    #wrapper;
    #input
    #error_outline

    constructor() {

        this.#wrapper = document.createElement('div');
        this.#wrapper.className = 'Title-Wrapper';

        this.#input = document.createElement('input');
        this.#input.id = 'title';
        this.#input.placeholder = 'Title';

        const label = document.createElement('label');


        // Error Icon:
        this.#error_outline = document.createElement('i');
        this.#error_outline.id = 'error_outline';
        this.#error_outline.innerText = 'error_outline';
        this.#error_outline.className = 'material-icons';


        this.#wrapper.append(this.#error_outline);
        this.#wrapper.append(this.#input);
        this.#wrapper.append(label);

    }

    validate() {
        if (this.#input.value === '') {

            this.#input.classList.add('Error');
            this.#error_outline.style.visibility = 'visible';

            throw new Error('Input is empty');
        }

        return this.#input.value;
    }


    get gui() {
        return this.#wrapper;
    }

}


/*
 * Description input:
 * */
class Description {

    #wrapper
    #textarea
    #label

    constructor() {

        this.#wrapper = document.createElement('div');
        this.#wrapper.className = 'Description-Wrapper';


        this.#textarea = document.createElement('textarea');
        this.#textarea.placeholder = 'Description';

        this.#label = document.createElement('label');


        this.#wrapper.append(this.#textarea);
        this.#wrapper.append(this.#label);

    }

    get gui() {
        return this.#wrapper;
    }

}


/*
* Upload form:
* */
class Upload {

    #upload
    #title
    #description

    constructor() {

        const h1 = document.createElement('h1');
        h1.innerText = 'UPLOAD ITEM';

        this.#upload = document.createElement('form');


        this.#upload.method = 'POST';
        this.#upload.action = '/upload';

        const photos = document.createElement('div');
        photos.className = 'Photos';

        const photo_0 = new Photo('0');
        const photo_1 = new Photo('1');
        const photo_2 = new Photo('2');
        const photo_3 = new Photo('3');

        photos.append(photo_0.gui);
        photos.append(photo_1.gui);
        photos.append(photo_2.gui);
        photos.append(photo_3.gui);

        this.#title = new Title();
        this.#description = new Description();

        const submit = document.createElement('input');
        submit.type = 'submit';
        submit.value = 'UPLOAD'

        this.#upload.append(submit);
        this.#upload.append(photos);

        const map = new Mapbox();


        this.#upload.append(this.#description.gui);
        this.#upload.append(this.#title.gui);
        this.#upload.append(h1);

        this.#upload.onsubmit = this.onsubmit.bind(this);
    }


    get gui() {
        return this.#upload;
    }

    onsubmit(event) {

        event.preventDefault();

        try {
            this.#title.validate();
        } catch (error) {
            console.log(error);
        }


    }
}


//
// class View {
//
//     #root = document.getElementById('root');
//
//     constructor(name) {
//         this.#root.innerHTML = null;
//         this.#root.className = name;
//     }
//
//     append(element) {
//         this.#root.append(element);
//     }
//
// }
//
// /* Describes the Upload function from dashboard menu: */
// class UploadView extends View {
//     constructor(menu) {
//         super('upload');
//
//
//         // Return button that returns user to dashboard.
//         const returnButton = this.returnButton(menu);
//         returnButton.onclick = () => menu.switch(dashboard_option);
//         this.append(returnButton);
//
//
//         // Here view's components are added.
//         const uploadForm = new UploadForm();
//         this.append(uploadForm);
//
//         const next = this.next();
//         this.append(next);
//     }
//
//
//     //Mobile only!!!
//     returnButton(menu) {
//         const wrapper = document.createElement('div');
//         wrapper.id = 'top-menu';
//         const i = document.createElement('i');
//         i.className = 'material-icons';
//         i.innerText = 'close';
//         i.id = 'close';
//         wrapper.append(i);
//         return wrapper;
//     }
//
// //    mobile only !!
//     next() {
//         const wrapper = document.createElement('div');
//         wrapper.id = 'next-wrapper';
//         const next = document.createElement('button');
//         next.id = 'next';
//         next.innerHTML = 'NEXT';
//
//         wrapper.append(next);
//         return wrapper;
//     }
//
//
// }
//
//
// class UploadForm {
//
//     #form
//
//     constructor() {
//         this.#form = document.createElement('form');
//
//         const h1 = document.createElement('h1');
//         h1.innerText = 'UPLOAD ITEM';
//         h1.id = 'upload-form-header';
//
//         this.#form.append(h1);
//
//
//         // Map:
//         const map = new Mapbox();
//         this.#form.append(map);
//
//         // Title:
//         const title = this.title();
//         this.#form.append(title);
//
//
//         // Description:
//         const description = this.description();
//         this.#form.append(description);
//
//
//         // Submit button:
//         const submit = document.createElement('input');
//         submit.type = 'submit';
//         this.#form.append(submit);
//
//
//         // When user submit form the event this.onsubmit will be triggered.
//         this.#form.onsubmit = this.onsubmit.bind(this);
//
//
//         return this.#form;
//
//     }
//
//     title() {
//         const wrapper = document.createElement('div');
//         wrapper.className = 'Title-Wrapper';
//
//         const input = document.createElement('input');
//         input.id = 'title';
//         input.placeholder = 'Title';
//         input.name = 'title'
//
//         const label = document.createElement('label');
//         label.for = 'title';
//
//         const error_outline = this.error_outline();
//
//         wrapper.append(error_outline);
//         wrapper.append(input);
//         wrapper.append(label);
//
//         return wrapper;
//     }
//
//     description() {
//
//         const wrapper = document.createElement('div');
//         wrapper.className = 'Description-Wrapper';
//
//         const textarea = document.createElement('textarea');
//         textarea.id = 'description';
//         textarea.placeholder = 'Description';
//         textarea.name = 'description';
//
//         const label = document.createElement('label');
//         label.for = 'description';
//
//         const error_outline = this.error_outline();
//
//         wrapper.append(error_outline);
//         wrapper.append(textarea);
//         wrapper.append(label);
//
//         return wrapper;
//
//     }
//
//     error_outline() {
//         const icon = document.createElement('i');
//         icon.className = 'material-icons error_outline';
//         icon.innerText = 'error_outline'
//
//         return icon;
//     }
//
//     /* Form's event : */
//     onsubmit(event) {
//         event.preventDefault();
//         this.validate(event);
//     }
//
//
//     /* Validates data that was appended by user. */
//     validate(event) {
//
//         const title = document.getElementById('title');
//         this.titleValidation(title);
//
//         const map = document.getElementById('map');
//         this.mapValidation(map);
//
//     }
//
//
//     mapValidation(map) {
//         console.log(map);
//     }
//
//     titleValidation(title) {
//         const value = title.value;
//         if (value === '')
//             this.required(title.parentElement);
//     }
//
//     required(element) {
//         const error_outline = element.getElementsByClassName('error_outline').item(0);
//         error_outline.style.visibility = 'visible';
//     }
//
// }
//
