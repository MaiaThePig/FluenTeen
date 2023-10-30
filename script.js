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
function openModal(modal)
{
  var modal = document.getElementById(modal);
    modal.style.display = "block";
    var span = document.querySelector("#"+modal.id+" .close");
    span.onclick = function() {
      modal.style.display = "none";
    }
    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }
}
});
