document.onreadystatechange = function () {
    if (document.readyState == "complete") {
      console.log("ready!");
      getAdminJson();
    }
}
  
// Sort array by field
function funcSort(a, b) {
    return a.sort > b.sort ? 1 : -1;
}

// Load admin json file
function getAdminJson(){
    
    fetch("admin.json")
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
  
        let config = JSON.stringify(data['config']);
        let configs = JSON.parse(config);
    
        // Fill Menu
        let menu = JSON.stringify(data['menu']);
        let menus = JSON.parse(menu);
        menus.sort(funcSort);
        let menuitems = "";
        for(let item of menus){
            if(item.slug === configs.defaultMenu) {
                menuitems += `<li class="p-side-navigation__item">
                                    <a class="p-side-navigation__link" href="#" aria-current="page">${item.name}      
                                    </a>
                              </li>`;             
            } else {
                menuitems += `<li class="p-side-navigation__item">
                                    <a class="p-side-navigation__link" href="#">${item.name}      
                                    </a>
                              </li>`;              
            }            
        }        
        document.getElementById("admin-menu").innerHTML = menuitems;            

        let page = JSON.stringify(data['page']);
        let pages = JSON.parse(page);
        pages.sort(funcSort);
    
        let admin = JSON.stringify(data['admin']);
        let admins = JSON.parse(admin);
        admins.sort(funcSort);

        //alert(menus);

        console.log(configs);
        console.log(menus);
        console.log(pages);
        console.log(admins);
        console.log(menuitems);
        
    });
}