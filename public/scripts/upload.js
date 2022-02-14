"use strict";


class Title {

    state = {
        value: ''
    }

    renderErrorIcon() {
        const error_outline = document.createElement('i');
        error_outline.innerText = 'error_outline';
        error_outline.className = 'material-icons title-error-outline';
        return error_outline;
    }

    renderErrorMessage() {
        const p = document.createElement('p');
        p.className = 'Error-Message';
        p.innerText = '*Title is required.';
        return p;
    }


    renderInput(id, name, placeholder) {
        const input = document.createElement('input');
        input.id = id;
        input.name = name;
        input.placeholder = placeholder;
        return input;
    }

    renderLabel(forID) {
        const label = document.createElement('label');
        label.for = forID;
        return label;
    }

    render() {
        this.self = document.createElement('div');
        this.self.className = 'Title-Wrapper';

        const input = this.renderInput('title', 'title', 'Title');
        this.state.input = input;
        input.onchange = this.onchange.bind(this);

        const label = this.renderLabel('title');

        const error_outline = this.renderErrorIcon();
        this.state.error_outline = error_outline;

        this.self.append(input);
        this.self.append(label);
        this.self.append(error_outline);

        return this.self;
    }

    onchange(event) {
        this.state.value = event.target.value;
    }


    validate() {
        if (this.state.value === '') {
            alert('Title is required');
            throw new Error('Title is required!');
        }
    }

}


class Description {

    render() {
        this.self = document.createElement('div');
        this.self.className = 'Description-Wrapper';

        const textarea = document.createElement('textarea');
        textarea.placeholder = 'Description';
        textarea.id = 'description';
        textarea.name = 'description';

        const label = document.createElement('label');
        label.for = 'description';

        this.self.append(textarea);
        this.self.append(label);

        return this.self;
    }

}

class Photo {

    state = {
        filled: false
    }

    renderLabel(nr) {
        const label = document.createElement('label');
        label.setAttribute('for', `photo_${nr}`);
        return label;
    }

    renderInput(nr) {
        const input = document.createElement('input');
        input.type = 'file';
        input.id = `photo_${nr}`;
        input.name = `photo_${nr}`;
        input.onchange = (event) => this.onchange(event)
        return input;
    }

    renderIcon() {
        const icon = document.createElement('i');
        icon.className = 'material-icons';
        icon.innerText = 'add_photo_alternate';
        return icon;
    }

    render(nr) {

        this.self = document.createElement('div');
        this.self.className = 'Photo';

        const label = this.renderLabel(nr);
        const input = this.renderInput(nr);
        const icon = this.renderIcon();

        this.self.append(label);
        this.self.append(input);
        this.self.append(icon);

        this.self.onclick = (event) => this.upload(input);

        return this.self;
    }

    upload(input) {
        input.click();
    }

    onchange(event) {
        this.preview(event.target);
        this.state.filled = true;
    }

    preview(input) {
        const reader = new FileReader();
        reader.onloadend = () => {
            const img = document.createElement('img');
            img.src = `${reader.result}`;
            input.parentElement.append(img);
        }
        reader.readAsDataURL(input.files[0]);
    }

    isFilled() {
        return this.state.filled;
    }


}


class Photos {

    state = {
        photos: {}
    };

    render() {

        this.self = document.createElement('div');
        this.self.className = 'Photos';

        const photo_0 = new Photo();
        const photo_1 = new Photo();
        const photo_2 = new Photo();
        const photo_3 = new Photo();

        this.state.photos.photo_0 = photo_0;
        this.state.photos.photo_1 = photo_1;
        this.state.photos.photo_2 = photo_2;
        this.state.photos.photo_3 = photo_3;


        this.self.append(photo_0.render(0));
        this.self.append(photo_1.render(1));
        this.self.append(photo_2.render(2));
        this.self.append(photo_3.render(3));

        return this.self;

    }

    validate() {
        const length = Object.values(this.state.photos).filter(photo => photo.isFilled()).length;
        if (length === 0) {
            alert('Photo is required!');
            throw new Error('At least one photo is required.')
        }
    }
}


class Upload {

    state = {}

    renderSubmitButton() {
        const input = document.createElement('input');
        input.type = 'submit';
        input.value = 'UPLOAD';
        return input;
    }

    render() {
        this.self = document.createElement('form');
        this.self.method = 'POST';
        this.self.action = '/upload';


        const h1 = document.createElement('h1');
        h1.innerText = 'UPLOAD ITEM';

        const title = new Title();
        const description = new Description();
        const photos = new Photos();
        const submit = this.renderSubmitButton();
        const map = new Mapbox();


        this.self.append(submit);
        this.self.append(map.render());
        this.self.append(photos.render());
        this.self.append(description.render());
        this.self.append(title.render());
        this.self.append(h1);


        this.self.onsubmit = (event) => this.onsubmit(event, title, description, map, photos);

        return this.self;
    }


    async onsubmit(event, title, description, map, photos) {

        const errors = [];

        event.preventDefault();

        try {
            title.validate();
        } catch (error) {
            errors.push(error.message);
        }

        try {
            photos.validate();
        } catch (error) {
            errors.push(error.message);
        }

        try {
            map.validate();
        } catch (error) {
            errors.push(error.message)
        }

        if (errors.length === 0) {
            alert('Poszło :)')
            const formData = new FormData(event.target);
            const longitude = map.coords[0];
            const latitude = map.coords[1];

            formData.append('longitude', longitude);
            formData.append('latitude', latitude);

            const response = await this.send(formData);
            alert(response);
        }

    }

    async send(data) {

        console.log(data);

        return fetch('/upload', {
            method: 'POST',
            body: data
        })
    }


}
