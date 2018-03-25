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

var greetings = [
  "Good Morning!",
  "Good Afternoon Sir!",
  "Good Evening!",
  "What are you doing up so late?!"
]
var greeting;

var intervalID = setInterval(updateTime, 1000);
updateTime();

var playing = false;

function updateTime() {
  var d = new Date();
  var timeHours = d.getHours();
  var timeMinutes = d.getMinutes();
  if (timeMinutes < 10) {timeMinutes = "0" + timeMinutes}
  var AMorPM = "AM"

  if (timeHours > 3 && timeHours < 12) {greeting = greetings[0]}
  if (timeHours > 11 && timeHours < 19) {greeting = greetings[1]}
  if (timeHours > 18 && timeHours <= 24) {greeting = greetings[2]}
  if (timeHours >= 0 && timeHours < 4) {greeting = greetings[3]}

  // if (timeHours > 12) {
  //   hoursStandard = timeHours - 12;
  //   var AMorPM = "PM";
  // } else if (timeHours == 12 ) {
  //   hoursStandard = 12;
  //   AMorPM = "PM";
  // } else {
  //   hoursStandard = timeHours;
  //   AMorPM = "AM"
  // }
  // if (timeHours == 0) (hoursStandard = 12)
  // if (timeHours == 24) {hoursStandard = 12; AMorPM = "AM"}

  if (timeHours > 11) {
    AMorPM = "PM";
  }
  if (timeHours > 12) {
    timeHours -= 12;
  }
  if (timeHours == 0) {
    timeHours = 12;
  }

  $('#time').text(`${timeHours}:${timeMinutes} ${AMorPM}`);
  $('#greet').text(greeting);



  if (alarmHours == timeHours && alarmMinutes == timeMinutes && alarmAMPM == AMorPM) {
    if (!playing) {
      console.log("play song");
      playing = true;
    }
  }










}

// $('#submit-btn').on('click', function () {
//   if ()
// });

var $collapsible = $('#collapseExample');

$('#datetimepicker3').datetimepicker({
  format: 'LT'
});

var alarmTime;
var alarmHours;
var alarmMinutes;
var alarmAMPM;

$('#alarm-form').on('submit', function(evt) {
  evt.preventDefault();
  $collapsible.collapse('hide');
  $('#alarm-set-msg').addClass('show');
  setTimeout(function() {$('#alarm-set-msg').removeClass('show')}, 3000);
  alarmTime = ($('.datetimepicker-input').val());
  if (alarmTime.charAt(1) == ":") {
    alarmTime = "0" + alarmTime;
  }
  alarmHours = alarmTime.slice(0, 2);
  alarmMinutes = alarmTime.slice(3, 5);
  alarmAMPM = alarmTime.slice(6, 8);
  console.log(alarmHours);

});

$(document).ready(function() {
  console.log("are u alive");

//Youtube links
var sunnyMusic = "https://www.youtube.com/embed/mxL2C3iejCw?autoplay=1";
var rainyMusic = "https://www.youtube.com/embed/6Gkdf0IIUNY?autoplay=1";
var snowMusic = "https://www.youtube.com/embed/geCNx65eFzE?autoplay=1";
var drizzleMusic = "https://www.youtube.com/embed/63JD_AY2bfc?autoplay=1";
var cloudyMusic = "https://www.youtube.com/embed/qnrs4e9AcYk?autoplay=1";
var atmosMusic = "https://www.youtube.com/embed/U-jxcH42lIo?autoplay=1";
var extremeMusic = "https://www.youtube.com/embed/2LHwEFMVeyU?autoplay=1";
var stormMusic = "https://www.youtube.com/embed/iHwTFPFu94E?autoplay=1";

//Spotify
var sunnyMusicSpotify = "https://open.spotify.com/embed?uri=spotify:user:spotify:playlist:37i9dQZF1DX6ALfRKlHn1t";
var rainyMusicSpotify = "https://open.spotify.com/embed?uri=spotify:user:spotify:playlist:37i9dQZF1DXbvABJXBIyiY";
var snowMusicSpotify = "https://open.spotify.com/embed?uri=spotify:user:spotify:playlist:37i9dQZF1DWUNIrSzKgQbP";
var drizzleMusicSpotify = "https://open.spotify.com/embed?uri=spotify:user:spotify:playlist:37i9dQZF1DWZ7mSWCFIT7v";
var cloudyMusicSpotify = "https://open.spotify.com/embed?uri=spotify:user:spotify:playlist:37i9dQZF1DWVV27DiNWxkR";
var atmosMusicSpotify = "https://open.spotify.com/embed?uri=spotify:user:spotify:playlist:37i9dQZF1DX79Y9Kr2M2tM";
var extremeMusic = "https://open.spotify.com/embed?uri=spotify:user:spotify:playlist:37i9dQZF1DWU6kYEHaDaGA";
var stormMusicSpotify = "https://open.spotify.com/embed?uri=spotify:user:spotify:playlist:37i9dQZF1DX2pSTOxoPbx9";
var pos;
var queryURL2;
var queryURL1;


if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function(position) {
    var pos = {
      lat: Math.round(position.coords.latitude * 1000000) / 1000000,
      lng: Math.round(position.coords.longitude * 1000000) / 1000000
    };
    console.log(pos);
    queryURL1 = "https://api.openweathermap.org/data/2.5/weather?lat=" + pos.lat + "&lon=" + pos.lng +"&APPID=a6bed6fbc83844c9e82000992fae233d";
    console.log(queryURL1);
    queryURL2 = "https://maps.googleapis.com/maps/api/directions/json?origin=Fredericksburg&destination=Richmond&key=AIzaSyB_bXSY_7Ssaeg_p4mCtDVFEAn8iCxk1bY";
    var destinationA = 'Washington, D.C';
    var service = new google.maps.DistanceMatrixService();

    $.ajax({
      url: queryURL1,
      method: "GET"
    }).then(function(response) {
        console.log(response);
        var weather = response.weather[0].id;
        var youTube = $('<iframe width="300" height="100" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen>');
        var spotify = $('<iframe width="300" height="100" frameborder="0" allowtransparency="true" allow="encrypted-media">');
        var iconImage = $('<img>');
      if (weather >= 500 && weather <= 531) {
          console.log(weather);
          $(youTube).attr("src", rainyMusic);
          $('#youtube-widget').append(youTube);
          $(spotify).attr("src", rainyMusicSpotify);
          $('#spotify-widget').append(spotify);
          $('#weather-icon').attr('src', `http://openweathermap.org/img/w/${response.weather[0].icon}.png`);
          $(document).css('background-image', 'url(../images/rainy.jpg)');
      } else if (weather === 800 || weather === 801 || (weather >= 951 && weather <= 953)) {
          console.log(weather);
          $(youTube).attr("src", sunnyMusic);
          $('#youtube-widget').append(youTube);
          $(spotify).attr("src", sunnyMusicSpotify);
          $('#spotify-widget').append(spotify);
          $('#weather-icon').attr('src', `http://openweathermap.org/img/w/${response.weather[0].icon}.png`);
          $(document).css('background-image', 'url(../images/sunny.jpg)');
      } else if (weather >= 600 && weather <= 622) {
          console.log(weather);
          $(youTube).attr("src", snowMusic);
          $('#youtube-widget').append(youTube);
          $(spotify).attr("src", snowMusicSpotify);
          $('#spotify-widget').append(spotify);
          $('#weather-icon').attr('src', `http://openweathermap.org/img/w/${response.weather[0].icon}.png`);
          $(document).css('background-image', 'url(../images/snowy.jpg)');
      } else if (weather >= 300 && weather <= 321) {
          console.log(weather);
          $(youTube).attr("src", drizzleMusic);
          $('#youtube-widget').append(youTube);
          $(spotify).attr("src", drizzleMusicSpotify);
          $('#spotify-widget').append(spotify);
          $('#weather-icon').attr('src', `http://openweathermap.org/img/w/${response.weather[0].icon}.png`);
          $(document).css('background-image', 'url(../images/rainy.jpg)');
      } else if (weather >= 802 && weather <= 804) {
          console.log(weather);
          $(youTube).attr("src", cloudyMusic);
          $('#youtube-widget').append(youTube);
          $(spotify).attr("src", cloudyMusicSpotify);
          $('#spotify-widget').append(spotify);
          $('#weather-icon').attr('src', `http://openweathermap.org/img/w/${response.weather[0].icon}.png`);
          $(document).css('background-image', 'url(../images/cloudy.jpg)');
      } else if ((weather >= 701 && weather <= 721) || weather === 741) {
          console.log(weather);
          $(youTube).attr("src", atmosMusic);
          $('#youtube-widget').append(youTube);
          $(spotify).attr("src", atmosMusicSpotify);
          $('#spotify-widget').append(spotify);
          $('#weather-icon').attr('src', `http://openweathermap.org/img/w/${response.weather[0].icon}.png`);
          $(document).css('background-image', 'url(../images/cloudy.jpg)');
      } else if (weather === 731 || (weather >= 751 && weather <= 781) || (weather >= 900 && weather <= 902) || weather === 906 || (weather >= 957 && weather <= 962)) {
          console.log(weather);
          $(youTube).attr("src", extremeMusic);
          $('#youtube-widget').append(youTube);
          $(spotify).attr("src", extremeMusicSpotify);
          $('#spotify-widget').append(spotify);
          $('#weather-icon').attr('src', `http://openweathermap.org/img/w/${response.weather[0].icon}.png`);
          $(document).css('background-image', 'url(../images/thunder.jpg)');
      } else if (weather >= 200 && weather <= 232) {
          console.log(weather);
          $(youTube).attr("src", stormMusic);
          $('#youtube-widget').append(youTube);
          $(spotify).attr("src", stormMusicSpotify);
          $('#spotify-widget').append(spotify);
          $('#weather-icon').attr('src', `http://openweathermap.org/img/w/${response.weather[0].icon}.png`);
          $(document).css('background-image', 'url(../images/thunder.jpg)');
      }
  });
    service.getDistanceMatrix(
{
origins: [{lat: pos.lat, lng: pos.lng}],
destinations: [destinationA],
travelMode: 'DRIVING'/*,
drivingOptions: {
    departureTime: new Date(Date.now()),
    trafficModel: 'pessimistic'
}*/
}, callback);

function callback(response, status) {
console.log(response);
if (status == 'OK') {
    var origins = response.originAddresses;
    var destinations = response.destinationAddresses;

    for (var i = 0; i < origins.length; i++) {
      var results = response.rows[i].elements;
      console.log(results);
      for (var j = 0; j < results.length; j++) {
        var element = results[j];
        var distance = element.distance.text;
        var duration = element.duration.text;
        var from = origins[i];
        var to = destinations[j];
      }
    }
  }
}

  });
}
});