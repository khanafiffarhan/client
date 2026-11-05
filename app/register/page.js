"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { Title } from "@/components/Bits";
export default function Register() {
  const router = useRouter(); const [err, setErr] = useState(""), [busy, setBusy] = useState(false);
  const submit = async (e) => {
    e.preventDefault(); const f = e.target, p = f.password.value;
    const msg = !/[A-Z]/.test(p) ? "Password needs an uppercase letter" : !/[a-z]/.test(p) ? "Password needs a lowercase letter" : p.length < 6 ? "Password must be at least 6 characters" : "";
    setErr(msg); if (msg) return toast.error(msg);
    setBusy(true);
    const { error } = await authClient.signUp.email({ name: f.name.value, email: f.email.value, image: f.photo.value, password: p });
    setBusy(false);
    if (error) return toast.error(error.message || "Registration failed");
    toast.success("Registered! Please login."); router.push("/login");
  };
  const c = "input input-bordered w-full";
  return (<form onSubmit={submit} className="max-w-sm mx-auto px-4 py-14 space-y-3"><Title t="Register" />
    <h1 className="text-3xl font-bold text-center">Register</h1>
    <input name="name" required placeholder="Name" className={c} /><input name="email" type="email" required placeholder="Email" className={c} />
    <input name="photo" type="url" required placeholder="Photo URL" className={c} /><input name="password" type="password" required placeholder="Password" className={c} />
    {err && <p className="text-error text-sm">{err}</p>}
    <button disabled={busy} className="btn btn-warning w-full">Register</button>
    <button type="button" className="btn btn-outline w-full" onClick={() => authClient.signIn.social({ provider: "google", callbackURL: "/" })}>Continue with Google</button>
    <p className="text-center text-sm">Have an account? <Link className="link text-warning" href="/login">Login</Link></p></form>);
}
