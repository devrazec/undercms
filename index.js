document.onreadystatechange = function () {
    if (document.readyState == "complete") {
      console.log("Success in HTML onreadystatechange()");
      getIndexJson();
      loadIndexJson();
    }
}
  
// Sort array by field
function funcSort(a, b) {
    return a.sort > b.sort ? 1 : -1;
}
  
// Load index json file
function getIndexJson() {
    
    fetch("index.json")
    .then(function(response){
        return response.json();
    })
    .then(function(data){
  
        let config = JSON.stringify(data['config']);
        let configs = JSON.parse(config);  
      
        // Fill Menu
        let menu = JSON.stringify(data['menu']);
        let menus = JSON.parse(menu);
        menus.sort(funcSort);
        let menuitems = "";
        for(let item of menus) {
            if(item.active === 'true') {
                if(item.slug === configs.defaultMenu) {
                    menuitems += `<li class="p-navigation__item is-selected">
                                        <a class="p-navigation__link" href="#">${item.name}</a>
                                  </li>`;              
                } else {
                    menuitems += `<li class="p-navigation__item">
                                    <a class="p-navigation__link" href="#">${item.name}</a>
                                  </li>`;              
                }    
            }        
        }        
        document.getElementById("index-menu").innerHTML = menuitems;  

        // Fill pageHeader
        document.getElementById('index-header-content').textContent = configs.pageHeader.content;
        document.getElementById("index-header-color").style.backgroundColor = configs.pageHeader.backgroundColor;
        document.getElementById("index-header-color").style.backgroundImage = configs.pageHeader.backgroundImage;
        
        let page = JSON.stringify(data['page']);
        let pages = JSON.parse(page);
        pages.sort(funcSort); 
      
        let post = JSON.stringify(data['post']);
        let posts = JSON.parse(post);
        posts.sort(funcSort);       

        //alert(menus);

        //console.log(configs);
        //console.log(menus);
        //console.log(pages);
        //console.log(posts);    

    });    
}

// Post index json file to update
function updateIndexJson(data) {

    let url = "./index.php";        
    let xhr = new XMLHttpRequest();     

    xhr.onloadend = function() {
        if (xhr.status == 404) 
        console.log("Error in JS updateIndexJson()");
    }
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {                                                   
            let response = JSON.parse(this.responseText); 
            console.log("Success in JS updateIndexJson()");
            console.log(response);
        }
    };  
    xhr.open("POST", url, true);  
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send(JSON.stringify(data));     
}

// Get index json file to update
function loadIndexJson() {

    let url = "./index.json";
    let xhr = new XMLHttpRequest();  
    
    xhr.onloadend = function() {
        if (xhr.status == 404) 
        console.log("Error in JS loadIndexJson()");
    }

    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {        
            let data = JSON.parse(this.responseText);            
            data.config.description = "Test of descripton";                               

            updateIndexJson(data);
            //console.log(data); 
            console.log("Success in JS loadIndexJson()");           
        }
    };  
    xhr.open("GET", url, true);       
    xhr.send();     
}

 