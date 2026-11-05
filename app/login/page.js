"use client";
import Link from "next/link";
import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { Title } from "@/components/Bits";
function Login() {
  const router = useRouter(), next = useSearchParams().get("next") || "/";
  const [busy, setBusy] = useState(false);
  const submit = async (e) => {
    e.preventDefault(); setBusy(true);
    const { error } = await authClient.signIn.email({ email: e.target.email.value, password: e.target.password.value });
    setBusy(false);
    if (error) return toast.error(error.message || "Invalid email or password");
    toast.success("Welcome back!"); router.push(next);
  };
  return (<form onSubmit={submit} className="max-w-sm mx-auto px-4 py-14 space-y-3"><Title t="Login" />
    <h1 className="text-3xl font-bold text-center">Login</h1>
    <input name="email" type="email" required placeholder="Email" className="input input-bordered w-full" />
    <input name="password" type="password" required placeholder="Password" className="input input-bordered w-full" />
    <p className="text-sm text-right link">Forget Password?</p>
    <button disabled={busy} className="btn btn-warning w-full">Login</button>
    <button type="button" className="btn btn-outline w-full" onClick={() => authClient.signIn.social({ provider: "google", callbackURL: next })}>Continue with Google</button>
    <p className="text-center text-sm">New here? <Link className="link text-warning" href="/register">Register</Link></p></form>);
}
export default () => <Suspense><Login /></Suspense>;
