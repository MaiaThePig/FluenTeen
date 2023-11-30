import {models} from "../../db/client.js";
import {verifyToken, decodeToken} from "../../auth.js";
import {checkQuestion} from "../../quiz.js";

export default {
  path: "/quiz",
  cb: async (req, res)=>{
    const cookies = req.cookies;
    const token = cookies.token;
    if(!verifyToken(token)){
      res.redirect("/login");
      return;
    }
    const {questionID, answer} = req.body.data;

    const {User} = models;
  
    const {id} = decodeToken(token).data; //User id  
    const userData = await User.findById(id);
   
    const question = checkQuestion(questionID);
   
    if(question.correctIndex != answer){
      return res.json({
        message: "Você <b style='color: red;'>errou!</b> Gostaria de jogar novamente?"
      })
    }


    userData.coins += 10;
    userData.save();

    return res.json({
      message: "Parabéns! Você <b style='color: green;'>acertou!</b> Ganhando 10 moedas! Gostaria de jogar novamente?"
    })
  }
}
