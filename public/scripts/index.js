const root = document.getElementById('root');

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

    console.log(data);

    return data
        .map(item => new Item(item['id'], item['title'], item['coords'], item['description'], item['photos']));

}



// const sorting_menu = document.getElementById('sorting-menu');
// sorting_menu.append();


fetchItems()
    .then(items => {
        animation.remove();
        items.forEach(item => root.append(item.render()));
    })
    .catch(error => {
    });


