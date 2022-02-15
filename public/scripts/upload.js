class Photo {

    renderFileInput(input_id) {
        const input = document.createElement('input')
        input.className = 'Photo-Input';
        input.id = input_id;
        input.name = input_id;
        input.type = 'file';
        input.onchange = (event) => this.onchange(event);
        return input;
    }

    suppressError() {
        const error = document.getElementById('photos-fields-errors')
        error.style.visibility = 'hidden';
    }

    renderFileLabel(input_id) {
        const label = document.createElement('label');
        label.className = 'Photo-Label';
        label.for = input_id;
        return label;
    }

    renderIcon() {
        const icon = document.createElement('i');
        icon.innerText = 'add_photo_alternate';
        icon.className = 'material-icons photo_state_icon add_photo_alternate';
        return icon;
    }

    render(input_id) {
        this.div = document.createElement('div');
        this.div.className = 'Photo-Field';

        this.input = this.renderFileInput(input_id);
        this.icon = this.renderIcon();
        this.label = this.renderFileLabel(input_id);

        this.div.append(this.input)
        this.div.append(this.label)
        this.div.append(this.icon);

        this.div.onclick = this.add.bind(this);

        return this.div;
    }

    add() {
        this.input.click();
    }

    remove() {
        this.input.value = null;
        this.img.remove();
        this.icon.innerText = 'add_photo_alternate';
        this.icon.classList.remove('delete_outline')
        this.icon.classList.add('add_photo_alternate');
        this.div.onclick = this.add.bind(this);
    }


    onchange(event) {
        const input = event.target;
        const reader = new FileReader();
        reader.onloadend = () => {
            this.img = document.createElement('img');
            this.img.src = `${reader.result}`;
            this.input.parentElement.append(this.img);

            this.icon.innerText = 'delete_outline';
            this.icon.classList.remove('add_photo_alternate')
            this.icon.classList.add('delete_outline');
            this.suppressError();
            this.div.onclick = this.remove.bind(this);

        }
        reader.readAsDataURL(input.files[0]);
    }
}


class PhotosInputs {
    showError(message) {
        const error = document.getElementById('photos-fields-errors')
        error.innerText = message;
        error.style.visibility = 'visible';
    }


    render() {
        this.photos = []

        const conatiner = document.createElement('div');

        const div = document.createElement('div');
        div.className = 'Photos-Fields';


        this.photo_0 = new Photo();
        this.photo_1 = new Photo();
        this.photo_2 = new Photo();
        this.photo_3 = new Photo();

        this.photos.push(this.photo_0);
        this.photos.push(this.photo_1);
        this.photos.push(this.photo_2);
        this.photos.push(this.photo_3);

        const errors = document.createElement('div');
        errors.innerText = 'dadsa';
        errors.id = 'photos-fields-errors';
        errors.style.visibility = 'hidden';


        div.append(this.photo_0.render('photo_0'))
        div.append(this.photo_1.render('photo_1'))
        div.append(this.photo_2.render('photo_2'))
        div.append(this.photo_3.render('photo_3'))

        conatiner.append(div);
        conatiner.append(errors);

        return conatiner;
    }
}

class TitleInput {

    showError() {
        const error = document.getElementById('title-error-paragraph');
        error.innerText = 'Title is required';
        error.parentElement.style.visibility = 'visible';
    }

    suppressError() {
        const error = document.getElementById('title-error-paragraph');
        error.parentElement.style.visibility = 'hidden';
    }

    onkeydown() {
        this.suppressError();
    }


    renderErrorContainer() {
        const div = document.createElement('div');
        div.id = 'title-error-container';

        const error_outline = document.createElement('i');
        error_outline.id = 'error_outline';
        error_outline.innerText = 'error_outline';
        error_outline.className = 'material-icons';


        const p = document.createElement('p');
        p.id = 'title-error-paragraph'
        p.innerText = 'error';

        div.append(p);
        div.append(error_outline);

        return div;
    }

    render() {
        const div = document.createElement('div');
        div.className = 'Title-Field';

        this.input = document.createElement('input');
        this.input.placeholder = 'Title';
        this.input.id = 'title-input';
        this.input.name = 'title';
        this.input.onkeydown = this.onkeydown.bind(this);

        const label = document.createElement('label');
        label.id = 'title-input';


        div.append(this.input);
        div.append(label);
        div.append(this.renderErrorContainer());

        return div;
    }

}

class DescriptionInput {

    render() {
        const div = document.createElement('div');

        this.textArea = document.createElement('textarea');
        this.textArea.placeholder = 'Description';
        this.textArea.id = 'description-area';
        this.textArea.name = 'description';

        const label = document.createElement('label');
        label.id = 'description-area';

        div.append(this.textArea);
        div.append(label);

        return div;
    }

}


class UploadForm {

    renderForm() {
        const form = document.createElement('form');
        form.action = 'upload';
        form.method = 'POST';
        form.onsubmit = this.onsubmit.bind(this);
        return form;
    }

    renderTextInputs() {
        const div = document.createElement('div');
        div.className = 'Text-Inputs';

        this.title = new TitleInput();
        this.description = new DescriptionInput();

        div.append(this.title.render());
        div.append(this.description.render());

        return div;
    }

    renderSubmitButton() {
        const submit = document.createElement('input');
        submit.type = 'submit';
        submit.value = 'UPLOAD';
        return submit;
    }

    renderHeader() {
        const h1 = document.createElement('h1');
        h1.innerHTML = ' UPLOAD ITEM';
        return h1;
    }


    renderMessageContainer() {
        const div = document.createElement('div');
        div.id = 'upload_status_bar';
        const p = document.createElement('p');
        p.textContent = 'message';
        p.id = 'upload-form-result-message';
        div.append(p)
        return div;
    }

    showMessage(message, className) {
        const p = document.getElementById('upload_status_bar');
        p.innerText = message;
        p.className = className;
        this.message.style.visibility = 'visible';
    }

    render() {
        const form = this.renderForm();

        this.h1 = this.renderHeader();
        form.append(this.h1);

        this.textInputs = this.renderTextInputs();
        form.append(this.textInputs);

        this.photosInputs = new PhotosInputs();
        form.append(this.photosInputs.render());

        this.map = new Mapbox();
        form.append(this.map.render());



        this.message = this.renderMessageContainer();
        form.append(this.message);


        this.submit = this.renderSubmitButton();
        form.append(this.submit);
        return form;
    }

    async onsubmit(event) {

        // We have to synchronize all inputs with form, each input will implements own validation, and when
        // form will be submit informs inputs and asks for values of inputs.

        event.preventDefault();

        // Parsing:
        const formData = new FormData(event.target);

        const title = formData.get('title');
        const description = formData.get('description');

        const photos = [
            formData.get('photo_0'),
            formData.get('photo_1'),
            formData.get('photo_2'),
            formData.get('photo_3')
        ].filter(photo => photo.size > 0);

        const position = this.map.getPosition();

        // Validating:

        const errors = [];

        if (position === null) {
            errors.push('Position is required.');
            this.map.showError('Position is required');
        }


        if (title === '') {
            errors.push('Title is required.');
            this.title.showError('Title is required');
        }

        if (photos.length === 0) {
            errors.push('At least one photo is required.')
            this.photosInputs.showError('At least one photo is required.');
        }

        // Preparing and sending:

        if (errors.length === 0) {

            const validFormData = new FormData();


            validFormData.append('title', title);
            validFormData.append('description', description);
            photos.forEach((photo, index) => validFormData.append(`photo_${index}`, photo));

            validFormData.append('longitude', position[0]);
            validFormData.append('latitude', position[1]);

            const response = await fetch('/upload', {
                method: 'POST',
                body: validFormData
            });


            if (response.ok) {
                this.showMessage('ITEM UPLOADED SUCCESSFULLY', 'status-success');
                event.target.reset();
            } else
                this.showMessage('SOMETHING GOES WRONG', 'status-success');

        }


    }


}