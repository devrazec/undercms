document.onreadystatechange = function () {
    if (document.readyState == "complete") {
        console.log("Success in index.html onreadystatechange()");   
        getAdminJson(fillAdminPage);
    }
}
  
// Sort array by field
function funcSort(a, b) {
    return a.sort > b.sort ? 1 : -1;
}

// Get index.json
function getIndexJson(nameFunc) {

    fetch('./index.json')
    .then((response) => response.json())
    .then(data => {                                            
        nameFunc(data);
    })        
    .catch(error => {
        console.log("Error in admin.js getIndexJson()", error);            
    });            
}

// Get user.json
function getUserJson(nameFunc) {

    fetch('./user.json')
    .then((response) => response.json())
    .then(data => {                                            
        nameFunc(data);
    })        
    .catch(error => {
        console.log("Error in admin.js getUserJson()", error);            
    });            
}

// Get admin.json
function getAdminJson(nameFunc) {

    fetch('./admin.json')
    .then((response) => response.json())
    .then(data => {                                            
        nameFunc(data);
    })        
    .catch(error => {
        console.log("Error in admin.js getAdminJson()", error);            
    });            
}

// Fill admin.html
function fillAdminPage(data) {
     
    if (data !== null && data !== undefined && data !== "") {
    
        // Fill config
        let config = data['config'];    
        if (config !== null && config !== undefined && config !== "") {

            // Fill pageHeader
            //document.getElementById('index-header-content').textContent = config.pageHeader.content;
            //document.getElementById("index-header-color").style.backgroundColor = config.pageHeader.backgroundColor;
            //document.getElementById("index-header-color").style.backgroundImage = config.pageHeader.backgroundImage;
        } else {
            console.log("Error in index.js Fill pageHeader");
        }

        // Fill menu
        let menu = data['menu'];  
        if (menu.length > 0) {
            
            // Sort menu
            menu.sort(funcSort);
            
            let menuitem = "";
            for(let item of menu) {
                if(item.active === 'true') {

                    if (config !== null && config !== undefined && config !== "") {
                        if(item.slug === config.defaultMenu) {
                            menuitem += `<li class="p-side-navigation__item">
                                                <a class="p-side-navigation__link" href="#" aria-current="page">${item.name}      
                                                </a>
                                        </li>`;              
                        } else {                 
                            menuitem += `<li class="p-side-navigation__item">
                                                <a class="p-side-navigation__link" href="#">${item.name}      
                                                </a>
                                        </li>`;
                        }
                    } else {
                        menuitem += `<li class="p-side-navigation__item">
                                            <a class="p-side-navigation__link" href="#">${item.name}      
                                            </a>
                                    </li>`; 
                    }
                }        
            }  

            document.getElementById("admin-menu").innerHTML = menuitem; 
        }

        // Fill page
        let admin_page = data['page'];  
        if (admin_page.length > 0) {
        
            // Sort page
            admin_page.sort(funcSort);

        }

        // Fill post
        //let post = data['post'];  
        //if (post.length > 0) {

            // Sort post
        //    post.sort(funcSort); 

        //}
        console.log("Success in admin.js fillAdminPage()"); 
    } else {
        console.log("Error in admin.js fillAdminPage()");
    }
     
    //alert(menu);    
    //console.log(menu);             
}