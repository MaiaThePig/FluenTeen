import { verifyToken, decodeToken} from "../auth.js";
import {models} from "../db/client.js";

export default {
  path: "/shop",
  cb: async (req, res) =>{
    const cookies = req.cookies;
    const token = cookies.token;
    if(!verifyToken(token)){
      res.redirect("/login");
      return;
    }

    const {Item, User} = models;
    const items = await Item.find({}).exec();

    const {id} = decodeToken(token).data;

    const {username, coins} = await User.findById(id);

    res.render("loja", {
      user: {username, coins},
      items: items
    });
  }
}
