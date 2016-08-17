
//Defining global variables
var BASE_URL = ["https://www.facebook.com/search/top/?q=", 
                "https://twitter.com/search?q=",
                "https://www.linkedin.com/pub/dir/?",
                "https://github.com/search?utf8=%E2%9C%93&q=",
                "https://en.wikipedia.org/w/index.php?search="];

var BASE_URL_NAME = ["Facebook", 
                    "Twitter", 
                    "LinkedIn",
                    "GitHub",
                    "Wikipedia"];

var context = "selection"

function hasWhiteSpace(s) {
  return s.indexOf(' ') >= 0;;
}

// A generic onclick callback function.
//info is a JavaScript Object
function onClick(info, tab) {

  var searchQuery = info.selectionText;
  var index = 0; 

  for (var i = 0; i < BASE_URL_NAME.length; i++){
    if(BASE_URL_NAME[i] === info.menuItemId){
      index = i;
      if(BASE_URL_NAME[i] === "LinkedIn"){
        if(hasWhiteSpace(searchQuery)){
        var firstName = searchQuery.substring(0,searchQuery.indexOf(' '));
        var lastName = searchQuery.substring(searchQuery.indexOf(' ') + 1);
        searchQuery = "first=" +firstName + "&last=" + lastName;
        }
        else{
          searchQuery = "first=" + searchQuery + "&last="; 
        }
      }
    }
  }

  var url = BASE_URL[index] + searchQuery
  chrome.tabs.create({"index": 1, "url": url, "selected": true}); 
}


//Parent Menu
chrome.contextMenus.create({
    title: "Lookup '%s' on...",
    contexts:[context],
    id: "parent",
});

//Creating child menu items 
for (var i = 0; i < BASE_URL_NAME.length; i++) {
  var title = BASE_URL_NAME[i];
  var id = BASE_URL_NAME[i];
  chrome.contextMenus.create({"title": title,"contexts":[context],
                                       "parentId": "parent", "id": id, 
                                       "onclick": onClick});
}
