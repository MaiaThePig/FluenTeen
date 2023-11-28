const currentAmount = document.querySelector("#currentMoney");

async function buyItem(id){
    const data = {
        item: id
    }

    const res = await fetch("/buy", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })

    const {message, current} = await res.json();

    currentAmount.innerHTML = current;
    alert(message);
    console.log(message, current);
}
  