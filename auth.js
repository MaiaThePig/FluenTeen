import jwt from "jsonwebtoken";

function signToken(expireDate, data){
  return jwt.sign({exp: expireDate, data}, process.env.PRIVATE_KEY);
}

function verifyToken(t){
  try{
    return jwt.verify(t, process.env.PRIVATE_KEY);
  }catch(err){
    return false;
  }
}

function decodeToken(t){
  return jwt.decode(t, process.env.PRIVATE_KEY);
}

export {signToken, verifyToken, decodeToken};
