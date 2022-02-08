function Photo(id) {

    const photo = document.createElement('div');
    photo.className = 'photo';

    const google_icon = GoogleIcon('add_photo_alternate');

    const input = document.createElement('input');
    const label = document.createElement('label');

    label.for = id;
    label.className = 'photo-label';

    input.name = id;
    input.type = 'file';
    input.className = 'photo-input'

    photo.append(label);
    photo.append(input);
    photo.append(google_icon);

    return photo;

}

function GoogleIcon(name) {
    const google_icon = document.createElement('i');
    google_icon.className = `material-icons ${name}`;
    google_icon.innerHTML = name;
    return google_icon;
}

function Photos() {
    const photos = document.createElement('div');
    photos.className = 'photos';

    photos.append(Photo('photo-01'));
    photos.append(Photo('photo-02'));
    photos.append(Photo('photo-03'));
    photos.append(Photo('photo-04'));

    return photos;
}

function Input(atr) {
    const input = document.createElement('input');
    Object.keys(atr).forEach(key => input.setAttribute(key, atr[key]));
    return input
}

function Textarea(atr) {
    const textarea = document.createElement('textarea');
    Object.keys(atr).forEach(key => textarea.setAttribute(key, atr[key]));
    return textarea
}

function Label(atr) {
    const label = document.createElement('label');
    Object.keys(atr).forEach(key => label.setAttribute(key, atr[key]));
    return label
}

function Title() {

    const input = Input({
        id: 'title',
        name: 'title',
        placeholder: "Title",
    });

    const label = Label({
        for: 'title'
    })


    const div = document.createElement('div');
    div.append(input);
    div.append(label);

    return div;

}

function Description() {

    const description = Textarea({
        id: 'description',
        name: 'description',
        placeholder: "Description",
    });

    const label = Label({
        for: 'description'
    })


    const div = document.createElement('div');
    div.append(description);
    div.append(label);

    return div;

}

function Map() {
    const div = document.createElement('div');
    div.id = 'map';
    return div;
}

function Inputs() {
    const div = document.createElement('div');
    const title = Title();
    const description = Description();
    div.append(title);
    div.append(description);
    return div;
}


function Form() {

    const form = document.createElement('form');
    form.action = '/upload';
    form.method = 'POST';
    form.id = 'upload-form'


    const photos = Photos();
    form.append(photos);

    const map = Map();
    const inputs = Inputs();

    const div = document.createElement('div');
    div.append(inputs);
    div.append(map);

    const submit = Input({
        type: 'submit',
        value: 'UPLOAD'
    });


    form.append(div);
    form.append(submit);

    return form;

}


/*
* Uploading
*
* */

function uploadItems(map) {


    const photos = document.getElementsByClassName('photo-input');
    for (let index in photos) {
        photos[index].onchange = photoPreview;
    }
    // photos.forEach(photo => photo.onchange = photoPreview);

    const form = document.getElementById('upload-form');
    form.onsubmit = (event) => onUpload(event, map);


}

function removePhoto(event) {
    event.preventDefault();

    const parent = event.target.parentElement;
    const i = parent.getElementsByTagName('i').item(0);
    i.innerText = 'add_photo_alternate';

    const img = parent.getElementsByTagName('img').item(0);
    img.remove();

    event.target.type = 'text';
    event.target.type = 'file';
    event.target.onchange = photoPreview;
    event.target.onclick = null;

}


// Displays photo inside input:
function photoPreview(event) {

    const reader = new FileReader();
    const parent = event.target.parentElement;
    const i = parent.getElementsByTagName('i').item(0);

    const img = document.createElement('img');

    reader.onloadend = () => {
        img.src = `${reader.result}`;
        i.innerText = 'delete'
        i.classList.add('Trash');
        event.target.parentElement.append(img);
    }

    reader.readAsDataURL(event.target.files[0]);


    // Enables photo removing
    event.target.onclick = removePhoto;
}


// Validates and sends item to database:
async function onUpload(event, map) {

    event.preventDefault();

    console.log('helloo')

    const formData = new FormData(event.target);

    const data = {
        title: formData.get('title'),
        description: formData.get('description'),
        coords: map.position(),
        photos: [formData.get('photo-01'), formData.get('photo-02'), formData.get('photo-03'), formData.get('photo-04')]
    };


    validate(data);
    // const response = send();


}

function validate(data) {

    const errors = [];


    console.log(data.title);
    data.photos.forEach(photo => console.log(photo));

    if (data.title.trim() === '') {
        errors.push('Title is required.')
        document.getElementById('title').classList.add('required');
    }

    if (data.coords === null) {
        errors.push('Coords are required.');
        document.getElementById('map').classList.add('required');
    }

    if (data.photos.filter(photo => photo.size > 0).length === 0) {
        errors.push('At least one photo is mandatory.')
        document.getElementsByClassName('photo').item(0).classList.add('required');
    }


}


async function send() {
    // const response = await fetch('/upload', {
    //     method: "POST",
    //     body: formData
    // });
}
