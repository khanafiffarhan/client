"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";
import { api } from "@/lib/api";
import { authClient } from "@/lib/auth-client";
import { PrivateRoute, Spinner } from "@/components/Bits";

function Details() {
  const { id } = useParams();
  const { data } = authClient.useSession(); const user = data.user;
  const [book, setBook] = useState(null), [open, setOpen] = useState(false), [busy, setBusy] = useState(false);
  const load = () => api("/books/" + id).then(setBook).catch(() => setBook(false));
  useEffect(() => { load(); }, [id]);
  const borrow = async () => {
    setBusy(true);
    try { await api("/borrows", { method: "POST", auth: true, body: { bookId: id } }); toast.success("Book borrowed for 7 days!"); setOpen(false); load(); }
    catch (e) { toast.error(e.message); } setBusy(false);
  };
  if (book === null) return <Spinner />;
  if (book === false) return <p className="text-center py-24">Book not found.</p>;
  const out = book.copies <= 0;
  return (<div className="max-w-5xl mx-auto px-4 py-10 grid md:grid-cols-2 gap-8">
    <img src={book.image} alt={book.title} className="w-full h-96 object-cover rounded-xl shadow" />
    <div className="space-y-3"><h1 className="text-3xl font-bold">{book.title}</h1><p>by <b>{book.author}</b></p>
      <span className="badge badge-warning">{book.category}</span><p>{book.description}</p>
      <p className="text-sm">Added by {book.ownerName} ({book.ownerEmail})</p><p>Copies available: <b>{book.copies}</b></p>
      <button disabled={out} onClick={() => setOpen(true)} className="btn btn-warning">{out ? "Not Available" : "Borrow This Book"}</button></div>
    {open && <dialog className="modal modal-open"><div className="modal-box space-y-3"><h3 className="font-bold text-lg">Borrow: {book.title}</h3>
      <input readOnly value={user.name} className="input input-bordered w-full" /><input readOnly value={user.email} className="input input-bordered w-full" />
      <div className="modal-action"><button className="btn" onClick={() => setOpen(false)}>Cancel</button>
        <button className="btn btn-warning" disabled={busy} onClick={borrow}>Confirm Borrow</button></div></div></dialog>}
  </div>);
}
export default () => <PrivateRoute title="Book Details"><Details /></PrivateRoute>;
