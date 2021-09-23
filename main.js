let myQuestions = [
    {
        question: "Has he never ... beer?",
        answers :{
            "A": "drank",
            "B": "drink",
            "C": "drunk"
        },
        correctAnswer : "C" 
    },
    {
        question: "He did a parachute ... out of a helicopter",
        answers :{
            "A": "fall",
            "B": "jump",
            "C": "climp"
        },
        correctAnswer : "B" 
    },
    {
        question: "Have they ...a lot?",
        answers :{
            "A": "travelled",
            "B": "travellinng",
            "C": "travel"
        },
        correctAnswer : "A" 
    },
    {
        question: "There's nothing special about him. In fact, he's very ...",
        answers :{
            "A": "normal",
            "B": "special",
            "C": "smart"
        },
        correctAnswer : "A" 
    },
    {
        question: "Has he never ... opera?",
        answers :{
            "A": "listened",
            "B": "listen",
            "C": "listening"
        },
        correctAnswer : "A" 
    },
    {
        question: "She ... to study English",
        answers :{
            "A": "decided",
            "B": "decid",
            "C": "decision"
        },
        correctAnswer : "A" 
    },
    {
        question: "Have they ...for the school football team?",
        answers :{
            "A": "pick",
            "B": "picked",
            "C": "picking"
        },
        correctAnswer : "B" 
    },
    {
        question: "Loock ! She is ... ",
        answers :{
            "A": "beautyful",
            "B": "kind",
            "C": "crazy"
        },
        correctAnswer : "A" 
    }
]
/* Här kommer jag lägga ut alla frågor i diven quiz */

const quizContainer = document.querySelector('#quiz')
const resultContainer = document.querySelector('#results')
const btnSubmit = document.querySelector('.submit')
const btnNewQuestions = document.querySelector('.new-questions')

console.log(quizContainer)
function start(){
    let newQuestions =[]
    

    btnNewQuestions.onclick = function(){
        newQuestions= createRandomQuestions();
        resultContainer.innerHTML=""
        buildAnswers(newQuestions)
    }
    btnSubmit.onclick = function(){
        showResult(newQuestions)
    }
}

    //  return a array with random 4 values 
function createRandomQuestions(){
    let newArrQuestions = []
    let randomNumbers= []

    do{
        randomNumbers = [...new Set(Array.from({length:4},()=>
        Math.floor(Math.random()* myQuestions.length)))]
    
    }while(randomNumbers.length < 4)
    
    for(let num of randomNumbers){
        newArrQuestions.push(myQuestions[num])
    }


    return newArrQuestions
}

function buildAnswers(newQuestions){
    const output =[]
    
    newQuestions.forEach((currentQuestion, questionNumber)=>{
        const answers =[];
        for(let letter in currentQuestion.answers){
            answers.push(`
            <label for="question-${questionNumber}-${letter}">
                <input type="radio" name="question-${questionNumber}" id="question-${questionNumber}-${letter}" value="${letter}">${letter} :${currentQuestion.answers[letter]} 
            </label>
            `)
        }
        output.push(`
            <p class="questions">${questionNumber+1} : ${currentQuestion.question}</p> 
            <div class="answers">
                    ${answers.join('')}
            </div>
        `)
    })

    quizContainer.innerHTML = output.join('')
}

function showResult(newQuestions){
    const answerContainers = quizContainer.querySelectorAll('.answers')
    let correctNum = 0;
    newQuestions.forEach((currentQuestion,questionNumber)=>{
        const answerContainer = answerContainers[questionNumber];
        const selector = `input[name=question-${questionNumber}]:checked`

        const userAnswer = (answerContainer.querySelector(selector) || {}).value;
        if(userAnswer == currentQuestion.correctAnswer){
            correctNum++;
            answerContainer.querySelector(selector).parentElement.style.color = "green"

        }
    })
    resultContainer.innerHTML = `${correctNum} out of ${newQuestions.length}`

}

start()