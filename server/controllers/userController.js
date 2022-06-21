import User from "../model/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    const usernameCheck = await User.findOne({ username });

    if (usernameCheck) {
      return res.status(401).json({ msg: "Username already exist" });
    }
    const emailCheck = await User.findOne({ email });
    if (emailCheck) {
      return res.json({ msg: "Email already used", status: false });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      username,
      password: hashedPassword,
    });

    const token = jwt.sign({ email: user.email, id: user._id }, "iChat@123", {
      expiresIn: "1d",
      algorithm: "HS384",
    });

    return res.json({ msg: "success", user,token }).status(200);
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ msg: "Incorrect username or password" });
    }
    const passwordCheck = await bcrypt.compare(password, user.password);
    if (!passwordCheck) {
      return res.status(401).json({ msg: "Incorrect username or password" });
    }

    const token = jwt.sign({ email: user.email, id: user._id }, "iChat@123", {
      expiresIn: "1d",
      algorithm: "HS384",
    });
    
    return res.json({ msg: "success", user, token }).status(200);
  } catch (error) {
    next(error);
  }
};

export const setAvatar = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const avatarImage = req.body.image;

    if (req.userId === userId ) {
      const userData = await User.findByIdAndUpdate(userId, {
        isAvatarImageSet: true,
        avatarImage,
      });
      return userData;
    }
    return res.json({
      isSet: userData.isAvatarImageSet,
      image: userData.avatarImage,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllUsers = async(req,res,next) => {
  try {
    const users = await User.find({_id: { $ne: req.params.id }}).select([
      "email",
      "username",
      "avatarImage",
      "_id"
    ]);
    return res.json(users);
  } catch (error) {
    next(error);
  }
};
