const express = require("express");
const path = require("path");
const User = require("../model/user");
const router = express.Router();
//const { upload } = require("../multer");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const sendMail = require("../utils/sendMail");
const sendToken = require("../utils/jwtToken");
const { isAuthenticated } = require("../middleware/auth");
var multer = require("multer");
const { token } = require("morgan");
var upload = multer({ dest: "uploads/" });
//const fileUpload = require("express-fileupload");

router.post("/create-user", upload.single("file"), async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const userEmail = await User.findOne({ email });

    if (userEmail) {
      const filename = req.file.filename;
      const filePath = `uploads/${filename}`;
      fs.unlink(filePath, (err) => {
        if (err) {
          console.log(err);
          res.status(500).json({ message: "Error deleting file" });
        }
        /*  else {
          console.log("File deleted successfully");
        } */
      });
      return next(new ErrorHandler("User already exists", 400));
    }

    const filename = req.file.filename;
    const fileUrl = path.join(filename);

    const user = {
      name: name,
      email: email,
      password: password,
      avatar: fileUrl,
    };

    const activationToken = createActivationToken(user);

    const activationUrl = `http://localhost:3000/activation/${activationToken}`;

    try {
      await sendMail({
        email: user.email,
        subject: "Activate your account",
        message: `Hello ${user.name}, please click on the link to activate your account: ${activationUrl}`,
      });
      res.status(201).json({
        success: true,
        message: `please check your email:- ${user.email} to activate your account!`,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

// create activation token
const ACTIVATION_SECRET = "hfskjdweuiwe093$wew$@%W!Edfonoddfi";
const createActivationToken = (user) => {
  return jwt.sign(user, ACTIVATION_SECRET, {
    expiresIn: "10m",
  });
};

// activate user
router.post(
  "/activation",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { activation_token } = req.body;

      const newUser = jwt.verify(
        activation_token,

        process.env.ACTIVATION_SECRET || "hfskjdweuiwe093$wew$@%W!Edfonoddfi"
      );

      if (!newUser) {
        return next(new ErrorHandler("Invalid token", 400));
      }
      const { name, email, password, avatar } = newUser;

      let user = await User.findOne({ email });

      if (user) {
        return next(new ErrorHandler("User already exists", 400));
      }
      user = await User.create({
        name,
        email,
        avatar,
        password,
      });

     // sendToken(user, 201, res);
      return res.status(201).send({
        msg: "User created successfully...!",
        id: user._id,
        name: user.name,
        email: user.email,
      
      });

    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// login user
router.post(
  "/login-user",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return next(new ErrorHandler("Please provide the all fields!", 400));
      }

      const user = await User.findOne({ email }).select("+password");

      if (!user) {
        return next(new ErrorHandler("User doesn't exists!", 400));
      }

      const isPasswordValid = await user.comparePassword(password);

      if (!isPasswordValid) {
        return next(
          new ErrorHandler("Please provide the correct information", 400)
        );
      }
      console.log(user);
      const token = jwt.sign({ userId: user._id }, "secret-key");
      // sendToken(user, 200, res);
       return res.status(200).send({
        msg: "Login Successful...!",
        id: user._id,
        name: user.name,
        email: user.email,
        token,
      }); 
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

///////////////////LOGIN WITH GOOGLE/////////////////////////
router.post(
  "/login-user1",
  catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;

    try {
      UserModel.findOne({ email })
        .then((user) => {
          bcrypt
            .compare(password, user.password)
            .then((passwordCheck) => {
              if (!passwordCheck)
                return res.status(400).send({ error: "Don't have Password" });

              return res.status(200).send({
                msg: "Login Successful...!",
                email: user.email,

                token,
              });
            })

            .catch((error) => {
              return res.status(400).send({ error: "Password does not Match" });
            });
        })
        .catch((error) => {
          return res.status(404).send({ error: "Username not Found" });
        });
    } catch (error) {
      return res.status(500).send({ error });
    }
  })
);

////////////////////LOGIN WITH FACEBOOK//////////////////////

// load user
router.get(
  "/getuser",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const user = await User.findById(req.user.id);

      if (!user) {
        return next(new ErrorHandler("User doesn't exists", 400));
      }

      res.status(200).json({
        success: true,
        user,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// log out user
router.get(
  "/logout",
  catchAsyncErrors(async (req, res, next) => {
    try {
      res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
      });
      res.status(201).json({
        success: true,
        message: "Log out successful!",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = router;
