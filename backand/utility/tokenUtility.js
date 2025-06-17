import jwt  from 'jsonwebtoken';
export const TokenEncode=(email,user_id)=>{

    const KEY=process.env.JWT_KEY;
    const EXPIRE={"expiresIn":process.env.JWT_EXPIRE_TIME}
    const PAYLOAD={email:email,user_id:user_id}
    return jwt.sign(PAYLOAD,KEY,EXPIRE);
}
export const TokenDecode=(token)=>{
    try{
        const KEY=process.env.JWT_KEY;
        return jwt.verify(token,KEY)
    }
    catch{
        return null;
    }

}