const appState = {
  currentQuestion: 0,
  score: 0
}

function resetApp() {
  appState.currentQuestion = 0;
  appState.score = 0;
}

function showView(viewName) {
  $('.view').hide();
  if(viewName === 'start') {
    $('#' + viewName).show();
  } else {
    $('#' + viewName).fadeIn('slow');
  }
}

function handleLogoClick() {
  $('.logo').click(function(event) {
    resetApp();
    showStartScreen();
  });  
}

function showStartScreen() {
  showView('start');
}

function handleStartClick() {
  $('.start').click(function(event) {
    showQuestion();
  });
}

function showQuestion() {
  const currentQuestion = questions[appState.currentQuestion];
  $('.question').text(currentQuestion.question);
  $('.current-count').text('Question ' + (appState.currentQuestion + 1) + ' of ' + questions.length);
  $('.current-score').text(`Score: ${appState.score} of ${appState.currentQuestion}`);  
  $('.question-image').attr('src', 'img/question_' + appState.currentQuestion + '.jpg');
  
  $('.answer label').each((index, label) => {
    $(label).text(currentQuestion.answers[index]);
  });
  //reset radio buttons
  $('input[name=radioAnswer]').prop('checked', false);
  showView('question');
}

function handleAnswerSubmit() {
  $('.js-form').submit(event => {
    event.preventDefault();
    let userAnswer = Number($('input[name=radioAnswer]:checked').val());
    if(userAnswer === questions[appState.currentQuestion].correctAnswer) {
      appState.score++;
      showCorrectScreen();
    } else {
      showIncorrectScreen();
    }
  }); 
}

function showCorrectScreen() {
  $('.current-score').text(`Score: ${appState.score} of ${appState.currentQuestion + 1}`);  
  showView('correct');
  window.setTimeout(goToNextQuestionOrEnd, 3000);
}

function showIncorrectScreen() {
  let currentQuestion = questions[appState.currentQuestion];
  $('p.incorrect').text('The correct answer is: ' + currentQuestion.answers[currentQuestion.correctAnswer]);
  $('.current-score').text(`Score: ${appState.score} of ${appState.currentQuestion + 1}`);    
  window.setTimeout(goToNextQuestionOrEnd, 4000);
  showView('incorrect');
}

function goToNextQuestionOrEnd() {
  if(appState.currentQuestion === questions.length - 1) {
    showEndScreen();
  } else {
    appState.currentQuestion++;
    showQuestion();
  }
}

function showEndScreen() {
  $('.final-score').text(`${appState.score} out of ${appState.currentQuestion + 1}`);
  showView('quiz-end');
}

function handleRestartClick() {
  $('.restart').click(function(event) {
    resetApp();
    showQuestion();
  });  
}

function startApp() {
  handleStartClick();
  handleAnswerSubmit();
  handleLogoClick();
  handleRestartClick();
  showStartScreen();
}

$(startApp);

