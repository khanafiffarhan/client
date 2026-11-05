"use client";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { api, uploadImage } from "@/lib/api";
import { authClient } from "@/lib/auth-client";
import { PrivateRoute, Spinner, H2 } from "@/components/Bits";

function MyBooks() {
  const { data } = authClient.useSession(); const email = data.user.email;
  const [books, setBooks] = useState(null), [edit, setEdit] = useState(null), [del, setDel] = useState(null);
  useEffect(() => { api("/books").then((a) => setBooks(a.filter((b) => b.ownerEmail === email))); }, [email]);
  const save = async (e) => {
    e.preventDefault(); const f = e.target;
    try {
      const image = f.image.files[0] ? await uploadImage(f.image.files[0]) : edit.image;
      const body = { title: f.title.value, author: f.author.value, category: f.category.value, description: f.description.value, copies: f.copies.value, image };
      await api("/books/" + edit._id, { method: "PATCH", auth: true, body });
      setBooks(books.map((b) => (b._id === edit._id ? { ...b, ...body, copies: Number(body.copies) } : b))); setEdit(null); toast.success("Book updated!");
    } catch (er) { toast.error(er.message); }
  };
  const remove = async () => {
    try { await api("/books/" + del._id, { method: "DELETE", auth: true }); setBooks(books.filter((b) => b._id !== del._id)); toast.success("Book deleted"); }
    catch (er) { toast.error(er.message); } setDel(null);
  };
  if (!books) return <Spinner />;
  return (<div className="max-w-5xl mx-auto px-4 py-10"><H2>My Books</H2>
    {!books.length ? <p className="text-center">You haven't added any books yet.</p> :
      <div className="overflow-x-auto"><table className="table"><thead><tr><th>Image</th><th>Title</th><th>Category</th><th>Copies</th><th></th></tr></thead><tbody>
        {books.map((b) => <tr key={b._id}><td><img src={b.image} className="w-14 h-16 object-cover rounded" /></td><td>{b.title}</td><td>{b.category}</td><td>{b.copies}</td>
          <td className="space-x-2"><button className="btn btn-sm btn-info" onClick={() => setEdit(b)}>Edit</button>
            <button className="btn btn-sm btn-error" onClick={() => setDel(b)}>Delete</button></td></tr>)}</tbody></table></div>}
    {edit && <dialog className="modal modal-open"><form onSubmit={save} className="modal-box space-y-2"><h3 className="font-bold text-lg">Edit Book</h3>
      <input name="title" defaultValue={edit.title} required className="input input-bordered w-full" />
      <input name="author" defaultValue={edit.author} required className="input input-bordered w-full" />
      <select name="category" defaultValue={edit.category} className="select select-bordered w-full">{["Fiction", "Science", "History", "Kids", "Others"].map((x) => <option key={x}>{x}</option>)}</select>
      <input name="copies" type="number" min="0" defaultValue={edit.copies} className="input input-bordered w-full" />
      <input name="image" type="file" accept="image/*" className="file-input file-input-bordered w-full" />
      <textarea name="description" defaultValue={edit.description} required className="textarea textarea-bordered w-full" />
      <div className="modal-action"><button type="button" className="btn" onClick={() => setEdit(null)}>Cancel</button><button className="btn btn-warning">Save</button></div></form></dialog>}
    {del && <dialog className="modal modal-open"><div className="modal-box"><h3 className="font-bold text-lg">Delete "{del.title}"?</h3><p className="py-3">This cannot be undone.</p>
      <div className="modal-action"><button className="btn" onClick={() => setDel(null)}>Cancel</button><button className="btn btn-error" onClick={remove}>Yes, Delete</button></div></div></dialog>}
  </div>);
}
export default () => <PrivateRoute title="My Books"><MyBooks /></PrivateRoute>;
