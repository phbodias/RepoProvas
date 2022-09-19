import jwt from "jsonwebtoken";

export async function createValidToken() {
  const id = 1;
  const secret: string = process.env.TOKEN_SECRET_KEY ?? "";
  const token: string = jwt.sign({ id }, secret, {
    expiresIn: "1h",
  });
  return token;
}
