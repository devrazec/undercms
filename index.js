document.onreadystatechange = function () {
    if (document.readyState == "complete") {
        console.log("Success in index.html onreadystatechange()");      
        getIndexJson(fillIndexPage);      
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
        console.log("Error in index.js getIndexJson()", error);            
    });            
}

// Fill index.html
function fillIndexPage(data) {
     
    if (data !== null && data !== undefined && data !== "") {
    
        // Fill config
        let config = data['config'];    
        if (config !== null && config !== undefined && config !== "") {

            // Fill pageHeader
            document.getElementById('index-header-content').textContent = config.pageHeader.content;
            document.getElementById("index-header-color").style.backgroundColor = config.pageHeader.backgroundColor;
            document.getElementById("index-header-color").style.backgroundImage = config.pageHeader.backgroundImage;
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
                            menuitem += `<li class="p-navigation__item is-selected">
                                            <a class="p-navigation__link" href="#">${item.name}</a>
                                        </li>`;              
                        } else {                 
                            menuitem += `<li class="p-navigation__item">
                                            <a class="p-navigation__link" href="#">${item.name}</a>
                                        </li>`;
                        }
                    } else {
                        menuitem += `<li class="p-navigation__item">
                                        <a class="p-navigation__link" href="#">${item.name}</a>
                                    </li>`;
                    }
                }        
            }  

            document.getElementById("index-menu").innerHTML = menuitem; 
        }

        // Fill page
        let page = data['page'];  
        if (page.length > 0) {
        
            // Sort page
            page.sort(funcSort);

        }

        // Fill post
        let post = data['post'];  
        if (post.length > 0) {

            // Sort post
            post.sort(funcSort); 

        }
        console.log("Success in index.js fillIndexPage()"); 
    } else {
        console.log("Error in index.js fillIndexPage()");
    }
     
    //alert(menu);    
    //console.log(menu);             
}

// User login
function postLoginUser(login, password) {

    fetch('./user.php', {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        login: login,
        senha: password
      })
    })
    .then((response) => response.json())
    .then(function (data) {        
        console.log("Success in index.js postLoginUser()");              
    })
    .catch(function (error) {
        console.log("Error in index.js postLoginUser()", error);
    });    
}