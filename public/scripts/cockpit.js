const main = document.getElementById('root');

const return_menu_option = document.getElementById('return-menu-option');
const dashboard_menu_option = document.getElementById('dashboard-menu-option');
const upload_menu_option = document.getElementById('upload-menu-option');
const logout_menu_option = document.getElementById('logout-menu-option');


// Navigation options:
return_menu_option.onclick = () => {
    window.location.replace('/');
}

// Dashboard:
dashboard_menu_option.onclick = () => {
    root.innerHTML = null;
    root.className = 'Dashboard';
}

// Uploading:
upload_menu_option.onclick = () => {
    root.innerHTML = null;
    root.className = 'Upload';
    root.append(new UploadForm().render());
}

// Cart:



// Logout:
logout_menu_option.onclick = async () => {

    const response = await fetch('/logout', {
        method: 'POST'
    })

    if (response.ok) {
        window.location.replace('/');
    }
}
