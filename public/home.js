import { models } from "../db/client.js";
import {decodeToken, verifyToken} from "../auth.js";

export default {
  path: "/home",
  cb: async (req, res) =>{
    const cookies = req.cookies;
    const token = cookies.token;
    if(!verifyToken(token)){
      res.redirect("/login");
      return;
    }

    const {id} = decodeToken(token).data;
    const {User} = models;

    const currentUser = await User.findById(id);

    res.render("home", {currentItem: currentUser.currentItem, username: currentUser.username});
  }
}
