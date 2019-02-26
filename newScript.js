const searchBtn = document.getElementById("searchBtn");
const searchBox = document.getElementById("searchBox");

const API_KEY = "AIzaSyBhjrxQAqNOLD0JIMgVIBnplJQzm1E60N8";


document.getElementById('submitForm').addEventListener('submit', getData);
searchBtn.addEventListener('click', getData);
// searchBtn.addEventListener('click', getData);

function getData(e) {
    e.preventDefault();
    let input = searchBox.value;

    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://www.googleapis.com/books/v1/volumes?q=' + input + '&key=' + API_KEY + '&maxResults=20', true);
    xhr.onload = function() {
        // console.log(JSON.parse(this.responseText));
        let books = JSON.parse(this.responseText);
        let output = '';
        let items = books.items

        for(let i in items) {
            let title = items[i].volumeInfo.title;
            let author = items[i].volumeInfo.authors[0];
            let imgSrc = items[i].volumeInfo.imageLinks ? items[i].volumeInfo.imageLinks.thumbnail : 'https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg';
            output += 
                '<div class="book">' +
                '<h2>' + title + '</h2>' + 
                '<p>' + author + '<p>' +
                '<img src="' + imgSrc + '">' + '</div>';
        }
        document.getElementById('data').innerHTML = output;
    }
    xhr.send();
}