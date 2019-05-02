$(document).ready(function () {
    console.log("Hi from Mahesh" + sessionStorage.getItem("user") + " done");
    if (sessionStorage.getItem("user") == null) {
        $(location).attr('href', '../login.html')
    }
  });