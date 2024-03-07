// Select Elements
const countSpan = document.querySelector('.quiz-info .count span');
const bulletSpanContainer = document.querySelector('.spans');
const quizArea = document.querySelector('.quiz-area');
const answersArea = document.querySelector('.answers-area');
const submitBtn = document.querySelector('button.submit-button');
const resultContainer = document.querySelector('.results');
const countDownElement = document.querySelector('.countdown');
// Set options
let currentIndex = 0;
let rightAnswer = 0;
let countDownInterval;
async function getData(){
            // fetch the data
            let response = await fetch("data/questions.json");
            let questionsObj = await response.json();
            let questionsCount = questionsObj.length;
            // create bullets + set questions count
            createBullets(questionsCount);
            // Add question data
            addQuestionData(questionsObj[currentIndex],questionsCount);
            // count down 
            countDown(10,questionsCount);
            // click the submit button
            submitBtn.addEventListener('click',() => {
                rightAns = questionsObj[currentIndex]['right_answer'];
                currentIndex++;
                // check the answer
                checkAnswer(rightAns,questionsCount);
                // remove the prev question
                quizArea.innerHTML = '';
                answersArea.innerHTML = '';
                // Add the new question
                addQuestionData(questionsObj[currentIndex],questionsCount);
                // Handel bullets classes
                handleBullets();
                // clear count down interval
                clearInterval(countDownInterval);
                // start count down 
                countDown(10,questionsCount);
                // show results
                showResults(questionsCount);
            })
        }
    // })

    // myRequest.open("GET","data/questions.json",true);
    // myRequest.send();
    // }
getData();

function createBullets(num) {
    countSpan.textContent = num;

    for(let i = 0;i < num;i++){
        let bullet = document.createElement('span');
        i === 0 ? bullet.className = 'on' : '';
        bulletSpanContainer.appendChild(bullet);
    }
}

function addQuestionData(obj,count) {
    // check for the question number
    if(currentIndex < count) {
        // create h2 question title
        let questionHeading = document.createElement("h2");
        questionHeading.textContent = `${currentIndex + 1}- ${obj['title']}`;
        quizArea.appendChild(questionHeading);

        // create answers divs
        for(let i = 1;i <= 4;i++) {
            // create the answer div
            let answerDiv = document.createElement('div');
            // add the class answer to the answer div
            answerDiv.className = 'answer';
            // create the radio input
            let answerInput = document.createElement('input');
            // set the attrs
            answerInput.setAttribute("type","radio");
            answerInput.setAttribute("id",`answer_${i}`);
            answerInput.setAttribute("name",`answer`);
            answerInput.setAttribute("value",`answer_${i}`);
            // add the value to the data-answer attr
            answerInput.dataset.answer = obj[`answer_${i}`];
            // append the input to the answer div
            answerDiv.appendChild(answerInput);
            // create the answer label that contain the answer text
            let answerLabel = document.createElement('label');
            // set the value of for to be the same id of the current input
            answerLabel.setAttribute('for',`answer_${i}`);
            // Add the answer data 
            answerLabel.textContent = obj[`answer_${i}`];
            // append the label to the answer div
            answerDiv.appendChild(answerLabel);
            // and finally append the answer div to the answers area
            answersArea.appendChild(answerDiv);
        }
    } 
}


function checkAnswer(rightAns,count) {
 let answers = document.getElementsByName('answer');
 let choosenAns;
 for(let i = 0;i < answers.length;i++) {
     if(answers[i].checked) {
         choosenAns = answers[i].dataset.answer;
     } 
 }
 if(choosenAns === rightAns) {
     rightAnswer++;
 } 
}

function handleBullets() {
    let bulletsSpans = document.querySelectorAll('.bullets .spans span');
    let arrayOfSpans = Array.from(bulletsSpans);

    bulletsSpans.forEach((span,index) => {
        if(index === currentIndex) {
            span.className = 'on';
        }
    })
}

function showResults(count) {
    let results;
    if(currentIndex === count) {
        quizArea.remove();
        answersArea.remove();
        submitBtn.remove();
        document.querySelector('.bullets').remove();

        if(rightAnswer > count / 2 && rightAnswer < count) {
            results = `<span class="good">Good</span>, ${rightAnswer} from ${count} questions`;
        } else if(rightAnswer === count) {
            results = `<span class="perfect">Perfect</span>, All answers are true`;
        } else {
            results = `<span class="bad">bad</span>, ${rightAnswer} from ${count} questions`;
        }

        resultContainer.innerHTML = results;
    }
}

function countDown(duration,count) {
    if(currentIndex < count) {
        let minutes,seconds;
        countDownInterval = setInterval(() => {
            minutes = parseInt(duration / 60);
            seconds = parseInt(duration % 60);

            minutes = minutes < 10 ? `0${minutes}` : minutes;
            seconds = seconds < 10 ? `0${seconds}` : seconds;

            countDownElement.innerHTML = `${minutes}:${seconds}`;

            if(--duration < 0) {
                clearInterval(countDownInterval);
                submitBtn.click();
            }
        },1000)
    }
}