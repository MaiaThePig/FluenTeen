import { signToken } from "../../auth.js";

import {models} from "../../db/client.js";

export default {
  path: "/register",
  cb: async (req, res)=>{
    const {username, email, password} = req.body;
    
    const {User} = models;
    const newUser = new User({username, email, password});

    await newUser.save()
   
    const jwtToken = signToken(Math.floor(Date.now() / 1000) + (60 * 60), {id: newUser._id});

    res.cookie("token", jwtToken);

    res.json({_id: newUser._id, ok: true});
  }
}
