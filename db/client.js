import mongoose from "mongoose";

import UserSchema from "./schemes/user.js";
import ItemSchema from "./schemes/item.js";

await mongoose.connect(process.env.MONGO_URI).catch(err => {
  console.log("Database connection failed!");
  console.log(err);
});

const models = {
  User: mongoose.model("Users", UserSchema),
  Item: mongoose.model("Items", ItemSchema)
};

export {models, mongoose}
