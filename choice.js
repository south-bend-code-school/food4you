(function(){

  $(document).ready(init);

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBrd4QIBfn4hP4cdN7PwOfVHpksyKtCCuM",
    authDomain: "food-4-you.firebaseapp.com",
    databaseURL: "https://food-4-you.firebaseio.com",
    storageBucket: "food-4-you.appspot.com",
    messagingSenderId: "844035256642"
  };


  var choicesarray = ["hamburger.png", "taco.png", "spaghetti.png", "fajita.png", "alfrado.png", "breadsticks.png", "burrito.png", "chickensandwich.png", "chipsandsalsa.png", "eggroll.png", "fries.png", "noodles.png", "orangechicken.png", "yogurtparfait.png" ];

  var count=0;

  var american = 0;
  var mexican = 0;
  var italian = 0;
  var asian = 0;

  function init(){
    firebase.initializeApp(config);
   getRandomImage1();
   $('img').click(getRandomImage1);

  }

  function getRandomImage1() {
    $('#image1').empty();
    $('#image2').empty();
    do{
      var num = Math.floor( Math.random() * choicesarray.length );
      var num2 = Math.floor( Math.random() * choicesarray.length );
    }while(num === num2);
      var img = choicesarray[ num ];
      var img2 = choicesarray[ num2 ];
      var imgStr = '<img src="./images/' + img + '">';
      var imgStr2 = '<img src="./images/' + img2 + '">';
      $('#image1').append(imgStr);
      $('#image2').append(imgStr2);
      $('img').click(myFunction);

  }

  function myFunction(){
    count++;
    getRandomImage1();

    var thisItem = $(this).attr('src');
    scoresys(thisItem);
  }


  function scoresys(thisItem){
    if(thisItem === "./images/hamburger.png" || thisItem === "./images/fries.png" || thisItem === "./images/chickensandwich.png" || thisItem === "./images/yogurtparfait.png"){
      american++;
    } else if(thisItem === "./images/spaghetti.png" || thisItem === "./images/alfrado.png" || thisItem === "./images/breadsticks.png"){
      italian++;
    } else if(thisItem === "./images/taco.png" || thisItem === "./images/fajita.png" || thisItem === "./images/chipsandsalsa.png" || thisItem === "./images/burrito.png"){
      mexican++;
    } else if(thisItem === "./images/noodles.png" || thisItem === "./images/orangechicken.png" || thisItem === "./images/eggroll.png"){
      asian++;
    }
    checkScore()
  }

  function checkScore() {
    if(american >= 3){
      var category = "american";
      findData(category);
    } else if (italian >= 3){
      var category = "italian";
      findData(category);
    } else if (mexican >= 3){
      var category = "mexican";
      findData(category);
    } else if (asian >= 3){
      var category = "asian";
      findData(category);
    }

  }

  function findData(category) {
    var ref = firebase.database().ref('restaurant/');
    ref.once('value', function(snapshot){
      var rest = snapshot.val();
      // console.log(rest);
      for (i in rest) {

        var cat = rest[i].category;
        var address = rest[i].address;
        var description = rest[i].description;
        var hours = rest[i].hours;
        var phone = rest[i].phone;

        if (category === cat){
          displayRestaurant(i, cat, address, description, hours, phone);
        }
      }
    });
  }

  function displayRestaurant(name, cat, address, description, hours, phone){
    $('img').css('display','none');
    $(".image").css('height', 0);
    $('h1').css('display','none');
    $('body').css("background-image", "none");
    $('body').css('background-color', '#806517');


    $('#results').append(
      "<div class= 'boxes'>" +
      "<h2 class= 'title'>" + name + "</h2>" +
      "<p class= 'hours'>" + hours + "</p>" +
      "<p class= 'phonenumber'>" + phone + "</p>" +
      "<p class= 'address'>" + address + "</p>" +
      "<p class= 'description'>" + description + "</p>" +

      "</div>"
    );

  }

})();
