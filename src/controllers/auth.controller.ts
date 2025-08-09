import * as Yup from "yup";
import UserModel from "../models/user.model";
import { Request, Response } from "express";

type TRegister = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const registerValidateSchema = Yup.object({
  username: Yup.string().required(),
  email: Yup.string().email().required(),
  password: Yup.string().required(),
  confirmPassword: Yup.string()
    .required()
    .oneOf([Yup.ref("password"), ""], "Password not match"),
});

export default {
  async register(req: Request, res: Response) {
    const { username, email, password, confirmPassword } =
      req.body as unknown as TRegister;

    try {
      await registerValidateSchema.validate({
        username,
        email,
        password,
        confirmPassword,
      });
      const result = await UserModel.create({
        username,
        email,
        password,
      });

      res.status(200).json({
        message: "Registration Success!",
        data: result,
      });
    } catch (error) {
      const e = error as unknown as Error;
      res.status(400).json({
        message: e.message,
        data: null,
      });
    }
  },
};
