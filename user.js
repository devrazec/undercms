document.onreadystatechange = function () {
    if (document.readyState == "complete") {
      console.log("ready!");
      getUserJson();
    }
}
  
// Sort array by field
function funcSort(a, b) {
    return a.sort > b.sort ? 1 : -1;
}
  
// Load user json file
function getUserJson(){
    
    fetch("user.json")
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
        for(let item of menus){
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
        document.getElementById("user-menu").innerHTML = menuitems; 
        
        let page = JSON.stringify(data['page']);
        let pages = JSON.parse(page);
        pages.sort(funcSort); 
    
        let user = JSON.stringify(data['user']);
        let users = JSON.parse(user);
        users.sort(funcSort);       

        //alert(menus);

        console.log(configs);
        console.log(menus);
        console.log(pages);
        console.log(users);    

    });
}