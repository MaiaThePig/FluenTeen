import {Schema} from "mongoose";

export default new Schema({
  id: Schema.ObjectId,
  path: {type: String, required: true},
  name: {type: String, required: true},
  description: {type: String, required: true},
  price: {type: Number, required: true}
})
