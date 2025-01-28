import jwt from "jsonwebtoken"
import config from "../../config";



const createToken = (
    tokenizeData:Record<string,any>,
    tokenSecret:string,
    expiresIn:string

)=>{
    const token = jwt.sign(
        tokenizeData,
        tokenSecret,
        {expiresIn:expiresIn},
      );
      return token
}

const decodeAuthorizationToken = (token:string)=>{
    const decoded = jwt.verify(token, config.jwt_token_secret);
    return decoded
}
const decodeRefreshToken = (token:string)=>{
    const decoded = jwt.verify(token, config.jwt_refresh_Token_secret);
    return decoded
}

const authUtil ={
   decodeAuthorizationToken,decodeRefreshToken,createToken
}
export default authUtil