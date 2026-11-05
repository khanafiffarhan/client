"use client";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { BookCard, Spinner, Title, H2 } from "@/components/Bits";
export default function Books() {
  const [books, setBooks] = useState(null);
  useEffect(() => { api("/books").then(setBooks).catch(() => setBooks([])); }, []);
  return (<div className="max-w-6xl mx-auto px-4 py-10"><Title t="All Books" /><H2>All Books</H2>
    {!books ? <Spinner /> : !books.length ? <p className="text-center">No books yet. Be the first to add one!</p> :
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">{books.map((b) => <BookCard key={b._id} b={b} />)}</div>}</div>);
}
