const root = document.getElementById('root');
const navigation = document.getElementById('navigation');


function load_animation() {

    const div = document.createElement('div');
    div.append(document.createElement('div'));
    div.id = 'load-animation';

    return div;

}

const animation = load_animation();

root.append(animation);

const cookies = {};
document.cookie.split(';').forEach(cookie => {
    cookies[cookie.trim().split('=')[0]] = decodeURIComponent(cookie.trim().split('=')[1]);
});

console.log(cookies);

const avatar = document.getElementById('user-cockpit');

function setAvatar() {
    if (cookies.color !== undefined) {
        avatar.getElementsByTagName('i').item(0).remove();
        avatar.style.backgroundColor = `${cookies.color}`;
        avatar.innerText = cookies.name.charAt(0);

    } else {
        avatar.id = null;
    }
}


setAvatar();
