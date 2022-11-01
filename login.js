user_userid = {};
db.collection("Users")
  .get()
  .then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      user_userid[doc.data().username] = doc.data().pass;
    });
  });
function validate() {
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;

  console.log(username,password);
  if (password == user_userid[username]) {

    localStorage.setItem("username", username);
    window.open("main.html","_parent");
    return false;
  } else {
    alert("login failed");
  }
}
