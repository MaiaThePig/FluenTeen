import "dotenv/config"

import express from "express";
import cookieParser from "cookie-parser";

import formRoutes from "./formRoutes.js";

const routes = await formRoutes();

console.log(routes);

const app = express();

app.set("view engine", "ejs");
app.set("views");

app.use(cookieParser());
app.use(express.json());

app.use("/src", express.static("./src"));
app.use("/assets", express.static("./assets"));

app.all("*", async (req, res)=>{
  const path = `/${req.path.split("/")[1]}`;
  const {method} = req;

  const route = routes[method][path];

  try{
    if(!route){
      return res.redirect("/home");
    }

    return route(req, res);
  }catch(err){
    console.log(err);

    res.sendStatus(505);
    return res.end();
  }

})

app.listen(process.env.PORT, _ => console.log(`Listening at ${process.env.PORT}`));
