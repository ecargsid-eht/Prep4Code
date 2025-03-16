import jwt from 'jsonwebtoken'

export const verifyJWT = (req, res, next) => {
    const token = req.header('Authorization').split(" ")[1];
    const error = new Error();
    error.status = 401;
    error.message = "Invalid token.";
    if(!token){
        next(error);
    }
    try{
        const decode = jwt.verify(token,process.env.SECRET_KEY);
        req.user = decode;
        next();
    }
    catch(err){
        next(error);
    }
}