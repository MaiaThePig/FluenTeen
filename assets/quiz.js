let hasPlayed = false;

const resultWrapper = document.querySelector(".result");
const resultText = document.querySelector("#result-message");

const options = document.querySelectorAll(".option");

options.forEach(option => {
    const isCorrect = option.getAttribute("correct");

    option.addEventListener("click", _ => {
        if(hasPlayed){
            return;
        }

        hasPlayed = true;
        resultWrapper.style.display = "block";

        if(isCorrect == "true"){
            resultText.innerHTML = "Parabéns! Você <b style='color: green;'>acertou!</b> Gostaria de jogar novamente?"
            return;
        }
        resultText.innerHTML = "Você <b style='color: red;'>errou!</b> Gostaria de jogar novamente?"
    })
})

const retry = document.querySelector(".try-again");

retry.addEventListener("click", _ => location.reload())