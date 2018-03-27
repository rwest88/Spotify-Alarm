//..............................................................................
// Initialize Firebase
//..............................................................................

var config = {
  apiKey: "AIzaSyChvFGY3IOW8HQf30alGRKO6_Psp2Un7cs",
  authDomain: "spotify-alarm-1521758993850.firebaseapp.com",
  databaseURL: "https://spotify-alarm-1521758993850.firebaseio.com",
  projectId: "spotify-alarm-1521758993850",
  storageBucket: "",
  messagingSenderId: "368791517227"
};

firebase.initializeApp(config);

//..............................................................................
// Global Variables
//..............................................................................

var database = firebase.database();

var youTube;
var spotify;

var playing = false;
var autoplay = "";

var greeting;
var greetings = [
  "Good Morning!",
  "Good Afternoon Sir!",
  "Good Evening!",
  "What are you doing up so late?!"
]

var alarmTime;
var alarmHours;
var alarmMinutes;
var alarmAMPM;
var timeHours;

var intervalSeconds = setInterval(updateTime, 1000);
var intervalTenMinutes = setInterval(updateWeather, 15000); //600000

//...............................................................................
// Functions to run at regular intervals
//...............................................................................

function updateTime() {
  var d = new Date();
  timeHours = d.getHours();
  var timeMinutes = d.getMinutes();
  if (timeMinutes < 10) {timeMinutes = "0" + timeMinutes}
  var AMorPM = "AM"

  if (timeHours > 3 && timeHours < 12) {greeting = greetings[0]}
  if (timeHours > 11 && timeHours < 19) {greeting = greetings[1]}
  if (timeHours > 18 && timeHours <= 24) {greeting = greetings[2]}
  if (timeHours >= 0 && timeHours < 4) {greeting = greetings[3]}

  if (timeHours >= 20 || timeHours <= 7) {
    $('body').css({'background-image':'url(assets/images/nighttime.jpg'});
  }
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
      autoplay = "?autoplay=1";
      playing = true;
      runAPIs();
    }
  }
}

function updateWeather() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: Math.round(position.coords.latitude * 1000000) / 1000000,
        lng: Math.round(position.coords.longitude * 1000000) / 1000000
      };
      var queryURL1 = "https://api.openweathermap.org/data/2.5/weather?lat=" + pos.lat + "&lon=" + pos.lng +"&units=imperial&APPID=a6bed6fbc83844c9e82000992fae233d";

      $.ajax({
        url: queryURL1,
        method: "GET"
      }).then(function(response) {
        $('#weather-icon').attr('src', `https://openweathermap.org/img/w/${response.weather[0].icon}.png`);
        $('#temp-input').html(Math.round(response.main.temp) + '&#8457');
        $('#condition').text('Condition: ' + response.weather[0].description);
        console.log(response.main.temp);
      });
    });
  }
}

//...........................................................
// Database Query
//...........................................................

database.ref().on('value', function(snapshot) {
  $('.datetimepicker-input').attr('placeholder', snapshot.val());
});

//...........................................................
// Submit handler (and collapse)
//...........................................................

var $collapsible = $('#collapseExample');

$('#datetimepicker3').datetimepicker({
  format: 'LT'
});

$('#alarm-form').on('submit', function(evt) {
  evt.preventDefault();
  $collapsible.collapse('hide');
  $('#alarm-set-msg').addClass('show');
  setTimeout(function() {$('#alarm-set-msg').removeClass('show')}, 3000);
  alarmTime = ($('.datetimepicker-input').val());
  if (alarmTime.charAt(1) == ":") {
    var formattedAlarmTime = "0" + alarmTime;
  }
  alarmHours = formattedAlarmTime.slice(0, 2);
  alarmMinutes = formattedAlarmTime.slice(3, 5);
  alarmAMPM = formattedAlarmTime.slice(6, 8);
  database.ref().set(alarmTime);
});

//...........................................................
// API calls (conditionals for weather, music, and traffic)
//...........................................................

function runAPIs() {
  //Youtube links
  var sunnyMusic = "https://www.youtube.com/embed/mxL2C3iejCw" + autoplay;
  var rainyMusic = "https://www.youtube.com/embed/6Gkdf0IIUNY" + autoplay;
  var snowMusic = "https://www.youtube.com/embed/geCNx65eFzE" + autoplay;
  var drizzleMusic = "https://www.youtube.com/embed/63JD_AY2bfc" + autoplay;
  var cloudyMusic = "https://www.youtube.com/embed/qnrs4e9AcYk" + autoplay;
  var atmosMusic = "https://www.youtube.com/embed/U-jxcH42lIo" + autoplay;
  var extremeMusic = "https://www.youtube.com/embed/2LHwEFMVeyU" + autoplay;
  var stormMusic = "https://www.youtube.com/embed/iHwTFPFu94E" + autoplay;

  //Spotify
  var sunnyMusicSpotify = "https://open.spotify.com/embed?uri=spotify:user:spotify:playlist:37i9dQZF1DX6ALfRKlHn1t";
  var rainyMusicSpotify = "https://open.spotify.com/embed?uri=spotify:user:spotify:playlist:37i9dQZF1DXbvABJXBIyiY";
  var snowMusicSpotify = "https://open.spotify.com/embed?uri=spotify:user:spotify:playlist:37i9dQZF1DWUNIrSzKgQbP";
  var drizzleMusicSpotify = "https://open.spotify.com/embed?uri=spotify:user:spotify:playlist:37i9dQZF1DWZ7mSWCFIT7v";
  var cloudyMusicSpotify = "https://open.spotify.com/embed?uri=spotify:user:spotify:playlist:37i9dQZF1DWVV27DiNWxkR";
  var atmosMusicSpotify = "https://open.spotify.com/embed?uri=spotify:user:spotify:playlist:37i9dQZF1DX79Y9Kr2M2tM";
  var extremeMusic = "https://open.spotify.com/embed?uri=spotify:user:spotify:playlist:37i9dQZF1DWU6kYEHaDaGA";
  var stormMusicSpotify = "https://open.spotify.com/embed?uri=spotify:user:spotify:playlist:37i9dQZF1DX2pSTOxoPbx9";

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: Math.round(position.coords.latitude * 1000000) / 1000000,
        lng: Math.round(position.coords.longitude * 1000000) / 1000000
      };
      console.log(pos);
      queryURL1 = "https://api.openweathermap.org/data/2.5/weather?lat=" + pos.lat + "&lon=" + pos.lng +"&units=imperial&APPID=a6bed6fbc83844c9e82000992fae233d";
      console.log(queryURL1);
      
      // queryURL2 = "https://maps.googleapis.com/maps/api/directions/json?origin=Fredericksburg&destination=Richmond&key=AIzaSyB_bXSY_7Ssaeg_p4mCtDVFEAn8iCxk1bY";
      // var destinationA = 'Washington, D.C';
      // var service = new google.maps.DistanceMatrixService();

      $.ajax({
        url: queryURL1,
        method: "GET"
      }).then(function(response) {
        console.log(response);
        var weather = response.weather[0].id;
        var youTube = $('<iframe width="300" height="100" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen>');
        var spotify = $('<iframe width="300" height="100" frameborder="0" allowtransparency="true" allow="encrypted-media">');
        
        if (weather >= 500 && weather <= 531) {
          console.log(weather);
          youTube.attr("src", rainyMusic);
          spotify.attr("src", rainyMusicSpotify);
          if (timeHours >= 20 || timeHours <= 7) {
            $('body').css({'background-image':'url(assets/images/nighttime.jpg'});
          } else {$('body').css({'background-image':'url(assets/images/rainy.jpg)'});}

        } else if (weather === 800 || weather === 801 || (weather >= 951 && weather <= 953)) {
          console.log(weather);
          youTube.attr("src", sunnyMusic);
          spotify.attr("src", sunnyMusicSpotify);
          if (timeHours >= 20 || timeHours <= 7) {
            $('body').css({'background-image':'url(assets/images/nighttime.jpg'});
          } else {$('body').css({'background-image':'url(assets/images/sunny.jpg)'});}

        } else if (weather >= 600 && weather <= 622) {
          console.log(weather);
          youTube.attr("src", snowMusic);
          spotify.attr("src", snowMusicSpotify);
          if (timeHours >= 20 || timeHours <= 7) {
            $('body').css({'background-image':'url(assets/images/nighttime.jpg'});
          } else {$('body').css({'background-image':'url(assets/images/snowy.jpg)'});}

        } else if (weather >= 300 && weather <= 321) {
          console.log(weather);
          youTube.attr("src", drizzleMusic);
          spotify.attr("src", drizzleMusicSpotify);
          if (timeHours >= 20 || timeHours <= 7) {
            $('body').css({'background-image':'url(assets/images/nighttime.jpg'});
          } else {$('body').css({'background-image':'url(assets/images/rainy.jpg)'});}

        } else if (weather >= 802 && weather <= 804) {
          console.log(weather);
          youTube.attr("src", cloudyMusic);
          spotify.attr("src", cloudyMusicSpotify);
          if (timeHours >= 20 || timeHours <= 7) {
            $('body').css({'background-image':'url(assets/images/nighttime.jpg'});
          } else {$('body').css({'background-image':'url(assets/images/cloudy.jpg)'});}

        } else if ((weather >= 701 && weather <= 721) || weather === 741) {
          console.log(weather);
          youTube.attr("src", atmosMusic);
          spotify.attr("src", atmosMusicSpotify);
          if (timeHours >= 20 || timeHours <= 7) {
            $('body').css({'background-image':'url(assets/images/nighttime.jpg'});
          } else {$('body').css({'background-image':'url(assets/images/cloudy.jpg)'});}

        } else if (weather === 731 || (weather >= 751 && weather <= 781) || (weather >= 900 && weather <= 902) || weather === 906 || (weather >= 957 && weather <= 962)) {
          console.log(weather);
          youTube.attr("src", extremeMusic);
          spotify.attr("src", extremeMusicSpotify);
          if (timeHours >= 20 || timeHours <= 7) {
            $('body').css({'background-image':'url(assets/images/nighttime.jpg'});
          } else {$('body').css({'background-image':'url(assets/images/thunder.jpg)'});}

        } else if (weather >= 200 && weather <= 232) {
          console.log(weather);
          youTube.attr("src", stormMusic);
          spotify.attr("src", stormMusicSpotify);
          if (timeHours >= 20 || timeHours <= 7) {
            $('body').css({'background-image':'url(assets/images/nighttime.jpg'});
          } else {$('body').css({'background-image':'url(assets/images/thunder.jpg)'});}

        }
        $('#youtube-widget').empty().append(youTube);
        $('#spotify-widget').empty().append(spotify);
      });

      service.getDistanceMatrix({
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
}

updateTime();
updateWeather();
runAPIs();

//..................................................................
// Needs work:
//
// the app doesn't seem to work when deployed...!important
//
// background image should update (in function runAPIs()) **
// black background (or something) at page load (because the APIs take time)
// ^^ maybe we want to run just the necessary weather AJAX to speed that up
//
// travel time text area should be blank at startup
// temperature text field should update
// pull data from destination address form field **
// feed address into Google distance matrix API **
// do we want to use traffic-model: pessimistic?
// favicon would be nice
//
// placeholder in Set Alarm field doesn't count as a value entered
// youtube widget unpretty -- breaks some of the media sizes
// app has a lot of vertical height... shrink background image for smaller media sizes?
//..................................................................

//..................................................................
// Future development:
//
// Either use local storage OR store individual user data in Firebase
// User chooses songs and playlists
// Real-time traffic detection for accurate travel time
// Alerts (you should leave in ten minutes, five minutes, etc..) and/or option for alarm to set itself earlier to adjust for traffic conditions
//
//
//..................................................................