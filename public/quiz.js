import {verifyToken} from "../auth.js";

const questions = [
  {
    question: "Qual é o significado da palavra 'meticulous'?",
    options: [
      { content: "Despreocupado", correct: false },
      { content: "Cuidadoso e minucioso", correct: true },
      { content: "Agressivo", correct: false },
      { content: "Indiferente", correct: false },
    ],
  },
  {
    question: "O que significa a palavra 'ephemeral'?",
    options: [
      { content: "Permanente e duradouro", correct: false },
      { content: "Curto e passageiro", correct: true },
      { content: "Brilhante e intenso", correct: false },
      { content: "Frágil e delicado", correct: false },
    ],
  },
  {
    question: "Como você definiria a palavra 'ubiquitous'?",
    options: [
      { content: "Raro e difícil de encontrar", correct: false },
      { content: "Presente, aparecendo ou encontrado em todos os lugares", correct: true },
      { content: "Barulhento e disruptivo", correct: false },
      { content: "Limitado a um local específico", correct: false },
    ],
  },
  {
    question: "Escolha a definição correta para 'alacrity'.",
    options: [
      { content: "Tristeza extrema ou melancolia", correct: false },
      { content: "Prontidão entusiástica e alegre", correct: true },
      { content: "Teimosia e resistência", correct: false },
      { content: "Confusão e desorientação", correct: false },
    ],
  },
  {
    question: "Qual é o significado da palavra 'querulous'?",
    options: [
      { content: "Expressando gratidão e apreço", correct: false },
      { content: "Reclamando de maneira lamentosa", correct: true },
      { content: "Calmo e composto", correct: false },
      { content: "Audacioso e assertivo", correct: false },
    ],
  },
  {
    question: "O termo 'effusive' significa:",
    options: [
      { content: "Reservado e contido", correct: false },
      { content: "Expressando sentimentos de maneira entusiástica", correct: true },
      { content: "Desinteressado e apático", correct: false },
      { content: "Disciplinado e focado", correct: false },
    ],
  },
  {
    question: "Como você definiria 'effervescent'?",
    options: [
      { content: "Tranquilo e sereno", correct: false },
      { content: "Borbulhante e enérgico", correct: true },
      { content: "Cauteloso e hesitante", correct: false },
      { content: "Desordenado e caótico", correct: false },
    ],
  },
  {
    question: "O que significa 'efficacious'?",
    options: [
      { content: "Ineficiente e fraco", correct: false },
      { content: "Capaz de produzir resultados desejados", correct: true },
      { content: "Rápido e impulsivo", correct: false },
      { content: "Desonesto e enganador", correct: false },
    ],
  },
  {
    question: "Escolha a definição correta para 'splendid'.",
    options: [
      { content: "Comum e sem brilho", correct: false },
      { content: "Magnífico e grandioso", correct: true },
      { content: "Triste e melancólico", correct: false },
      { content: "Simples e modesto", correct: false },
    ],
  },
  {
    question: "O que significa 'procrastinate'?",
    options: [
      { content: "Realizar tarefas imediatamente", correct: false },
      { content: "Adiar ou atrasar tarefas", correct: true },
      { content: "Trabalhar diligentemente", correct: false },
      { content: "Ser eficiente e produtivo", correct: false },
    ],
  },
];
export default {
  path: "/quiz",
  cb: (req, res) =>{
    const cookies = req.cookies;
    const token = cookies.token;
    if(!verifyToken(token)){
      res.redirect("/login");
      return;
    }

    const chosenAnswer = Math.round(Math.random() * questions.length - 1)

    res.render("quiz", questions[chosenAnswer]);
  }
}
