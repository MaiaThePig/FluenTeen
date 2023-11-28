import { models } from "../../db/client.js";
import { signToken } from "../../auth.js";

export default {
    path: "/login",
    cb: async (req, res)=>{
        const {email, password} = req.body;

        const {User} = models;

        const result = await User.findOne({email, password}).exec();

        if(!result){
            return res.json({message: "Nenhum usuário com este login e/ou senha!", ok: false})
        }

        const jwtToken = signToken(Math.floor(Date.now() / 1000) + (60 * 60), {id: result._id});

        res.cookie("token", jwtToken);
        res.json({_id: result._id, ok: true});
    }
}