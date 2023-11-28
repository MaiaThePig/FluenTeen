import { verifyToken } from "../auth.js";

export default {
  path: "/register",
  cb: (req, res) =>{
    const cookies = req.cookies;
    const token = cookies.token;
    if(verifyToken(token)){
      res.redirect("/home");
      return;
    }

    res.render("cadastro");
  }
}
