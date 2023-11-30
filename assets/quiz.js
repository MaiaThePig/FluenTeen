let hasPlayed = false;

const resultWrapper = document.querySelector(".result");
const resultText = document.querySelector("#result-message");

const options = document.querySelectorAll(".option");

options.forEach(option => {

    option.addEventListener("click", async _ => {
        if(hasPlayed){
            return;
        }

        hasPlayed = true;
        resultWrapper.style.display = "block";

        const questionID = location.pathname.split("/")[2];
        const answer = option.getAttribute("index");
        const data = {
            questionID,
            answer
        }

        const req = await fetch("/quiz", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({data})
        })

        const res = await req.json();

        resultText.innerHTML = res.message;
    })
})

const retry = document.querySelector(".try-again");

retry.addEventListener("click", _ => location.assign("/quiz"))
