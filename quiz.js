const quiz = {};

function checkQuestion(id){
  return quiz[id];
}

function createQuestion(question){
  let id = Math.floor(Math.random() * 100000);

  while(checkQuestion(id)){
    id = Math.floor(Math.random() * 100000)
  }

  quiz[id] = question;

  return id;
}

export {createQuestion, checkQuestion, quiz};
