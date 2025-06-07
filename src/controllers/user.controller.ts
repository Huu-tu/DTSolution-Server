import { Request, Response, NextFunction } from "express";
import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';
import User from "../models/user.model";
const KEY = process.env.key;

export const signin = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ success: false, message: "Vui lòng nhập email và mật khẩu." });
      return;
    }

    const user = await User.findOne({ email });

    if (!user ) {
      res.status(404).json({ success: false, message: "Tài khoản không tồn tại." });
      return;
    }

    if (!user.password) {
      res.status(500).json({ success: false, message: "Tài khoản không hợp lệ (thiếu mật khẩu)." });
      return;
    }

    const isMatch =  bcrypt.compare(password, user.password);

    if (!isMatch) {
      res.status(401).json({ success: false, message: "Sai mật khẩu." });
      return;
    }

    // const token = jwt.sign(
    //   {
    //     _id: user._id,
    //     role: user.role,
    //   },
    //   "pass",
    //   { expiresIn: "7d" }
    // );

    res.status(200).json({
      success: true,
      message: "Đăng nhập thành công.",
      // token,
      // role: user.role,
      // user: {
      //   _id: user._id,
      //   fullName: user.fullName,
      //   email: user.email,
      //   phone: user.phone,
      // },
    });

  } catch (error) {
    console.error("Lỗi khi đăng nhập:", error);
    res.status(500).json({ success: false, message: "Đã xảy ra lỗi phía server." });
  }
};

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name, email, password, phone, role } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      res.status(409).json({ success: false, message: "Tài khoản đã tồn tại." });
      return;
    }

    const newUser = await User.create({
      name,
      email,
      password,
      phone,
      role,
    });

    res.status(201).json({ success: true, message: "Đăng ký thành công", data: newUser });
  } catch (error) {
    console.error("Lỗi khi đăng ký:", error);
    res.status(500).json({ success: false, message: "Đã xảy ra lỗi phía server." });
  }
};


