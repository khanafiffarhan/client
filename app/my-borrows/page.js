"use client";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { api } from "@/lib/api";
import { PrivateRoute, Spinner, H2 } from "@/components/Bits";
const d = (x) => new Date(x).toLocaleDateString();
function Borrows() {
  const [list, setList] = useState(null);
  useEffect(() => { api("/borrows", { auth: true }).then(setList).catch((e) => { toast.error(e.message); setList([]); }); }, []);
  const ret = async (id) => {
    try { await api("/borrows/" + id, { method: "DELETE", auth: true }); setList(list.filter((x) => x._id !== id)); toast.success("Book returned"); }
    catch (e) { toast.error(e.message); }
  };
  if (!list) return <Spinner />;
  return (<div className="max-w-5xl mx-auto px-4 py-10"><H2>My Borrows</H2>
    {!list.length ? <p className="text-center">You haven't borrowed any books.</p> :
      <div className="overflow-x-auto"><table className="table"><thead><tr><th>Image</th><th>Title</th><th>Borrowed</th><th>Return By</th><th></th></tr></thead><tbody>
        {list.map((b) => <tr key={b._id}><td><img src={b.bookImage} className="w-14 h-16 object-cover rounded" /></td><td>{b.bookTitle}</td><td>{d(b.borrowDate)}</td><td>{d(b.returnDate)}</td>
          <td><button className="btn btn-sm btn-warning" onClick={() => ret(b._id)}>Return Book</button></td></tr>)}</tbody></table></div>}</div>);
}
export default () => <PrivateRoute title="My Borrows"><Borrows /></PrivateRoute>;
