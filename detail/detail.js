var full_url = document.URL; // Get current url
var url_array = full_url.split("?"); // Split the string into an array with / as separator
var last_segment = url_array[url_array.length - 1]; // Get the last part of the array (-1)

function fetchData(id) {
  fetch(`https://codeit-fe-internship-2022.herokuapp.com/api/books/${id}`)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      const html = `
             <div class="book">
             <p>${data.title}</p>
           <p>${data.description}</p>
            <p>Author:${data.author} </p>
            <p>Genres: ${data.genres}</p>
            <p>Pages:${data.pages} </p>
              </div>`;
      document.querySelector("#result").insertAdjacentHTML("afterbegin", html);
    });
}

fetchData(last_segment);
