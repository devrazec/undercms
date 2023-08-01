document.onreadystatechange = function () {
    if (document.readyState == "complete") {
        console.log("Success in index.html onreadystatechange()"); 
        getIndexJson(fillIndexPage); 
        updateIndexMenu();      
           
    }
}

function updateIndexMenu() {
    

    /* $(".p-navigation__link").click(function() {  
        $(".p-navigation__link").removeClass("is-selected"); // This will remove active classes from all <li> tags
        $(this).addClass("is-selected"); // This will add active class in clicked <li>   
      }); */

    var menu = document.getElementById("index-menu");
    var menulist = menu.getElementsByClassName("p-navigation__item");


    console.log(menulist);

    for (var i = 0; i < menulist.length; i++) {
        menulist[i].addEventListener("click", function() {
          var current = document.getElementsByClassName("p-navigation__item is-selected");
          current[0].className = current[0].className.replace("p-navigation__item is-selected", "p-navigation__item");
          //this.className += " p-navigation__item is-selected";          
        });
    }



      //var menulist = document.getElementsByClassName(".p-navigation__item .p-navigation__link");

      

     /*  document.querySelectorAll(".p-navigation__link ul li a").forEach((link) => {
        if (link.href === window.location.href) {
            link.classList.add("is-selected");
            link.setAttribute("aria-current", "page");
        }
    }); */

    /* // Get the container element
    var btnContainer = document.getElementById("index-menu");

    // Get all buttons with class="btn" inside the container
    var btns = btnContainer.getElementsByClassName("p-navigation__link");

    // Loop through the buttons and add the active class to the current/clicked button
    for (var i = 0; i < btns.length; i++) {
        btns[i].addEventListener("click", function() {
            var current = document.getElementsByClassName("is-selected");
            current[0].className = current[0].className.replace(" is-selected", "");
            this.className += " is-selected";
        });
    } */
}

function updateIndexTab() {

(function () {
    var keys = {
      left: 'ArrowLeft',
      right: 'ArrowRight',
    };
  
    var direction = {
      ArrowLeft: -1,
      ArrowRight: 1,
    };
  
    /**
      Attaches a number of events that each trigger
      the reveal of the chosen tab content
      @param {Array} tabs an array of tabs within a container
    */
    function attachEvents(tabs) {
      tabs.forEach(function (tab, index) {
        tab.addEventListener('keyup', function (e) {
          if (e.code === keys.left || e.code === keys.right) {
            switchTabOnArrowPress(e, tabs);
          }
        });
  
        tab.addEventListener('click', function (e) {
          e.preventDefault();
          setActiveTab(tab, tabs);
        });
  
        tab.addEventListener('focus', function () {
          setActiveTab(tab, tabs);
        });
  
        tab.index = index;
      });
    }
  
    /**
      Determine which tab to show when an arrow key is pressed
      @param {KeyboardEvent} event
      @param {Array} tabs an array of tabs within a container
    */
    function switchTabOnArrowPress(event, tabs) {
      var pressed = event.code;
  
      if (direction[pressed]) {
        var target = event.target;
        if (target.index !== undefined) {
          if (tabs[target.index + direction[pressed]]) {
            tabs[target.index + direction[pressed]].focus();
          } else if (pressed === keys.left) {
            tabs[tabs.length - 1].focus();
          } else if (pressed === keys.right) {
            tabs[0].focus();
          }
        }
      }
    }
  
    /**
      Cycles through an array of tab elements and ensures 
      only the target tab and its content are selected
      @param {HTMLElement} tab the tab whose content will be shown
      @param {Array} tabs an array of tabs within a container
    */
    function setActiveTab(tab, tabs) {
      tabs.forEach(function (tabElement) {
        var tabContent = document.getElementById(tabElement.getAttribute('aria-controls'));
  
        if (tabElement === tab) {
          tabElement.setAttribute('aria-selected', true);
          tabContent.removeAttribute('hidden');
        } else {
          tabElement.setAttribute('aria-selected', false);
          tabContent.setAttribute('hidden', true);
        }
      });
    }
  
    /**
      Attaches events to tab links within a given parent element,
      and sets the active tab if the current hash matches the id
      of an element controlled by a tab link
      @param {String} selector class name of the element 
      containing the tabs we want to attach events to
    */
    function initTabs(selector) {
      var tabContainers = [].slice.call(document.querySelectorAll(selector));
  
      tabContainers.forEach(function (tabContainer) {
        var tabs = [].slice.call(tabContainer.querySelectorAll('[aria-controls]'));
        attachEvents(tabs);
      });
    }
  
    document.addEventListener('DOMContentLoaded', function () {
      initTabs('[role="tablist"]');
    });
  })();

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
        let indexmenu = data['menu'];  
        if (indexmenu.length > 0) {
            
            // Sort menu
            indexmenu.sort(funcSort);
            
            let menuitem = "";
            for(let item of indexmenu) {
                if(item.active === 'true') {

                    if (config !== null && config !== undefined && config !== "") {
                        if(item.slug === config.defaultMenu) {
                            menuitem += `<li class='p-navigation__item is-selected'>
                                            <a class='p-navigation__link' href='#${item.slug}'>${item.name}</a>
                                        </li>`;              
                        } else {                 
                            menuitem += `<li class='p-navigation__item'>
                                            <a class='p-navigation__link' href='#${item.slug}'>${item.name}</a>
                                        </li>`;
                        }
                    } else {
                        menuitem += `<li class='p-navigation__item'>
                                        <a class='p-navigation__link' href='#${item.slug}'>${item.name}</a>
                                    </li>`;
                    }
                }        
            }  

            document.getElementById("index-menu").innerHTML = menuitem; 
        }

        // Fill page
        let indexpage = data['page'];  
        if (indexpage.length > 0) {
        
            // Sort page
            indexpage.sort(funcSort);

            let pageitem = "";
            for(let item of indexpage) {
                if(item.active === 'true') {

                    pageitem += `<section id='${item.menuSlug}'>  
                        <aside class='p-strip is-shallow'>
                            <div class='row--25-75 is-split-on-medium'>
                                <div class='col'>  
                                    <div class='p-section'>     
                                        <img src='${item.image}' alt='${item.title}'>
                                    </div>       
                                </div>
                                <div class='col'>  
                                    <div class='p-section'>
                                        <p class='p-heading--2'>${item.title}</p>
                                        <p class='p-heading--3'>${item.content}</p>
                                    </div>                                                      
                                </div>
                            </div>    
                        </aside>      
                    </section><hr>`;
                
                }
            }

            document.getElementById("index-page").innerHTML = pageitem; 
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