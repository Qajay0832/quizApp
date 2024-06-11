document.addEventListener("DOMContentLoaded", () => {
    fetch('./data.json').then((response) => response.json()).then((json) => {
        let mainPage = document.getElementsByClassName("main")[0];
        let quizPage = document.getElementsByClassName("question-container")[0];

        let card_btn = document.querySelectorAll('.card-btn');
        card_btn.forEach((cardBtn) => {
            cardBtn.addEventListener("click", () => {
                let card_btn_number = parseInt(cardBtn.getAttribute("data-section"));
                startQuiz(card_btn_number);
            })
        })
        let score = 0;
        function startQuiz(dataSection) {
            mainPage.style.display = "none";
            quizPage.style.display = "flex";
            quizPage.innerHTML = `
            <div class="score">Your Current Score is : ${score}</div>
            <div class="questions-content">
        </div>

        <div class="options">
            <ul>

            </ul>
        <p class="right">Correct Answer!</p>
        <p class="wrong"></p>
        <button class="next-btn">Next</button>
        </div>
    `

            let questionIndex = 0;
            let questions = json.sections[dataSection].questions;
            showQuestion();

            function showQuestion() {
                let right = document.querySelector(".right");
                let wrong = document.querySelector(".wrong");
                right.style.display = 'none';
                wrong.style.display = 'none';
                let answerSelected = false;
                questionText = document.querySelector(".questions-content");
                let options = document.querySelector("ul");
                options.innerHTML = ''
                questionText.innerHTML = questions[questionIndex].question;
                questions[questionIndex].options.forEach((e, i) => {
                    let option = document.createElement("li");
                    option.textContent = e;
                    options.appendChild(option);
                    option.addEventListener('click', () => {
                        if (!answerSelected) {
                            answerSelected = true;
                            if (questions[questionIndex].answer == option.textContent) {
                                score++;
                                document.querySelector(".score").textContent = "Your Current Score is : " + score;
                                right.style.display = 'block';
                            }
                            else {
                                wrong.textContent = "Wrong Answer!" + " " + questions[questionIndex].answer;
                                wrong.style.display = 'block';
                            }
                        }
                    })
                }
                )
            }

            document.querySelector(".next-btn").addEventListener("click", () => {
                questionIndex++;
                if (questionIndex == questions.length) {
                    endQuiz();
                }
                else {
                    showQuestion();

                }
            })

            function endQuiz() {
                quizPage.innerHTML = `
        <img src="./assets/quizcompleted.jpg" alt="quizEnd">
            <div class="scoreElement>
                <h1 class="quizEnd-h1">QUIZ Completed</h1>
                <p>Your Final Score is : ${score}/10</p>
                <button id="home-btn">Go To Home</button>
            </div>
        `
                document.getElementById("home-btn").addEventListener("click", () => {
                    quizPage.style.display = 'none';
                    mainPage.style.display = 'block';
                })
            }


        }

        let randomBtn = document.querySelector(".randon-btn-btn")
        randomBtn.addEventListener("click", function () {
            const randomSectionIndex = Math.floor(Math.random() * json.sections.length);
            startQuiz(randomSectionIndex);
        })
    })
})