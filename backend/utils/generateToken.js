import jwt from 'jsonwebtoken';


const generateToken = (res, userId)=>{
    const token = jwt.sign(
        {userId: userId},
        process.env.JWT_SECRET,
        {expiresIn: '30d'}            
    )
    // set JWT token as a HTTP only cookie. the token here is named as 'jwt'
    res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict', //prevents attacks
        maxAge: 30*24*60*60*1000
    });
}

export default generateToken;