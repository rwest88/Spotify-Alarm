// Initialize Firebase
var config = {
  apiKey: "AIzaSyChvFGY3IOW8HQf30alGRKO6_Psp2Un7cs",
  authDomain: "spotify-alarm-1521758993850.firebaseapp.com",
  databaseURL: "https://spotify-alarm-1521758993850.firebaseio.com",
  projectId: "spotify-alarm-1521758993850",
  storageBucket: "",
  messagingSenderId: "368791517227"
};

firebase.initializeApp(config);

var $collapsible = $('#collapseExample');

$('#datetimepicker3').datetimepicker({
  format: 'LT'
});
$('#alarm-form').on('submit', function(evt) {
  evt.preventDefault();
  $collapsible.collapse('hide');
  $('#alarm-set-msg').addClass('show');
  setTimeout($('#alarm-set-msg').removeClass('show'), 5000);
});
  
var d = new Date();
var timeHours = d.getHours();
var timeMinutes = d.getMinutes();
var timeSeconds = d.getSeconds();

// if (timeHours > 12) {
  
// }

// $('#submit-btn').on('click', function () {
//   if ()
// });

console.log(`${timeHours}:${timeMinutes}`);