const searchBtn = document.getElementById("searchBtn");
const searchBox = document.getElementById("searchBox");

const API_KEY = "AIzaSyBhjrxQAqNOLD0JIMgVIBnplJQzm1E60N8";

const errorStyle = {
    fontSize: "2em",
    height: "10rem"
}


document.getElementById('submitForm').addEventListener('submit', getData);
document.addEventListener('keypress', function(e) {
    if(e.keyCode == '13') {
        getData;
    }
});
document.getElementById('erase').addEventListener('click', function(e) {
    searchBox.value = '';
    return;
});
searchBtn.addEventListener('click', getData);

function getData(e) {
    e.preventDefault();
    let input = searchBox.value;
    if(input == '' || input.replace(/\s/, '') === '') {
        document.getElementById('data').innerHTML = '<h2>Search Query Blank!</h2>';
        document.getElementById('data').className="showData";
        document.getElementById('data').style = errorStyle;
        return ;
    }

    var xhr = new XMLHttpRequest();
    xhr.timeout = 2000;
    xhr.open('GET', 'https://www.googleapis.com/books/v1/volumes?q=' + input + '&key=' + API_KEY + '&maxResults=20', true);
    xhr.onload = function() {
        let books = JSON.parse(this.responseText);
        let output = '';
        let items = books.items;

        if(this.status == 404) {
            document.getElementById('data').innerHTML = '<h2>Something Went Wrong. Try Again.</h2>';
            document.getElementById('data').className="showData";
            document.getElementById('data').style = errorStyle;
            return ;
        }
        if(books.totalItems == 0) {
            document.getElementById('data').innerHTML = '<h2>No Books matching the query</h2>';
            document.getElementById('data').className = "showData";
            document.getElementById('data').style = errorStyle;
            return ;
        }

        for(let i in items) {
            let title = items[i].volumeInfo.title.length > 30 ? items[i].volumeInfo.title.substring(0, 30) + '...' : items[i].volumeInfo.title;
            let author = items[i].volumeInfo.authors ? items[i].volumeInfo.authors[0] : 'Unknown Writer';
            let publishedYear = items[i].volumeInfo.publishedDate ? ', ' + items[i].volumeInfo.publishedDate.substring(0, 4) : '';
            let link = items[i].volumeInfo.infoLink;
            let imgSrc = items[i].volumeInfo.imageLinks ? items[i].volumeInfo.imageLinks.thumbnail : './nobookcover.jpg';
            output += 
                '<div class="book">' +
                    '<div class="book-image">' +
                        '<img src="' + imgSrc + '">' +
                    '</div>' + 
                    '<div class="book-description">' +
                        '<h2>' + title + '</h2>' + 
                        '<p> by ' + author + '<span>' + publishedYear + '</span><p>' +
                        '<a target="_blank" class="link" href="' + link + '"> More Info </a>' +
                    '</div>' + 
                 '</div>';
        }
        document.getElementById('data').className = 'showData';
        document.getElementById('data').style.background="#4a4969";
        document.getElementById('data').innerHTML = output;
    }
    xhr.ontimeout = function(e) {
        document.getElementById('data').className = "showData";
        document.getElementById('data').style = errorStyle;
        document.getElementById('data').innerHTML = 'Request Timed Out';
    }
    xhr.send();
}