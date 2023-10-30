document.addEventListener('DOMContentLoaded', function() {
    const options = document.querySelectorAll('.option');
    const resultContainer = document.querySelector('.result');
    const tryAgainButton = document.querySelector('.try-again');

    options.forEach(option => {
        option.addEventListener('click', function() {
            const isCorrect = option.dataset.correct === 'true';
            showResult(isCorrect);
        });
    });

    tryAgainButton.addEventListener('click', function() {
        resultContainer.style.display = 'none';
        options.forEach(option => {
            option.disabled = false;
        });
    });

    function showResult(isCorrect) {
        options.forEach(option => {
            option.disabled = true;
        });

        const resultMessage = document.getElementById('result-message');
        if (isCorrect) {
            resultMessage.innerText = 'Resposta Correta!';
            tryAgainButton.style.display = 'none'; // Adiciona esta linha
        } else {
            resultMessage.innerText = 'Resposta Incorreta. Tente Novamente!';
            tryAgainButton.style.display = 'block'; // Adiciona esta linha
        }

        resultContainer.style.display = 'block';
    }
    });

  var popupLink = document.getElementById("popup-link");
  var popupWindow = document.getElementById("popup-window");
  var popupClose = document.getElementById("popup-close");
  popupLink.addEventListener("click", function(event) {
    event.preventDefault();
    popupWindow.style.display = "block";
  });
  popupClose.addEventListener("click", function() {
    popupWindow.style.display = "none";
  });        
