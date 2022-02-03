
class Form {
    constructor() {
        this.form = document.createElement('form');

        this.form.action = '/upload';
        this.form.method = 'POST';

        const photos = document.createElement('div');
        photos.className = 'Photo-Inputs';

        const photo_1 = new PhotoField('photo_1');
        const photo_2 = new PhotoField('photo_2');
        const photo_3 = new PhotoField('photo_3');
        const photo_4 = new PhotoField('photo_4');

        photos.append(photo_1.render());
        photos.append(photo_2.render());
        photos.append(photo_3.render());
        photos.append(photo_4.render());

        const title = new TitleField();
        const description = document.createElement('textarea');


        const info = document.createElement('div');
        info.append(title.render())
        info.append(description);

        // Map:
        const map = document.createElement('div');
        map.id = 'map';

        const bottom = document.createElement('div');
        bottom.append(info);
        bottom.append(map);

        this.form.append(photos);
        this.form.append(bottom);


    }

    render() {
        return this.form;
    }

}

class PhotoField {
    constructor(id) {
        this.field = document.createElement('div');
        this.field.className = 'Photo-Field';
        const input = new PhotoInput(id);
        const label = new Label(null, 'Photo-Lavel', id);

        const i = document.createElement('i');
        i.className = 'material-icons Add-Photo-Alternate';
        i.innerText = 'add_photo_alternate'

        this.field.append(i)
        this.field.append(input.render());
        this.field.append(label.render());
    }

    render() {
        return this.field;
    }
}

class TitleField {
    constructor() {
        this.field = document.createElement('div');
        this.field.className = 'Title-Field';
        const input = new Input(null, 'title', 'title', 'text', 'Title', true);
        const label = new Label(null, null, 'title');

        this.field.append(input.render());
        this.field.append(label.render());
    }


    render() {
        return this.field;
    }
}


class PhotoInput {

    constructor(id) {
        this.input = new Input('Photo-Input', id, id, 'file', null, null);
    }

    render() {
        return this.input.render();
    }
}


class Input {

    constructor(className, id, name, type, placeholder, required) {
        this.input = document.createElement('input');
        this.setClass(className);
        this.setID(id);
        this.setName(name);
        this.setType(type);
        this.setPlaceholder(placeholder);
        this.required(required);
    }

    setClass(className) {
        if (className !== null && className !== undefined)
            this.input.className = className;
    }

    setID(id) {
        if (id !== null && id !== undefined)
            this.input.id = id;
    }

    setName(name) {
        if (name !== null && name !== undefined)
            this.input.name = name;
    }

    setType(type) {
        if (type !== null && type !== undefined)
            this.input.type = type;
    }

    setPlaceholder(placeholder) {
        if (placeholder !== null && placeholder !== undefined)
            this.input.placeholder = placeholder;
    }

    required(required) {

        if (required === true)
            this.input.required = true;

        if (required === false)
            this.input.required = false;

    }

    render() {
        return this.input;
    }
}

class Label {

    constructor(id, className, forID) {
        this.label = document.createElement('label');
    }

    setClass(className) {
        if (className !== null && className !== undefined)
            this.label.className = className;
    }

    setID(id) {
        if (id !== null && id !== undefined)
            this.label.id = id;
    }

    setFor(forID) {
        if (forID !== null && forID !== undefined)
            this.label.id = forID;
    }

    render() {
        return this.label;
    }

}