import JWT from "jsonwebtoken";

export default function decodeToken(req: string | undefined) {
  const authorization = req;
  const token = authorization?.replace("Bearer ", "");
  return Object(JWT.decode(token || ""));
}
