// The main element contains a root element. The root element is the element that
// change dynamically its state after user clicks one of the menu option e.g user click upload_option
// the root element will contain the form for uploading item to the database, etc.

//
// const root = document.getElementById('root');
//
//

/* Cookies: After the cockpit.php view had been loaded cookies are fetched to set user avatar color and provide basic user information */


class CookiesParser {
    parse() {
        const cookies = {};

        document.cookie
            .split(';')
            .map(cookie => cookie.trim())
            .map(cookie => [cookie.split('=')[0], decodeURIComponent(cookie.split('=')[1])])
            .forEach(cookie => cookies[cookie[0]] = cookie[1]);

        return cookies;
    }
}

const cookieParser = new CookiesParser();
const cookies = cookieParser.parse();


class Panel {

    #panel;

    constructor() {
        this.#panel = document.createElement('div');
        this.#panel.id = 'panel';
    }

    dashboard() {

        this.#panel.innerHTML = null;
        this.#panel.className = 'Dashboard';

        const avatar = document.createElement('div');
        avatar.id = 'avatar';
        avatar.innerText = cookies.name.charAt(0);
        avatar.style.backgroundColor = cookies.color;
        this.#panel.append(avatar);


        const div = document.createElement('div');
        div.className = 'Greeting';
        const p = document.createElement('p');
        p.innerText = `${cookies.name} ${cookies.surname}`;
        div.append(p);


        this.#panel.append(div);


    }

    upload(event) {
        this.#panel.innerHTML = null;
        this.#panel.className = 'Upload';
        this.#panel.ontouchmove = this.touch_left;
        const upload = new Upload();
        this.#panel.append(upload.gui);
    }


    touch_left() {
        console.log('heheh');
    }

    get gui() {
        return this.#panel;
    }

}

class Avatar {

    #avatar

    constructor() {
        this.#avatar = document.createElement('div');
        this.set();
    }

    set() {
        if (cookies.color !== undefined && cookies.name !== undefined) {
            // Cookies are set.

            this.#avatar.style.backgroundColor = cookies.color;
            this.#avatar.innerText = cookies.name.charAt(0);
            this.#avatar.className = 'User-Avatar';
        } else {
            // Cookies are not set. Set avatar to default.
            this.#avatar.className = 'Default-Avatar'
            const icon = document.createElement('i');
            icon.className = 'material-icons';
            icon.innerText = 'account_circle';
            this.#avatar.append(icon);
        }
    }

    get gui() {
        return this.#avatar;
    }

}


class CockpitMenu {

    #menu

    constructor(panel) {
        this.#menu = document.createElement('menu');
        this.#menu.className = 'Menu';

        // Menu's options:
        const dashboard = this.option('DASHBOARD', 'dashboard');
        dashboard.onclick = (event) => {
            dashboard.getElementsByTagName('i').item(0).style.color = '#2d2d2d';
            panel.dashboard()
        };

        const upload = this.option('UPLOAD', 'file_upload');
        upload.onclick = (event) => panel.upload();

        const logout = this.option('LOGOUT', 'logout');
        logout.onclick = this.logout;


        this.#menu.append(dashboard);
        this.#menu.append(upload);
        this.#menu.append(logout);

    }

    async logout() {

        const response = await fetch('/logout', {
            method: 'POST'
        })

        if (response.ok) {
            window.location.replace('/');
        }

    }

    option(name, icon) {
        const option = document.createElement('div');
        option.className = 'Menu-Option'

        const i = document.createElement('i');
        i.className = 'material-icons';
        i.innerText = icon;
        i.id = icon;

        const button = document.createElement('button');
        button.innerText = name;

        option.append(i);
        option.append(button);

        return option;
    }

    get gui() {
        return this.#menu;
    }

}


class Navigation {

    #navigation;

    constructor(panel) {
        this.#navigation = document.createElement('div');
        this.#navigation.className = 'Navigation';


        // FIXME:
        const back = document.createElement('div');
        back.className = 'Return';
        const redirector = document.createElement('a');
        redirector.href = '/';

        const i = document.createElement('i');
        i.className = 'material-icons';
        i.innerText = 'arrow_back';

        redirector.append(i);
        back.append(redirector);
        this.#navigation.append(back);


        // Avatar:
        const avatar = new Avatar();
        this.#navigation.append(avatar.gui);

        // Menu:
        const menu = new CockpitMenu(panel);
        this.#navigation.append(menu.gui);

    }

    async logout() {

        const response = await fetch('/logout', {
            method: 'POST'
        })

        if (response.ok) {
            window.location.replace('/');
        }

    }

    get gui() {
        return this.#navigation;
    }

}


class Cockpit {

    #cockpit

    constructor() {
        this.#cockpit = document.createElement('div');
        this.#cockpit.id = 'cockpit';
        this.#cockpit.className = 'Cockpit'


        // Panel, which change its state
        const panel = new Panel();
        panel.dashboard();

        // Navigation bar:
        const navigation = new Navigation(panel);

        this.#cockpit.append(navigation.gui);
        this.#cockpit.append(panel.gui);
    }

    get gui() {
        return this.#cockpit;
    }

}

const cockpit = new Cockpit();
document.body.append(cockpit.gui);
