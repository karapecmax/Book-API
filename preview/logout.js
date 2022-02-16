function logOut() {
  localStorage.removeItem("token");
  window.location.replace("../login/login.html");
}
