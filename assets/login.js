const email = document.querySelector("#email");
const pwd = document.querySelector("#password");

const submitButton = document.querySelector("#submit");

submitButton.addEventListener("click", async _ =>{
  const data = {
    email: email.value,
    password: pwd.value
  };

  const res = await fetch("/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });
  const resData = await res.json();

  if(!resData.ok){
    alert(resData.message);
    return;
  }

  location.replace("/home");
})
