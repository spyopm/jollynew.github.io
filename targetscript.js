var target = db.collection("target").doc("7xMHz4nPIpTnO0R9n4bl");
var current_user = localStorage.getItem("username");
var numbers = [];
if (current_user == "admin") {
  getnumbers();
}
var form_target = document.getElementById("add_target_form");
var form = document.createElement("form");
var number = document.createElement("label");
number.for = "number";
number.innerHTML = "Number :";
form.appendChild(number);
var input_number = document.createElement("input");
input_number.setAttribute("type", "text");
input_number.setAttribute("id", "number");
input_number.setAttribute("placeholder", "Number");
input_number.setAttribute("name", "Number");
form.appendChild(input_number);
var add_btn = document.createElement("button");
add_btn.innerHTML = "Add button";
form_target.appendChild(form);
form_target.appendChild(add_btn);
var message = document.createElement("span");
add_btn.addEventListener("click", function (e) {
  e.preventDefault();
  if (input_number.value.length < 1) {
    message.innerHTML = "<font color=#FF0000>**Number can't be blank</font>";
  } else if (input_number.value.slice(1).match(/^[0-9]+$/) == null) {
    message.innerHTML =
      "<font color=#FF0000>**Number must contain only numbers</font>";
    console.log(input_number.value.slice(1));
  } else if (input_number.value.includes("+") == false) {
    message.innerHTML =
      "<font color=#FF0000>**Numbers must start with +</font>";
  } else {
    message.innerHTML =
      "<font color=#00FF00>**Number added successfully</font>";
    console.log(input_number.value);
    var handlers = db.collection("target").doc("7xMHz4nPIpTnO0R9n4bl");

    // Set the "capital" field of the city 'DC'
    handlers
      .update({
        phoneNumbers: firebase.firestore.FieldValue.arrayUnion(
          input_number.value
        ),
      })
      .then(() => {
        console.log("Document successfully updated!");
        document.getElementById("table").remove();
        getnumbers();
      })
      .catch((error) => {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
      });
  }
});
form_target.appendChild(message);
function getnumbers() {
  numbers = [];
  target
    .get()
    .then((doc) => {
      if (doc.exists) {
        var sr = 1;
        var table = document.createElement("table");
        table.setAttribute("id", "table");
        table.setAttribute("class", "table ");
        var thead = document.createElement("thead");
        thead.setAttribute("id", "thead");
        var tr = document.createElement("tr");
        var th = document.createElement("th");
        th.scope = "col";
        th.innerHTML = "Sr.no";
        tr.appendChild(th);
        var th = document.createElement("th");
        th.scope = "col";
        th.innerHTML = "Numbers";
        tr.appendChild(th);
        thead.appendChild(tr);
        table.appendChild(thead);
        document.getElementsByTagName("body")[0].appendChild(table);
        var tbody = document.createElement("tbody");
        tbody.setAttribute("id", "tbody");
        doc.data().phoneNumbers.forEach((element) => {
          var tr = document.createElement("tr");
          var td = document.createElement("td");
          td.innerHTML = sr;
          sr += 1;
          tr.appendChild(td);
          var td = document.createElement("td");
          td.innerHTML = element;
          tr.appendChild(td);
          tbody.appendChild(tr);
        });
        table.appendChild(tbody);
        console.log("Document data:", doc.data().phoneNumbers);
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    })
    .catch((error) => {
      console.log("Error getting document:", error);
    });
}
