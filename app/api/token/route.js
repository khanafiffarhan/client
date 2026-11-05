import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import jwt from "jsonwebtoken";
export const dynamic = "force-dynamic";
export async function GET() {
  const s = await auth.api.getSession({ headers: await headers() });
  if (!s) return Response.json({ message: "Unauthorized" }, { status: 401 });
  return Response.json({ token: jwt.sign({ email: s.user.email, name: s.user.name }, process.env.JWT_SECRET, { expiresIn: "1h" }) });
}
