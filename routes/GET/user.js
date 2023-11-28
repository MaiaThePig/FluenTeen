import {models} from "../../db/client.js";

export default {
  path: "/user",
  cb: async (req, res)=>{
    const pathArguments = req.path.split("/").slice(1);
    const userId = pathArguments[1];

    const {User} = models;

    const {username, email, coins, _id} = await User.findById(userId).exec();

    res.json({_id, username, email, coins});
  }
}
