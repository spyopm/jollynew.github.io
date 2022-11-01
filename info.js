var current_user = localStorage.getItem("username");
if (current_user == null) {
    window.alert("You have not logged in");
    window.open("login.html", "_parent");
}
var dashname=document.getElementById("dashboard_name");
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const user = queryString.slice(queryString.indexOf('=') + 1, queryString.length)
var dash_call=document.getElementById('dash_call');
var dash_calls=document.getElementById('dash_calls');
var dash_loc=document.getElementById('dash_loc');
var dash_device=document.getElementById('dash_device');
var dash_apps=document.getElementById('dash_apps');
const storageRef = firebase.storage();
var listRef = storageRef.ref(user);

dashname.innerHTML=user;

dashname.setAttribute("href","main.html");


var call_link_ele=document.getElementById('call_link');
call_link='call.html?mob='+user
call_link_ele.setAttribute("href",call_link);
dash_call.setAttribute("href",call_link);
dash_calls.setAttribute("href",call_link);

var device_link_ele=document.getElementById('device_link');
device_link='device.html?mob='+user
device_link_ele.setAttribute("href",device_link);
dash_device.setAttribute("href",device_link);


var location_link_ele=document.getElementById('location_link');
location_link='location.html?mob='+user
location_link_ele.setAttribute("href",location_link);
dash_loc.setAttribute("href",location_link);

var apps_link_ele=document.getElementById('apps_link');
apps_link='apps.html?mob='+user
apps_link_ele.setAttribute("href",apps_link);
dash_apps.setAttribute("href",apps_link);