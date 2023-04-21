const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
const User = require("../model/user");
const Shop = require("../model/shop");





exports.isAuthenticated = catchAsyncErrors(async(req,res,next) => {
    const {token} = req.cookies;

    if(!token){
        return next(new ErrorHandler("Please login to continue", 401));
    }
const JWT_SECRET_KEY = "dfbkjgflseiia3948943954wfsdchsgfuw#%#%";
    const decoded = jwt.verify(token, JWT_SECRET_KEY);

    req.user = await User.findById(decoded.id);

    next();
});


exports.isSeller = catchAsyncErrors(async(req,res,next) => {
    const {seller_token} = req.cookies;
    if(!seller_token){
        return next(new ErrorHandler("Please login to continue", 401));
    }
const JWT_SECRET_KEY = "dfbkjgflseiia3948943954wfsdchsgfuw#%#%";
    const decoded = jwt.verify(seller_token, JWT_SECRET_KEY);

    req.seller = await Shop.findById(decoded.id);

    next();
});
/* 

export function localVariables(req, res, next) {
  req.app.locals = {
    OTP: null,
    resetSession: false,
  };
  next();
}
 */


/** auth middleware */
/* export default async function Auth(req, res, next){
    try {
        
        // access authorize header to validate request
        const token = req.headers.authorization.split(" ")[1];

        // retrive the user details fo the logged in user
        const decodedToken = await jwt.verify(token, ENV.JWT_SECRET);

        req.user = decodedToken;

        next()

    } catch (error) {
        res.status(401).json({ error : "Authentication Failed!"})
    }
} */


 
