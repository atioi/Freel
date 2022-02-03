function uploadItems(map) {


    const photos = document.getElementsByClassName('Photo-Input');
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

    // Coords should be setting:
    const coords = map.coords;

    const data = new FormData(event.target);
    const title = data.get('title');
    const description = data.get('description');


    const photo_1 = data.get('photo_1');
    const photo_2 = data.get('photo_2');
    const photo_3 = data.get('photo_3');
    const photo_4 = data.get('photo_4');


    const item = {
        title: title,
        coords: coords,
        description: description,
        photos: [
            convertFileToJSON(photo_1),
            convertFileToJSON(photo_2),
            convertFileToJSON(photo_3),
            convertFileToJSON(photo_4)
        ]
    };

    try {
        valid(item);

        const response = await fetch('/upload', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(item)
        });


    } catch (error) {
        console.log(error.message);
    }

}

function valid(item) {

    if (isEmpty(item.title))
        throw new Error('Title is empty');

    if (isEmpty(item.coords))
        throw new Error('Coords are null');

    if (atLeastOnePhoto(item.photos))
        throw new Error('One photo is required');

}

function isEmpty(element) {
    return element === undefined || element === null || element === '';
}

function atLeastOnePhoto(photos) {
    return photos.filter(photo => photo.size > 0).length === 0
}


function convertFileToJSON(file) {
    return {
        'name': file.name,
        'size': file.size,
        'type': file.type
    }
}