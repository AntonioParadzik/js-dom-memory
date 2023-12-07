var cardsArray = [
    {    'name': 'CSS',    'img': 'https://github.com/robgmerrill/img/blob/master/css3-logo.png?raw=true',  },
    {    'name': 'HTML',    'img': 'https://github.com/robgmerrill/img/blob/master/html5-logo.png?raw=true',  },
    {    'name': 'jQuery',    'img': 'https://github.com/robgmerrill/img/blob/master/jquery-logo.png?raw=true',  },
    {    'name': 'JS',    'img': 'https://github.com/robgmerrill/img/blob/master/js-logo.png?raw=true',  },
    {    'name': 'Node',    'img': 'https://github.com/robgmerrill/img/blob/master/nodejs-logo.png?raw=true',  },
    {    'name': 'Photo Shop',    'img': 'https://github.com/robgmerrill/img/blob/master/photoshop-logo.png?raw=true',  },
    {    'name': 'PHP',    'img': 'https://github.com/robgmerrill/img/blob/master/php-logo_1.png?raw=true',  },
    {    'name': 'Python',    'img': 'https://github.com/robgmerrill/img/blob/master/python-logo.png?raw=true',  },
    {    'name': 'Ruby',    'img': 'https://github.com/robgmerrill/img/blob/master/rails-logo.png?raw=true',  },
    {    'name': 'Sass',    'img': 'https://github.com/robgmerrill/img/blob/master/sass-logo.png?raw=true',  },
    {    'name': 'Sublime',    'img': 'https://github.com/robgmerrill/img/blob/master/sublime-logo.png?raw=true',  },
    {    'name': 'Wordpress',    'img': 'https://github.com/robgmerrill/img/blob/master/wordpress-logo.png?raw=true',  },
  ];

  //duplicate array
  var gameGrid = cardsArray.concat(cardsArray);

  gameGrid.sort(function(n){
    return 0.5 - Math.random();
  })

  var game = document.getElementById('game-board');
  var grid = document.createElement('section');
  grid.setAttribute('class', 'grid');
  game.appendChild(grid);

  for(var i=0; i<gameGrid.length; i++){
    //create a div element and assign it to variable card
    var card = document.createElement('div');
    //apply a card class to that div
    card.classList.add('card');
    //set the data-name attribute of the div to the cardsArrray name
    card.dataset.name = gameGrid[i].name;

    //create front of card
    var front = document.createElement('div');
    front.classList.add('front');
    //create back of card
    var back = document.createElement('div');
    back.classList.add('back');
    //Apply the background image of the div to the cardsArray image
    back.style.backgroundImage = `url(${gameGrid[i].img})`;
    //Append the div to the grid section
    grid.appendChild(card);
    card.appendChild(front);
    card.appendChild(back);
  }

  var firstGuess='';
  var secondGuess='';

  var count = 0;
  var previousTarget = null;
  var delay = 1200;

  var match = function(){
    var selected = document.querySelectorAll('.selected');
    for(i=0;i< selected.length; i++){
      selected[i].classList.add('match')
    }
  }

  //reset guesses after two attempts
  var resetGuesses = function(){
    firstGuess = '';
    secondGuess = '';
    count = 0;
    previousTarget = null;

    var selected = document.querySelectorAll('.selected');
    for(i = 0; i< selected.length; i++){
      selected[i].classList.remove('selected');
    }
  }
  //add event listener to the grid
  grid.addEventListener('click', function(event){
    //declare variable to target clicked item
    var clicked = event.target

    //do not allow the grid section itself to be selected 
    if(clicked.nodeName === 'section' || clicked === previousTarget || clicked.parentNode.classList.contains('match') || clicked.parentNode.classList.contains('selected')){
      return;
    }

    if(count<2){
      count++;
      if(count === 1){
        firstGuess = clicked.parentNode.dataset.name;
        clicked.parentNode.classList.add('selected')
      }else{
        secondGuess = clicked.parentNode.dataset.name;
        clicked.parentNode.classList.add('selected')
      }
      if(firstGuess !== '' && secondGuess !==''){
        if(firstGuess === secondGuess){
          setTimeout(match, delay);
          setTimeout(resetGuesses, delay);
        }else{
          setTimeout(resetGuesses, delay);
        }
      }
      previousTarget = clicked;
    }  
  });