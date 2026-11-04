import { createUser, findUserByEmail } from "../model/auth.Model.js";
import bcrypt from "bcrypt";
import { generateAcessTokens, generateRefreshTokens } from "../utils/token.js";
import { getUserById } from "../model/user.Model.js";
import jwt from "jsonwebtoken";
export const createUserController = async (req, res) => {
  try {
    const { fname, lname, email, confirmPassword, password, role, avatar } =
      req.body;
    const isExist = await findUserByEmail(email);
    if (isExist.length !== 0) {
      return res.status(400).json({ message: "email already exist!" });
    }
    let status;
    if (role === "trader") {
      status = "pending"
    } else {
      status = "approved"
    }
    const hashed_password = await bcrypt.hash(password, 12);
    const newUser = await createUser({
      fname,
      lname,
      email,
      hashed_password,
      role,
      avatar,
      status
    });
    if (newUser.length > 0) {
      return res.status(400).json({ message: "Something went wrong!" });
    }
    return res
      .status(201)
      .json({ message: "account created successfully", user: newUser });

    return;
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "internal server error" });
  }
};
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const isExist = await findUserByEmail(email);
    if (isExist.length === 0) {
      return res
        .status(400)
        .json({ message: "You don`t have an account, plesae register" });
    }
    const isMatch = await bcrypt.compare(password, isExist[0].hashed_password);
    if (!isMatch) {
      return res.status(400).json({ message: "password is not correct!" });
    }
    const accessTokens = generateAcessTokens(isExist[0]);
    // 15m
    const refreshTokens = generateRefreshTokens(isExist[0]);
    // 7d
    if (isExist[0].status !== "approved") {
      return res
        .status(400)
        .json({
          message:
            "You cant login Now! wait teh admin so they could approved your request!",
        });
    }
    res.cookie("refreshTokens", refreshTokens, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      // production, development
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, //7days
      path: "/"
    });
    res.cookie("accessTokens", accessTokens, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 15 * 60 * 1000, //15minutes
      path: "/"

    });
    // save refreshtokens in cookies (7)
    const safeUser = {
      id: isExist.id,
      fname: isExist[0].fname,
      lname: isExist[0].lname,
      role: isExist[0].role,
      avatar: isExist[0].avatar,
      email: isExist[0].email,
    };
    return res
      .status(200)
      .json({ message: "login successfully", user: safeUser, token: accessTokens });
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({ message: "internal server error" });
  }
};
export const me = async (req, res) => {
  try {
    const user = await getUserById(req.user.id); //all user info instead of the id only. 
    if (!user) {
      return res.status(403).json({ message: "no user found" });
    }
    return res.status(200).json({ user });
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({ message: "internal server error" });
  }
};
export const logout = async (req, res) => {
  try {
    res.clearCookie("refreshTokens", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSide: process.env.NODE_ENV === "production" ? "none" : "lax",
      path: "/"
    });
    res.clearCookie("accessTokens", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSide: process.env.NODE_ENV === "production" ? "none" : "lax",
      path: "/"
    });
    return res.status(200).json({ message: "logout successfully" });
  } catch (error) {
    return res.status(500).json({ message: "internal server error" });
  }
};
export const refreshController = async (req, res) => {
  try {
    const refreshTokens = req.cookies.refreshTokens;
    if (!refreshTokens) {
      return res.status(401).json({ message: "refresh tokens is missing!" });
    }
    const payload = jwt.verify(refreshTokens, process.env.REFRESH_JWT_SECRET, {
      issuer: "my-api",
      audience: "my-client",
    });
    console.log("refresh tokenks")
    if (payload.type !== "refresh") {
      return res.status(401).json({ message: "invalid tokens type!" });
    }
    const accessTokens = generateAcessTokens(payload);

    const user = await getUserById(payload.id);
    if (!user) {
      return res.status(401).json({ message: "no user loggedin" })
    }
    const newAccessToken = generateAcessTokens(user)
    res.cookie("accessTokens", newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 15 * 60 * 1000,
      path: "/"
    });
    return res.status(200).json({ accessTokens });
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({ message: "internal server error" });
  }
};
