var alert = document.getElementById("alertBox");


document.getElementById('myForm').addEventListener('submit', myBook);


function myBook(e) {
    //prevent Default
    e.preventDefault();

    //Make two variables

    var siteName = document.getElementById('siteName').value;
    var siteUrl = document.getElementById('siteUrl').value;

if(!validate(siteName , siteUrl)){
    return false;
}


    //Create object

    var bookmark = {
        name: siteName,
        url: siteUrl
    }


    //If bookmark is null
    if (localStorage.getItem('bookmarks') === null) {
        //intial array
        var bookmarks = [];

        //Add bookmark
        bookmarks.push(bookmark);

        //Set to Local Storage

        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
      //If not null then
    } else {

        //Get bookmarks from local storage

        var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

        //Add to array
        bookmarks.push(bookmark);

        //Re-set to local Storage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));


    }

    alert.style.display = "none";
    // Clear form
    document.getElementById('myForm').reset();

    // Re-fetch bookmarks
    getBookmark();
}

//Delete the url
function deleteItem(url) {

    //Get bookmarks from local storage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    //Loop through book mark
    for (var i = 0; i < bookmarks.length; i++) {
        //If the URL matches 
        if (bookmarks[i].url == url) {
            
            //Delete it
            bookmarks.splice(i, 1);
        }
    }

    //Re-set to local Storage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    // Re-fetch bookmarks
    getBookmark();
}


///Get Bookmark to actual page
function getBookmark() {
    //Get bookmarks from local storage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    
    //Select the place where you have to display output
    var result = document.getElementById('result');
    
    //Build the output
    result.innerHTML = '';
    for (var i = 0; i < bookmarks.length; i++) {
        var name = bookmarks[i].name;
        var url = bookmarks[i].url;

        result.innerHTML += '<div class="well" >' +
            '<h3>' + name +
            ' <a href="' + url + '" class="btn btn-default" target="-blank">Visit</a> ' + 
            '<a onclick = "deleteItem(\'' + url + '\')" class="btn btn-danger">Delete</a>' +

            '</h3>' +
            '<div>';
    }
}


//Validation of form


function validate(siteName , siteUrl){
    
    //Input Validation
    if (!siteName || !siteUrl) {
        alert.style.display = "block";
        alert.innerHTML = `<strong>ERROR: Fill the form</strong>`;
        return false;
    }

    //URL Validation
    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);

    if (!siteUrl.match(regex)) {
        alert.style.display = "block";
        alert.innerHTML = `<strong>ERROR: Please enter a proper URL</strong> `;

        return false;
    }
    
    return true;
}