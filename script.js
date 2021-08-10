// define reference
let database = firebase.database().ref();

// button reference and other references
let button = document.querySelector("#submit");
let blogName = document.querySelector("#name");
let text = document.querySelector("#text");
let local = document.querySelector("#planet");
let blogTitle = document.querySelector("#title")


// event listener
button.onclick = function UpdateDB(event) {
    event.preventDefault();

    let username = blogName.value;
    let textMessage = text.value;
    let planetLocation = local.value;
    let postTitle = blogTitle.value;

    let value = {
        NAME: username,
        MESSAGE: textMessage,
        LOCATION: planetLocation,
        TITLE: postTitle
    }

    // push to database
    database.push(value);
    blogName.value ="";
    text.value = "";
    local.value = "";
    blogTitle.value ="";
}

// read stuff from database
database.on("child_added",sendPost);

function sendPost(rowData) {
    let row = rowData.val()

    // add element here to our viewing message board
    let board = document.querySelector("#Conversation");
    
    // create new element
    let newBlog = document.createElement("div");
    let blogText = document.createElement("p");

    // fill it with text
    blogText.innerHTML = "Title: " + row.TITLE + "<br> Name: " + row.NAME + "<br> Location: " + row.LOCATION + "<br> <br> " + row.MESSAGE;
    // some style
    blogText.style.margin = "15px";
    newBlog.style.margin = "15px";    
    // append elements
    newBlog.appendChild(blogText);
    board.appendChild(newBlog);
}