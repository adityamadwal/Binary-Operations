document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("answer-form");
    const userAnswerInput = document.getElementById("user-answer");
    const feedback = document.getElementById("feedback");
    const pythonCode = document.getElementById("python-code");
    let correctAnswer = "";
    function getRandomOperator() {
        const operators = ["^", "&", "|"];
        return operators[Math.floor(Math.random() * operators.length)];
    }
    function generateBinaryQuestion() {
        const num1 = Math.floor(Math.random() * 11) + 1; // Restrict numbers between 1 and 11
        const num2 = Math.floor(Math.random() * 11) + 1;
        const operator = getRandomOperator();
        const binaryQuestion = `x = ${num1}\ny = ${num2}\nresult = x ${operator} y`;
        pythonCode.textContent = binaryQuestion;
        switch (operator) {
            case "^":
                correctAnswer = (num1 ^ num2).toString(2); 
                break;
            case "&":
                correctAnswer = (num1 & num2).toString(2); 
                break;
            case "|":
                correctAnswer = (num1 | num2).toString(2); 
                break;
        }
        correctAnswer = correctAnswer.replace(/^0+/, '');
        sessionStorage.setItem("correctAnswer", correctAnswer);
    }
    function getStoredAnswer() {
        const storedAnswer = sessionStorage.getItem("correctAnswer");
        if (storedAnswer) {
            correctAnswer = storedAnswer;
        } else {
            generateBinaryQuestion(); 
        }
    }
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const userAnswer = userAnswerInput.value.trim();
        const formattedUserAnswer = userAnswer.replace(/^0+/, '');
        if (formattedUserAnswer === correctAnswer) {
            sessionStorage.clear();
            window.location.href = "flag_page.html"; 
        } else {
            feedback.textContent = "❌ Incorrect!...";
            feedback.style.color = "#000000";
            generateBinaryQuestion(); 
        }
        userAnswerInput.value = "";
    });
    getStoredAnswer();
    document.addEventListener("contextmenu", (e) => e.preventDefault());
    document.addEventListener("keydown", (e) => {
        if (
            e.key === "F12" ||
            (e.ctrlKey && e.shiftKey && e.key === "I") ||
            (e.ctrlKey && e.shiftKey && e.key === "C") ||
            (e.ctrlKey && e.key === "U")
        ) {
            e.preventDefault();
        }
    });
    document.body.style.userSelect = "none";
});
