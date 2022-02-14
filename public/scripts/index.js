const root = document.getElementById('root');

const cookies = {};
document.cookie.split(';').forEach(cookie => {
    cookies[cookie.trim().split('=')[0]] = decodeURIComponent(cookie.trim().split('=')[1]);
});


const avatar = document.getElementById('cockpit-anchor');

function setAvatar() {
    if (cookies.color !== undefined) {
        avatar.getElementsByTagName('i').item(0).remove();
        avatar.style.backgroundColor = `${cookies.color}`;
        avatar.innerText = cookies.name.charAt(0);

    } else {

    }
}

setAvatar();


/* Animation: */
const animation = document.createElement('div');
animation.append(document.createElement('div'));
animation.id = 'load-animation';
root.append(animation);


/* Fetches items from database: */
async function fetchItems() {

    const response = await fetch('/items', {
        method: 'GET'
    });

    const data = await response.json()

    return data
        .map(item => new Item(item['id'], item['title'], item['coords'], item['description']));

}


fetchItems()
    .then(items => {
        animation.remove();
        items.forEach(item => root.append(item.render()));
    })
    .catch(error => {
    });


