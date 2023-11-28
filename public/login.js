import { verifyToken } from "../auth.js";

export default {
  path: "/login",
  cb: (req, res) =>{
    const cookies = req.cookies;
    const token = cookies.token;
    if(verifyToken(token)){
      res.redirect("/home");
      return;
    }

    res.render("login");
  }
}
