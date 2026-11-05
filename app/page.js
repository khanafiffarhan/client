"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css"; import "swiper/css/pagination";
import { motion } from "framer-motion";
import { api } from "@/lib/api";
import { BookCard, Spinner, Title, H2 } from "@/components/Bits";

const slides = [
  ["Find your next story", "Browse a growing shelf of fiction, science, history and kids' books.", "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=1600"],
  ["Borrow for 7 days", "Pick a book, confirm, and read at your own pace. Return it when you're done.", "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1600"],
  ["Share your own books", "Add books to the community library and help others discover them.", "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=1600"],
];
export default function Home() {
  const [books, setBooks] = useState(null);
  useEffect(() => { api("/books?limit=6").then(setBooks).catch(() => setBooks([])); }, []);
  return (<>
    <Title t="Home" />
    <Swiper modules={[Autoplay, Pagination]} autoplay={{ delay: 4000 }} pagination={{ clickable: true }} loop>
      {slides.map(([t, p, img]) => (<SwiperSlide key={t}>
        <div className="h-[420px] bg-cover bg-center flex items-center justify-center text-center text-white" style={{ backgroundImage: `linear-gradient(#0009,#0009),url(${img})` }}>
          <div className="max-w-xl px-4"><h1 className="text-4xl md:text-5xl font-bold mb-3">{t}</h1><p className="mb-5">{p}</p>
            <Link href="/books" className="btn btn-warning">Browse Books</Link></div></div></SwiperSlide>))}
    </Swiper>
    <section className="max-w-6xl mx-auto px-4 mt-16"><H2>New Arrivals</H2>
      {!books ? <Spinner /> : <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map((b) => <motion.div key={b._id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}><BookCard b={b} /></motion.div>)}</div>}
      <div className="text-center mt-8"><Link href="/books" className="btn btn-warning">See All Books</Link></div></section>
    <section className="max-w-6xl mx-auto px-4 mt-16"><H2>How Borrowing Works</H2>
      <div className="grid md:grid-cols-3 gap-6 text-center">
        {[["1. Create an account", "Register free or continue with Google."], ["2. Borrow a book", "Open any book and confirm. It's yours for 7 days."], ["3. Return it", "Head to My Borrows and return it so others can read."]].map(([t, p]) =>
          <div key={t} className="card bg-base-200 p-6 h-full"><h3 className="font-bold text-lg mb-2">{t}</h3><p>{p}</p></div>)}</div></section>
    <section className="max-w-6xl mx-auto px-4 mt-16"><H2>Top Categories</H2>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
        {["📖 Fiction", "🔬 Science", "🏛 History", "🧸 Kids", "✨ Others"].map((c) => <Link href="/books" key={c} className="card bg-base-200 hover:bg-warning hover:text-black transition p-6 font-semibold">{c}</Link>)}</div></section>
  </>);
}
