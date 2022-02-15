class Item {

    #id;

    constructor(id, title, coords, description, photos) {
        this.#id = id;
        this.title = title;
        this.localization = new Localization(coords[0], coords[1]);
        this.photos = photos;
    }

    renderTitle(title) {
        const p = document.createElement('p');
        p.innerText = title;
        p.className = 'Item-Title';
        return p;
    }

    renderLocalization() {
        const div = document.createElement('div');
        div.className = 'Item-Localization';

        const location_on = document.createElement('i');
        location_on.innerHTML = 'location_on';
        location_on.className = 'material-icons';

        const p = document.createElement('p');

        navigator.geolocation.getCurrentPosition((pos, err) => {
            const userPosition = new Localization(pos.coords.longitude, pos.coords.latitude);
            p.innerText = `${Math.floor(userPosition.distance(this.localization)).toString()} KM`;
        })

        div.append(location_on);
        div.append(p);

        return div;
    }

    renderBuyButton() {
        const div = document.createElement('div');
        div.onclick = (event) => this.buy(this.#id, div.parentElement);

        const shopping_bag = document.createElement('i');
        shopping_bag.innerText = 'shopping_bag';
        shopping_bag.id = 'shopping_bag';
        shopping_bag.className = 'material-icons';
        div.append(shopping_bag);
        return div;

    }

    renderInfoButton() {
        const div = document.createElement('div');
        const info = document.createElement('i');
        info.innerText = 'info';
        info.id = 'info';
        info.className = 'material-icons';
        div.append(info);
        return div;
    }


    render() {
        const div = document.createElement('div');
        div.className = 'Item';

        const img = document.createElement('img');
        img.src = this.photos[0];

        div.append(img);

        div.append(this.renderTitle(this.title));
        div.append(this.renderLocalization());
        div.append(this.renderBuyButton());

        return div;
    }


    async buy(item_id, item) {

        const formData = new FormData();
        formData.append('item_id', item_id);

        alert('poszlo');

        const response = await fetch('/buy', {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            alert('kupiłes')
            item.remove();
        } else {
            alert('error');
        }
    }

}