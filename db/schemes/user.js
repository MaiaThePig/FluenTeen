import Item from "./item.js";
import {Schema} from "mongoose";

export default new Schema({
  id: Schema.ObjectId,
  username: {type: String, required: true},
  email: {type: String, required: true},
  password: {type: String, required: true},
  coins: {type: Number, default: 1000},
  currentItem: {type: Item, default: null},
  items: {type: [Item], default: [], required: true}
})

