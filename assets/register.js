const user = document.querySelector("#user");
const email = document.querySelector("#email");
const pwd = document.querySelector("#password");

const submitButton = document.querySelector("#submit");

function validInput(user, email, pwd){
  if(user.length <= 3){
    alert("Nome de usuário deve ter mais de 3 caracteres");
    return;
  }
  if(!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}/.test(email)){
    alert("Email inválido");
    return;
  }
  
  if(pwd.length <= 3){
    alert("Senha deve ter mais de 3 caracteres");
    return;
  }

  return true;
}

submitButton.addEventListener("click", async _ =>{
  const data = {
    username: user.value,
    email: email.value,
    password: pwd.value
  };

  if(!validInput(user.value, email.value, pwd.value)){
    return;
  }

  const res = await fetch("/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });
  const resData = await res.json();

  if(resData.ok){
    return location.replace("/home");
  }
})
