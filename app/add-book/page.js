"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { api, uploadImage } from "@/lib/api";
import { authClient } from "@/lib/auth-client";
import { PrivateRoute, H2 } from "@/components/Bits";

function Form() {
  const { data } = authClient.useSession(); const user = data.user, router = useRouter();
  const [busy, setBusy] = useState(false);
  const submit = async (e) => {
    e.preventDefault(); const f = e.target; setBusy(true);
    try {
      const image = await uploadImage(f.image.files[0]);
      await api("/books", { method: "POST", auth: true, body: { title: f.title.value, author: f.author.value, category: f.category.value,
        image, description: f.description.value, copies: f.copies.value, ownerName: user.name } });
      toast.success("Book added!"); router.push("/my-books");
    } catch (err) { toast.error(err.message); } setBusy(false);
  };
  const c = "input input-bordered w-full";
  return (<form onSubmit={submit} className="max-w-xl mx-auto px-4 py-10 space-y-3"><H2>Add a Book</H2>
    <input name="title" required placeholder="Book Title" className={c} /><input name="author" required placeholder="Author Name" className={c} />
    <select name="category" className="select select-bordered w-full">{["Fiction", "Science", "History", "Kids", "Others"].map((x) => <option key={x}>{x}</option>)}</select>
    <input name="copies" type="number" min="1" defaultValue="1" required className={c} placeholder="Total Copies" />
    <input name="image" type="file" accept="image/*" required className="file-input file-input-bordered w-full" />
    <textarea name="description" required placeholder="Short Description" className="textarea textarea-bordered w-full" />
    <input readOnly value={user.name} className={c} /><input readOnly value={user.email} className={c} />
    <button disabled={busy} className="btn btn-warning w-full">{busy ? "Adding..." : "Add Book"}</button></form>);
}
export default () => <PrivateRoute title="Add Book"><Form /></PrivateRoute>;
