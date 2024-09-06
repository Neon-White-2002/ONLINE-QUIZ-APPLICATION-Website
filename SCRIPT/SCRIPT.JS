// JAVA-SCRIPT:
const start_quiz_button = document.getElementById("start-quiz-button");
const quiz_instruction = document.querySelector(".quiz-instruction");
const exit_button = document.getElementById("exit-button");
const continue_quiz = document.getElementById("continue-quiz");

const quiz_box = document.querySelector(".quiz-box");

const result_box = document.querySelector(".result-box");
const repplay_quiz = document.getElementById("replay-quiz");
const exit_quiz = document.getElementById("quit-quiz");
const score_text = document.getElementById("score-box")

const option_list = document.querySelector(".option-list");
const next_button = document.getElementById("next-question-button");
const question_index_text = document.getElementById("question-index-text");
const time_text = document.getElementById("time-text");

// SOUNDS:
const correct_answer_sound = new Audio("correct-answer-sound.mp3");
const wrong_answer_sound = new Audio("wrong-answer-sound.mp3");
const button_click_sound = new Audio("button-sound.mp3");

// QUIZ - GAME (VARIABLE):
let question_count = 0;
let question_number = 1;
let counter;
let score = 0;

// CORRECT & WORNG (OPTION - SELECTED) - ICON:
let correct_answer_tick = `<i class="fas fa-check"></i>`;
let worng_answer_tick = `<i class="fas fa-times"></i>`;

// START - QUIZ - GAME (BUTTON):
start_quiz_button.addEventListener("click", () =>
{
    button_click_sound.play();
    start_quiz_button.style.display = "none";
    quiz_instruction.style.display = "block";
});

// EXIT - QUIZ - GAME (BUTTON):
exit_button.addEventListener("click", () =>
{
    button_click_sound.play();
    quiz_instruction.style.display = "none";
    start_quiz_button.style.display = "flex";
});

// CONTINUE - QUIZ - GAME (BUTTON):
continue_quiz.addEventListener("click", () =>
{
    button_click_sound.play();
    quiz_instruction.style.display = "none";
    quiz_box.style.display = "block";

    show_question(0);
    clearInterval(counter);
    time_counter(15);

    question_index_text.textContent = question_number;
});

// NEXT - QUESTION - BUTTON:
next_button.addEventListener("click", () =>
{
    button_click_sound.play();
    
    if(question_count < question_array.length - 1)
    {
        question_count++;
        question_number++;
        show_question(question_count);
        clearInterval(counter);
        time_counter(15);
        question_index_text.textContent = question_number;
    }
    else
    {
        clearInterval(counter);
        show_result();
    }
});

// PLAY - AGAIN (QUIZ - GAME) - BUTTON:
repplay_quiz.addEventListener("click", () =>
{
    button_click_sound.play();
    result_box.style.display = "none";
    quiz_box.style.display = "block";

    show_question(0);
    clearInterval(counter);
    time_counter(15);

    question_count = 0;
    question_number = 1;

    question_index_text.textContent = question_number;
});

// EXIT - QUIZ - GAME (BUTTON):
exit_quiz.addEventListener("click", () =>
{
    button_click_sound.play();
    result_box.style.display = "none";
    start_quiz_button.style.display = "flex";
});

// SHOW - QUESTION - FUNCTION:
function show_question(index)
{
    const question_text = document.querySelector(".question-text");

    let question = `${question_array[index].num}. ` + ` ${question_array[index].question}`;
    let options = 
        `<div class="option" onclick="option_selected(this)">${question_array[index].options[0]}</div>` +
        `<div class="option" onclick="option_selected(this)">${question_array[index].options[1]}</div>` +
        `<div class="option" onclick="option_selected(this)">${question_array[index].options[2]}</div>` +
        `<div class="option" onclick="option_selected(this)">${question_array[index].options[3]}</div>`
    ;

    question_text.innerHTML = question;
    option_list.innerHTML = options;

    next_button.classList.add("disable");
}

// OPTION - SELECTED - FUNCTION:
function option_selected(answer)
{
    clearInterval(counter);

    let correct_answer = question_array[question_count].answer;
    let user_answer = answer.textContent;

    const options_list = option_list.children.length;

    if(user_answer === correct_answer)
    {
        answer.classList.add("correct-answer");
        answer.insertAdjacentHTML("beforeend", correct_answer_tick);
        correct_answer_sound.play();
        score += 1;
        console.log("Correct");
    }
    else
    {
        answer.classList.add("wrong-answer");
        answer.insertAdjacentHTML("beforeend", worng_answer_tick);
        wrong_answer_sound.play();
        console.log("In-Correct");
    }

    for(let i = 0; i < options_list; i++)
    {
        option_list.children[i].classList.add("disable");
    }

    next_button.classList.remove("disable");
}

// TIME - COUNTER - FUNCTION:
function time_counter(time)
{
    time = 15;
    counter = setInterval(time_function, 1000);

    function time_function()
    {
        time_text.textContent = time;
        time--;

        if(time == -1)
        {
            time_text.textContent = 0;
            clearInterval(counter);
            
            const options_list = option_list.children.length;

            let correct_answer = question_array[question_count].answer;

            for(let i = 0; i < options_list; i++)
            {
                if(option_list.children[i].textContent == correct_answer)
                {
                    option_list.children[i].classList.add("correct-answer");
                    option_list.children[i].insertAdjacentHTML("beforeend", correct_answer_tick);
                    correct_answer_sound.play();
                }
            }

            for(let i = 0 ; i < options_list; i++)
            {
                option_list.children[i].classList.add("disable");
            }
            
            next_button.classList.remove("disable");
            console.log("Time's Up");
        }
    }
}

// SHOW - FINAL - RESULT:
function show_result()
{
    quiz_box.style.display = "none";
    result_box.style.display = "flex";

    if(score == 0)
    {
        let score_text_list = `and your score, <span>${score}</span> out of <span>${question_array.length}</span> 😐.`;
        score_text.innerHTML = score_text_list;
    }
    else if(score > 3)
    {
        let score_text_list = `and your score, <span>${score}</span> out of <span>${question_array.length}</span> 🎉.`;;
        score_text.innerHTML = score_text_list;
    }
    else if(score > 1)
    {
        let score_text_list = `and your score, <span>${score}</span> out of <span>${question_array.length}</span> 😎.`;
        score_text.innerHTML = score_text_list;
    }
    else
    {
        let score_text_list = `and your score, <span>${score}</span> out of <span>${question_array.length}</span> 😐.`;
        score_text.innerHTML = score_text_list;
    }
}