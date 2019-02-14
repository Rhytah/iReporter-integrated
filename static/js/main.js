// document.getElementById('myusername').addEventListener('load',displayName);7/
// Get the modal
var modal = document.getElementById('');

// show element on click
function show(id){
    var a = document.getElementById(id);
    if(a.style.display == 'none')
    a.style.display= 'block';
    else
    a.style.display= 'none';
}

// hide element on click
function hide(id){
    var a = document.getElementById(id);
    if(a.style.display == 'block')
    a.style.display= 'none';
    else
    a.style.display= 'block';
}


function openPage(pageName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablink");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].style.backgroundColor = "";
    }
    document.getElementById(pageName).style.display = "block";
    // elmnt.style.backgroundColor = color;
  }
  


    var map;
    var geocoder;
    function InitializeMap() {

        var latlng = new google.maps.LatLng(-34.397, 150.644);
        var myOptions =
        {
            zoom: 8,
            center: latlng,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            disableDefaultUI: true
        };
        map = new google.maps.Map(document.getElementById("map"), myOptions);
    }
    

// profile
// function displayName(event){
//     username =
// }