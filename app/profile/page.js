"use client";
import { authClient } from "@/lib/auth-client";
import { PrivateRoute } from "@/components/Bits";
function P() {
  const u = authClient.useSession().data.user;
  return <div className="max-w-sm mx-auto py-16 text-center space-y-2"><img src={u.image || "https://i.ibb.co/ZYW3VTp/brown-brim.png"} className="w-28 h-28 rounded-full object-cover mx-auto" />
    <h1 className="text-2xl font-bold">{u.name}</h1><p>{u.email}</p></div>;
}
export default () => <PrivateRoute title="My Profile"><P /></PrivateRoute>;
