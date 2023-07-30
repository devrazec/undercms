document.onreadystatechange = function () {
    if (document.readyState == "complete") {
        console.log("Success in index.html onreadystatechange()");  
        getUserJson(fillUserPage);
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

// Fill user.html
function fillUserPage(data) {
     
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

            document.getElementById("user-menu").innerHTML = menuitem; 
        }

        // Fill page
        let user_page = data['page'];  
        if (user_page.length > 0) {
        
            // Sort page
            user_page.sort(funcSort);

        }                
        console.log("Success in admin.js fillUserPage()"); 
    } else {
        console.log("Error in admin.js fillUserPage()");
    }
     
    //alert(menu);    
    //console.log(menu);             
}