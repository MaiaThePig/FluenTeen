import { models } from "../db/client.js";
import {createQuestion, checkQuestion} from "../quiz.js";
import {decodeToken, verifyToken} from "../auth.js";

const questions = [
  {
    question: "Qual é o significado da palavra 'meticulous'?",
    options: [
      { content: "Indiferente" },
      { content: "Despreocupado" },
      { content: "Cuidadoso e minucioso" },
      { content: "Agressivo" },
    ],
    correctIndex: 2,
  },
  {
    question: "O que significa a palavra 'ephemeral'?",
    options: [
      { content: "Brilhante e intenso" },
      { content: "Curto e passageiro" },
      { content: "Permanente e duradouro" },
      { content: "Frágil e delicado" },
    ],
    correctIndex: 1,
  },
  {
    question: "Como você definiria a palavra 'ubiquitous'?",
    options: [
      { content: "Barulhento e disruptivo" },
      { content: "Raro e difícil de encontrar" },
      { content: "Limitado a um local específico" },
      { content: "Presente, aparecendo ou encontrado em todos os lugares" },
    ],
    correctIndex: 3,
  },
  {
    question: "Escolha a definição correta para 'alacrity'.",
    options: [
      { content: "Prontidão entusiástica e alegre" },
      { content: "Confusão e desorientação" },
      { content: "Tristeza extrema ou melancolia" },
      { content: "Teimosia e resistência" },
    ],
    correctIndex: 0,
  },
  {
    question: "Qual é o significado da palavra 'querulous'?",
    options: [
      { content: "Calmo e composto" },
      { content: "Expressando gratidão e apreço" },
      { content: "Audacioso e assertivo" },
      { content: "Reclamando de maneira lamentosa" },
    ],
    correctIndex: 3,
  },
  {
    question: "O termo 'effusive' significa:",
    options: [
      { content: "Expressando sentimentos de maneira entusiástica" },
      { content: "Reservado e contido" },
      { content: "Desinteressado e apático" },
      { content: "Disciplinado e focado" },
    ],
    correctIndex: 0,
  },
  {
    question: "Como você definiria 'effervescent'?",
    options: [
      { content: "Desordenado e caótico" },
      { content: "Tranquilo e sereno" },
      { content: "Borbulhante e enérgico" },
      { content: "Cauteloso e hesitante" },
    ],
    correctIndex: 2,
  },
  {
    question: "O que significa 'efficacious'?",
    options: [
      { content: "Capaz de produzir resultados desejados" },
      { content: "Ineficiente e fraco" },
      { content: "Desonesto e enganador" },
      { content: "Rápido e impulsivo" },
    ],
    correctIndex: 0,
  },
  {
    question: "Escolha a definição correta para 'splendid'.",
    options: [
      { content: "Simples e modesto" },
      { content: "Magnífico e grandioso" },
      { content: "Triste e melancólico" },
      { content: "Comum e sem brilho" },
    ],
    correctIndex: 1,
  },
  {
    question: "O que significa 'procrastinate'?",
    options: [
      { content: "Realizar tarefas imediatamente" },
      { content: "Adiar ou atrasar tarefas" },
      { content: "Trabalhar diligentemente" },
      { content: "Ser eficiente e produtivo" },
    ],
    correctIndex: 1,
  },
];

export default {
  path: "/quiz",
  cb: async (req, res) =>{
    const cookies = req.cookies;
    const token = cookies.token;
    if(!verifyToken(token)){
      res.redirect("/login");
      return;
    }

    // /quiz/{id}
    const quizID = req.path.split("/")[2];
    const question = checkQuestion(quizID);

    if(!question){
      const chosenQuestion = questions[Math.floor(Math.random() * questions.length)];
      const newID = createQuestion(chosenQuestion);

      return res.redirect(`/quiz/${newID}`);
    }

    const {id} = decodeToken(token).data;
    const {User} = models;
    const currentUser = await User.findById(id);

    res.render("quiz", {question, currentItem: currentUser.currentItem});
  }
}
