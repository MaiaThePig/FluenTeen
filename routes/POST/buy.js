import { decodeToken, verifyToken } from "../../auth.js";
import { models } from "../../db/client.js";

export default {
  path: "/buy",
  cb: async (req, res)=>{
    const cookies = req.cookies;
    const token = cookies.token;
    if(!verifyToken(token)){
      res.redirect("/login");
      return;
    }
    const {item} = req.body;

    const {User, Item} = models;
  
    const {id} = decodeToken(token).data; //User id  
    const userData = await User.findById(id);
    const {currentItem, items} = userData;

    const itemToBuy = await Item.findById(item);
    const price = itemToBuy.price;

    const currentCoins = userData.coins;


    if(currentItem && currentItem.name === itemToBuy.name){ //If the avatar is currently
                                                            //using the to be purchased item
      userData.currentItem = null;
      userData.save();

      return res.json({
        message: `Você desequipou seu ${itemToBuy.name}`,
        current: currentCoins
      })
    }

    if(items.some(item => item.name === itemToBuy.name)){
      //If avatar already has the item

      userData.currentItem = itemToBuy;
      userData.save();

      return res.json({
        message: `Você equipou seu ${itemToBuy.name}`,
        current: currentCoins
      })
    }

    if(currentCoins < price){
      //Not enough coins
      return res.json({
        message: "Compra não realizada! Você não tem a quantidade necessária de moedas!", 
        current: currentCoins
      });
    }

    userData.coins -= price;
    userData.items.push(itemToBuy);
    userData.currentItem = itemToBuy;

    await userData.save();

    //Success
    res.json({
      message: `Compra realizada! Você acaba de receber e equipar seu ${itemToBuy.name}`,
      current: currentCoins - price
    })
  
  }
}
