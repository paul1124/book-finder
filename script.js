const searchBtn = document.getElementById("searchBtn");
const searchBox = document.getElementById("searchBox");
const dataDiv = document.getElementsByClassName("data");

const API_KEY = "AIzaSyBhjrxQAqNOLD0JIMgVIBnplJQzm1E60N8";

searchBtn.addEventListener('click', handleSearch);

// let xhr = new XMLHttpRequest();

// xhr.onload = function() {
//   if (xhr.status >= 200 && xhr.status < 300) {
//     console.log('success', xhr);
//   } else {
//     console.log('The request failed');
//   }
// }

// xhr.open('GET', `https://www.googleapis.com/books/v1/volumes?q=harry&key=${API_KEY}`);

function handleSearch() {
  let queryValue = searchBox.value;
  if(queryValue == '' || queryValue.replace(/\s/, '') == '') {
    alert('Search Box cannot be empty');
    return;
  } else {
    let data = getData(queryValue, API_KEY);
    console.log(data);
    // displayData(data);
  }
}

async function getData(query) {
  let response = await get(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
  let results = await response.json();
  console.log(results + 'hello');
  return results;
}