var current_user_h1 = document.getElementById("current_user");
var current_user = localStorage.getItem("username");


let numbers = [];
var srno = 1;
const storageRef = firebase.storage();
// Create a reference under which you want to list
var listRef = storageRef.ref();
var tbody = document.getElementById("tbody");
var usertagdocRef = db.collection("userTag").doc("ids");
user_userid = {};
handlers_users = [];
assigned_handlers = {};
// Find all the prefixes and items.
function myFunction() {
  assigned_handlers = {};
  db.collection("Users")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        user_userid[doc.data().username] = doc.id;
        handlers_users.push(doc.data().username);
        console.log(doc.data().assigned)
        doc.data().assigned.forEach((n) => {
          assigned_handlers[n] = doc.data().username;
        });
      });
    });

  usertagdocRef
    .get()
    .then((doc) => {
      if (doc.exists) {
        data = doc.data();
        filltable(data, assigned_handlers);
      } else {
        console.log("No such document!");
      }
    })
    .catch((error) => {
      console.log("Error getting document:", error);
    });
}
function filltable(data, assigned_handlers) {
  listRef
    .listAll()
    .then((res) => {
      res.prefixes.forEach((folderRef) => {
        // All the prefixes under listRef.
          if (
            current_user == assigned_handlers[folderRef.name] ||
            current_user == "admin"
          ) {
            var tr = document.createElement("tr");
            var td = document.createElement("td");
            td.innerHTML = srno;
            td.scope = "row";
            srno += 1;
            td.setAttribute("style","text-align:center")
            tr.appendChild(td);
            tbody.appendChild(tr);
            var td = document.createElement("td");
            var a = document.createElement("p");
            a.setAttribute("href", "info.html?mob=" + folderRef.fullPath);
            a.method = "POST";
            a.innerHTML = folderRef.name;
            td.appendChild(a);
            td.setAttribute("style","text-align:center")
            numbers.push(folderRef.fullPath);
            tr.appendChild(td);
            var td_date = document.createElement("td");
            var date_ref = storageRef.ref(folderRef.name + "/" + "contacts");
            var current_date = "N/A";
            date_ref.listAll().then((res) => {
              res.items[0].getMetadata().then((metadata) => {
                // Metadata now contains the metadata for 'images/forest.jpg'
                if (metadata.timeCreated.toString()) {
                  current_date = metadata.timeCreated.toString().slice(0, 10);
                }
                td_date.innerHTML = current_date;
              });
            });
            td_date.innerHTML = current_date;
            td_date.setAttribute("style","text-align:center")
            tr.appendChild(td_date);
            var td = document.createElement("td");
            var form = document.createElement("form");
            form.method = "POST";
            var input = document.createElement("input");
            input.type = "text";
            input.setAttribute("class", "user_tag");
            // console.log(data[folderRef.name]);
            if (data[folderRef.name]) {
              input.value = data[folderRef.name];
            }
            input.readOnly = true;
            input.placeholder = "Remark";
            form.appendChild(input);
td.setAttribute("style","text-align:center")
            td.appendChild(form);
            

            tr.appendChild(td);
            var td = document.createElement("td");
            var a = document.createElement("a");
            a.setAttribute("href", "info.html?mob=" + folderRef.fullPath);
            a.setAttribute("class","but_link");
            a.method = "POST";
            a.innerHTML = "Manage";
            td.appendChild(a);
            td.setAttribute("style","text-align:center")
            numbers.push(folderRef.fullPath);
            tr.appendChild(td);
            // tr.appendChild(td);
            tbody.appendChild(tr);
          }
        
      });
    })
    .catch((error) => {
      // Uh-oh, an error occurred!
    });
}

var edit_user_tag_btn = document.createElement("button");
edit_user_tag_btn.innerHTML = "Edit User Tag";
edit_user_tag_btn.setAttribute("onClick", "edit_tag()");
function edit_tag() {
  a = document.getElementsByTagName("a");
  user_tag = document.getElementsByClassName("user_tag");
  for (i = 0; i < a.length; i++) {
    user_tag[i].readOnly = false;
  }
}

var controls = document.createElement("div");
if (current_user == "admin") {
  var dict = {};
  var button_submit = document.createElement("button");
  button_submit.innerHTML = "Save Remark";
  button_submit.setAttribute("onClick", "save_tag()");
  function save_tag() {
    a = document.getElementsByTagName("a");
    user_tag = document.getElementsByClassName("user_tag");
    for (i = 0; i < a.length; i++) {
      dict[a[i].textContent] = user_tag[i].value;
      user_tag[i].readOnly = true;
    }
    console.log(dict);
    db.collection("userTag")
      .doc("ids")
      .set(dict)
      .then(() => {
        console.log("written");
      })
      .catch((error) => {
        console.log("error", e);
      });
  }

  var edit_user_tag_btn = document.createElement("button");
  edit_user_tag_btn.innerHTML = "Edit Remark";
  edit_user_tag_btn.addEventListener("click", function (e) {
    a = document.getElementsByTagName("a");
    user_tag = document.getElementsByClassName("user_tag");
    for (i = 0; i < a.length; i++) {
      user_tag[i].readOnly = false;
    }
  });

  var manage_users = document.createElement("button");
  manage_users.innerHTML = "Manage Users";
  manage_users.addEventListener("click", function (e) {
    window.open("manage.html", "_parent");
  });

  controls.setAttribute("id", "control");
  button_submit.setAttribute("style","cursor:pointer; padding-top:5px; padding-bottom:5px;")
  edit_user_tag_btn.setAttribute("style","cursor:pointer; padding-top:5px; padding-bottom:5px;")
  manage_users.setAttribute("style","cursor:pointer; padding-top:5px; padding-bottom:5px;")
  controls.appendChild(button_submit);
  controls.appendChild(edit_user_tag_btn);
  controls.appendChild(manage_users);
  document.getElementById("btn_man").appendChild(controls);
}

myFunction();
