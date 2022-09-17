import { Request, Response } from "express";
import { createUser, verifyLogin } from "../services/userServices";
import { TUserData } from "../types/userTypes";

export async function signUpController(req: Request, res: Response) {
  const {email, password} = req.body;

  const user : TUserData = {email, password}

  const newUser = await createUser(user);

  return res.status(201).send(newUser);
}

export async function signInController(req: Request, res: Response) {
  const user: TUserData = req.body;

  const token: string = await verifyLogin(user);

  return res.status(200).send({token});
}
