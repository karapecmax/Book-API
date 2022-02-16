function fetchPhoto(url) {
  return fetch(url)
    .then((response) => response.blob())
    .then(
      (blob) =>
        new Promise((callback) => {
          let reader = new FileReader();
          reader.onload = function () {
            callback(this.result);
          };
          reader.readAsDataURL(blob);
        })
    );
}

async function photo(id) {
  let dataUri = await fetchPhoto(
    `https://codeit-fe-internship-2022.herokuapp.com/api/books/${id}/image`
  );

  document.getElementById(`img_${id}`).setAttribute("src", dataUri);
}

function fetchData() {
  fetch("https://codeit-fe-internship-2022.herokuapp.com/api/books")
    .then((response) => {
      if (!response.ok) {
        throw Error("error");
      }

      return response.json();
    })
    .then((data) => {
      const html = data
        .map((books) => {
          return `
          <a href="../detail/detail.html?${books.id}" id="book-id">
            <div class="book">
            <p><img id="img_${books.id}" class="book-image"></p>
            <p>Author:${books.author} </p>
            <p>Genres:${books.genres} </p>
            </div>
            </a>`;
        })
        .join("");

      document.querySelector("#wrapper").insertAdjacentHTML("afterbegin", html);

      var images = document.getElementsByClassName("book-image");
      for (let index = 0; index < images.length; index++) {
        const element = images[index];
        // console.log(element.id);
        var photoId = element.id.split("_")[1];
        photo(photoId);
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

fetchData();
