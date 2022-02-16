var authform = document.getElementById("authform");

authform.addEventListener("submit", (e) => {
  e.preventDefault();

  var headers = new Headers();
  headers.append("Content-Type", "application/json");

  var jsonData = JSON.stringify(Object.fromEntries(new FormData(authform)));
  var requestOptions = {
    method: "POST",
    body: jsonData,
    headers,
  };

  fetch(
    "https://codeit-fe-internship-2022.herokuapp.com/api/authentication",
    requestOptions
  )
    .then((response) => {
      console.log(response);
      return response;
    })
    .then((status) => {
      console.log(status);
      if (status.status >= 200 && status.status < 400) {
        localStorage.setItem("token", "1");
        return (window.location.href = "../preview/preview.html");
      } else {
        throw status.status;
      }
    })

    .catch((error) => {
      var el = document.getElementById("myModal");
      el.style.display = "block";

      var span = document.getElementsByClassName("close")[0];
      span.onclick = function () {
        el.style.display = "none";
      };
      window.onclick = function (event) {
        if (event.target == modal) {
          el.style.display = "none";
        }
      };
    });
});
