/**
 * Example store structure
 */
const store = {
  // 5 or more questions are required
  questions: [
    {
      question: 'What movie is this famous quote from: "You\'re gonna need a bigger boat."',
      answers: [
        'Finding Nemo',
        'King Kong',
        'Jaws',
        'The Terminator'
      ],
      correctAnswer: 'Jaws'
    },
    {
      question: 'What movie is this famous quote from: "You\'re killing me Smalls!"',
      answers: [
        'There\'s Something About Mary',
        'The Sandlot',
        'A Few Good Men',
        'Forrest Gump'
      ],
      correctAnswer: 'The Sandlot'
    },
    {
    question: 'What movie is this famous quote from: "You gonna eat your tots?"',
      answers: [
        'Snakes On a Plane',
        'Napolean Dynamite',
        'Love Actually',
        'Fifty Shades of Grey'
      ],
      correctAnswer: 'Napolean Dynamite'
    },
    {
    question: 'What movie is this famous quote from: "Dear 8-pound, 6-ounce newborn infant Jesus"',
      answers: [
        'Talladega Nights',
        'Donnie Darko',
        'Step Brothers',
        'Cast Away'
      ],
      correctAnswer: 'Talladega Nights'
    },

    {
      question: 'What movie is this famous quote from: "Honey? Where\'s my super suit?!"',
        answers: [
          'Superman',
          'The Notebook',
          'Zoolander',
          'The Incredibles'
        ],
        correctAnswer: 'The Incredibles'
      },
  ],
  quizStarted: false,
  questionNumber: 0,
  score: 0,
  wrong: 0
};









/**
 * 
 * Technical requirements:
 * 
 * Your app should include a render() function, that regenerates the view each time the store is updated. 
 * See your course material, consult your instructor, and reference the slides for more details.
 *
 * NO additional HTML elements should be added to the index.html file.
 *
 * You may add attributes (classes, ids, etc) to the existing HTML elements, or link stylesheets or additional scripts if necessary
 *
 * SEE BELOW FOR THE CATEGORIES OF THE TYPES OF FUNCTIONS YOU WILL BE CREATING 👇
 * 
 */

/********** TEMPLATE GENERATION FUNCTIONS **********/


/* This function generates the main page and displays
    the title of quiz along with the intro and start button */
    function generateMainPage(){
      let openingMain = (`<div>
      <div class="box">
      <h1>Famous Movie Quotes Quiz</h1>
      <img src="movieImages/movie-popcorn.jpg" alt="Popcorn, movie reel, 3D glasses, and a clapperboard">
      <h2> This is a quiz on movie quotes!</h2>
      <h3>You need to match the given quote to the proper movie.</h3>
      <h3>Press the "Start Quiz" button when you're ready to begin.</h3>
      <div class= "item">
      <button id= "startQuiz">Start Quiz</button>
      </div>
      </div>
      </div>`);
     
      $('main').addClass("mainPage");
      $('main').addClass("group");
      $('main').html(openingMain);
    
    }



/* This function generates the main page and displays the questions
    along with the different answer choices along with the submit button */
    function generateQuestion(){
  
      // question variable grabs questions
      let question = store.questions[store.questionNumber];
     
      //answers variable that grabs all answer choices and creates an array
      let answers = question.answers.map((answer, index)=>{
        return `<div class="middle group"><label for="answer${index}"><input type="radio" id="answer${index}"
         name="answer" value= "${answer}" required>${answer}</label></div></br>`
      });
    
      /* push to html using javascripts displaying
       main page with question and answer choices */
      let repeatQ = 
      `<div class = "box">
      <form id= "question">
      <div class="item">
      <div class="isolate">
      <h2>${question.question}</h2>
      </div>
      </div>
      ${answers.join("")}
      <div class= "item">
      <p>Correct: ${store.score}</p>
      <p>Wrong: ${store.wrong}</p>
      <p>Question ${store.questionNumber + 1} out of ${store.questions.length}</p>
      </div>
      <div class= "item">
      <button>Next</button>
      </form></div></div>`
      $('main').addClass("mainPage");
      $('main').addClass("group");
      $('main').html(repeatQ);
    }



/* The generateFinalPage function displays the final page  */
function generateFinalPage(){
  let totalQuestions = store.questions.length;
  let finalScore = (store.score/totalQuestions)*100;
  
  let final = (
  `<div class="box">
  <h1>Congratulations! You finished the movie quotes quiz!</h1>
  <img src="movieImages/congrats.jpg" alt="Gatsby toasting congratulations">
  <h2>Your final score is: ${finalScore}%</h2>
  <p>Press the button below if you would like to retake this quiz.</p>
  <div class= "item">
  <button id= "restartQuiz">Restart Quiz</button>
  </div></div>`);
  

  $('main').addClass("mainPage");
  $('main').addClass("group");
  $('main').html(final);
}


/********** EVENT HANDLER FUNCTIONS **********/

// These functions handle events (submit, click, etc)

//Function handle event clicking start of quiz changed to true
function handleStartQuiz(){
  $('main').on('click', '#startQuiz', function(event){

    store.quizStarted = true;
    
    renderQuestion();
  }
  )};


/* FUnction that takes in user answer and determines if answered 
   correctly or incorrectly. Then moves onto the next question */
function handleCheckAnswer(){
  $('main').on('submit', '#question', function(event){
  event.preventDefault();

  // create variable to take in user selection
  let userAnswer = $("input[name=answer]:checked" ).val();

  // create variable to represent correct answer in array of objects
  let rightAnswer = store.questions[store.questionNumber];
  

  // Variable to display correctPage 
  let correctPage =    
        `<div class="group"> 
        <div class="box">
        <div class="item">
        <h1>Hooray!</h1>
        </div>
        <img src="movieImages/happy.jpg" alt="Happy baby smiling">
        <div class="item">
        <h2>You got the correct answer!</h2>
        </div>
        <div class= "item">
        <button id= "next">Next</button>
        </div>
        </div>
        </div>`;
        $('main').addClass("correctPage");

    // Variable to display wrong page
    let wrongPage =  
        `<div class="group">
        <div class="box">
        <div class="item">
        <h1>Oh no!</h1>
        </div>
        <img src="movieImages/sad.jpg" alt="Sad baby crying">
        <div class="item">
        <h2>The correct answer is: ${rightAnswer.correctAnswer} </h2>
        </div>
        <div class= "item">
        <button id= "next">Next</button>
        </div>
        </div>
        </div>`;
        $('main').addClass("wrongPage")
  
    if(userAnswer === rightAnswer.correctAnswer){
         store.score++;
        $('main').html(correctPage);
          // Add a point if user got question correct     
    }
    else{
      $('main').html(wrongPage);
      store.wrong++;
    
    }
    store.questionNumber++;
  });
};

function handleCheckingPage(){
  $('main').on('click', '#next', function(event)
  { 
    if(store.questionNumber <= store.questions.length - 1){
      renderQuestion();
    }
    else{
      generateFinalPage();
    }
    
  });
};


/* This handle function listens for if the user decides to retake
    quiz and restarts the quiz from the begining */
function handleRestart(){
  $('main').on('click', '#restartQuiz', function(event){
    event.preventDefault();
    store.quizStarted = false;
    store.questionNumber = 0;
    store.score = 0;
    store.wrong = 0;
    renderQuestion();
})
};


/********** RENDER FUNCTION(S) **********/

// This function conditionally replaces the contents of the <main> tag based on the state of the store

/* Function that determines if page should show
   main page or begin showing the questions.*/
function renderQuestion(){
  let showing = '';
  if(store.quizStarted === true){
    showing = generateQuestion();
  }
  else{
    showing = generateMainPage();
  }

  $('main').html(showing);
  
};


// All function will call all functions needed
function main(){
  handleStartQuiz();
  renderQuestion();
  handleCheckAnswer();
  handleCheckingPage();
  handleRestart();
 
};

$(main());
