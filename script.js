const questions=[
    {
        question:"Which is the largest animal in the world",
        answers:[
            {text:"shark", correct:false},
            {text:"Blue whale", correct:true},
            {text:"Bear", correct:false},
            {text:"Elephant", correct:false}
        ]
    },
    {
        question:"Which is the smallest country in the world",
        answers:[
            {text:"Vatican city", correct:true},
            {text:"Bhutan", correct:false},
            {text:"Nepal", correct:false},
            {text:"Shri Lanka", correct:false}
        ]
    },
    {
        question:"Which is the largest desert in the world",
        answers:[
            {text:"Kalahari", correct:false},
            {text:"Gobi", correct:false},
            {text:"Sahara", correct:false},
            {text:"Antartica", correct:true}
        ]
    },
    {
        question:"Which is the smallest Continent in the world",
        answers:[
            {text:"Asia", correct:false},
            {text:"Australia", correct:true},
            {text:"Africa", correct:false},
            {text:"Arctic", correct:false}
        ]
    }
];

const questionZone=document.getElementById("question");
const answerbuttons=document.getElementById('answerButtons');
const next=document.getElementById('next');


let currentQuestionIndex=0;
let score=0;
function startQuiz(){
    currentQuestionIndex=0;
    score=0;
    next.textContent="Next";
    showQuestion()
}

function showQuestion(){
    resetContent()
    let currentQuestion=questions[currentQuestionIndex];
    questionZone.innerHTML=currentQuestionIndex+1 + ". "+ currentQuestion.question;
    currentQuestion.answers.forEach(answer =>{
        const button=document.createElement('button');
        button.innerHTML=answer.text;
        button.className='choice';
        answerbuttons.appendChild(button);
        if(answer.correct){
            button.dataset.correct=answer.correct;
        }
        button.addEventListener("click",selectAnswer);
    })
}
function resetContent(){
    next.style.display='none'
    while(answerbuttons.firstChild){
        answerbuttons.removeChild(answerbuttons.firstChild)
    }
}
function selectAnswer(e){
    const selectbtn=e.target;
    const iscorrect=selectbtn.dataset.correct==='true';
    if(iscorrect){
        selectbtn.classList.add('correct');
        score++
    }else{
        selectbtn.classList.add('incorrect')
    }
    Array.from(answerbuttons.children).forEach(btn =>{
        if(btn.dataset.correct==='true'){
            btn.classList.add('correct');
        }
        btn.disabled=true;
    });
    next.style.display="block"
}
function showScore(){
    resetContent()
    questionZone.style.textAlign="center"
    questionZone.innerHTML="You scored "+score+ " out of "+questions.length+" !";
    next.innerHTML="Play Again"
    next.style.display="block"
}
function handleNextBtn(){
    currentQuestionIndex++
    if(currentQuestionIndex<questions.length){
        showQuestion()
    }else{
        showScore()
    }
}
next.addEventListener('click',()=>{
    if(currentQuestionIndex<questions.length){
        handleNextBtn()
    }else{
        startQuiz()
    }
})
startQuiz()