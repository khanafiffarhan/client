"use client";
import Link from "next/link";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export const Spinner = () => <div className="flex justify-center py-24"><span className="loading loading-spinner loading-lg text-warning"></span></div>;
export const Title = ({ t }) => { useEffect(() => { document.title = "BookNook | " + t; }, [t]); return null; };
export const H2 = ({ children }) => <h2 className="text-3xl font-bold text-center mb-8">{children}</h2>;

export function PrivateRoute({ title, children }) {
  const { data, isPending } = authClient.useSession();
  const router = useRouter(), path = usePathname();
  useEffect(() => { if (!isPending && !data) router.replace("/login?next=" + path); }, [isPending, data, path, router]);
  if (isPending || !data) return <Spinner />;
  return <><Title t={title} />{children}</>;
}

export const BookCard = ({ b }) => (
  <div className="card bg-base-100 shadow-lg h-full">
    <figure className="h-60"><img src={b.image} alt={b.title} className="w-full h-full object-cover" /></figure>
    <div className="card-body">
      <h3 className="card-title line-clamp-1">{b.title}</h3>
      <p className="text-sm">by {b.author}</p>
      <div><span className="badge badge-warning">{b.category}</span></div>
      <div className="card-actions mt-auto pt-3"><Link href={`/books/${b._id}`} className="btn btn-warning btn-sm w-full">View Details</Link></div>
    </div>
  </div>
);

const X = () => <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M18.244 2H21.5l-7.11 8.13L22.75 22h-6.55l-5.13-6.71L5.2 22H1.94l7.6-8.69L1.5 2h6.7l4.64 6.13L18.244 2Zm-1.14 18h1.8L7.2 3.9H5.27L17.1 20Z" /></svg>;

export function Navbar() {
  const { data } = authClient.useSession();
  const user = data?.user, path = usePathname(), router = useRouter();
  const links = [["/", "Home"], ["/books", "All Books"], ...(user ? [["/add-book", "Add Book"], ["/my-books", "My Books"], ["/my-borrows", "My Borrows"]] : [])];
  const toggle = () => { const n = document.documentElement.dataset.theme === "dark" ? "light" : "dark"; document.documentElement.dataset.theme = n; localStorage.setItem("theme", n); };
  useEffect(() => { document.documentElement.dataset.theme = localStorage.getItem("theme") || "light"; }, []);
  const items = links.map(([h, l]) => <li key={h}><Link href={h} className={path === h ? "text-warning font-semibold" : ""}>{l}</Link></li>);
  return (
    <div className="navbar bg-base-100 shadow sticky top-0 z-50 px-4 lg:px-10">
      <div className="navbar-start">
        <div className="dropdown lg:hidden"><label tabIndex={0} className="btn btn-ghost">☰</label>
          <ul tabIndex={0} className="menu dropdown-content bg-base-100 rounded-box w-52 p-2 shadow z-10">{items}</ul></div>
        <Link href="/" className="text-2xl font-bold">📚 Book<span className="text-warning">Nook</span></Link>
      </div>
      <div className="navbar-center hidden lg:flex"><ul className="menu menu-horizontal">{items}</ul></div>
      <div className="navbar-end gap-2">
        <button onClick={toggle} className="btn btn-ghost btn-circle" aria-label="theme">🌓</button>
        {user ? (
          <div className="dropdown dropdown-end"><label tabIndex={0} className="avatar cursor-pointer"><div className="w-10 rounded-full ring ring-warning">
            <img src={user.image || "https://i.ibb.co/ZYW3VTp/brown-brim.png"} alt="user" /></div></label>
            <ul tabIndex={0} className="menu dropdown-content bg-base-100 rounded-box w-52 p-2 shadow mt-3 z-10">
              <li className="font-bold px-3 py-2">{user.name}</li>
              <li><Link href="/profile">My Profile</Link></li>
              <li><button onClick={async () => { await authClient.signOut(); router.push("/"); }}>Logout</button></li></ul></div>
        ) : <><Link href="/login" className="btn btn-warning btn-sm">Login</Link><Link href="/register" className="btn btn-outline btn-warning btn-sm">Register</Link></>}
      </div>
    </div>
  );
}

export const Footer = () => (
  <footer className="bg-base-200 mt-16 py-10 px-6 text-center space-y-3">
    <div className="text-2xl font-bold">📚 Book<span className="text-warning">Nook</span></div>
    <p>Add a book, borrow a book, return a book — your small online library.</p>
    <p>✉ hello@booknook.app · ☎ +880 1700-000000 · Khulna, Bangladesh</p>
    <div className="flex justify-center gap-4"><a href="https://x.com" aria-label="X"><X /></a>
      <a href="https://facebook.com" className="font-bold">f</a><a href="https://github.com" className="font-bold">GH</a></div>
    <p className="text-sm opacity-70">© {new Date().getFullYear()} BookNook. All rights reserved.</p>
  </footer>
);
