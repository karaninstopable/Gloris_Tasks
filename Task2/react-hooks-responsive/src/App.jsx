import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { BOOKS } from "./data.js";
import BookCard from "./components/BookCard.jsx";

export default function App() {
  /* ---------- useState: values that change and re-render the UI ---------- */
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState("title");
  const [favs, setFavs] = useState([]); // array of book ids
  const [width, setWidth] = useState(window.innerWidth);

  /* ---------- useRef: reference to a DOM element (no re-render) ---------- */
  const searchRef = useRef(null);

  /* ---------- useEffect #1: run once on mount, clean up on unmount ---------- */
  useEffect(() => {
    const onResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", onResize);
    searchRef.current?.focus(); // focus the search box on load
    return () => window.removeEventListener("resize", onResize); // cleanup
  }, []);

  /* ---------- useEffect #2: runs whenever `favs` changes ---------- */
  useEffect(() => {
    document.title = `Library (${favs.length} saved)`;
  }, [favs]);

  /* ---------- useMemo: only re-filter/sort when its inputs change ---------- */
  const visibleBooks = useMemo(() => {
    const q = query.trim().toLowerCase();
    return BOOKS.filter(
      (b) => b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q)
    ).sort((a, b) =>
      sortBy === "title" ? a.title.localeCompare(b.title) : a[sortBy] - b[sortBy]
    );
  }, [query, sortBy]);

  /* ---------- useCallback: keep the same function identity between renders,
       so memoized <BookCard /> children don't re-render needlessly ---------- */
  const toggleFav = useCallback((id) => {
    setFavs((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }, []);

  const clearSearch = () => {
    setQuery("");
    searchRef.current.focus(); // useRef used inside an event handler
  };

  const device = width < 600 ? "Mobile" : width < 900 ? "Tablet" : "Desktop";

  return (
    <div className="app">
      {/* Flexbox header: row on desktop, column on mobile (see media queries) */}
      <header className="header">
        <h1>Library</h1>
        <span className="badge">
          {device} · {width}px
        </span>
        <span className="badge badge-alt">{favs.length} saved</span>
      </header>

      {/* Flexbox toolbar with wrapping */}
      <section className="toolbar">
        <input
          ref={searchRef}
          type="search"
          placeholder="Search title or author…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="title">Sort: Title</option>
          <option value="price">Sort: Price</option>
          <option value="rating">Sort: Rating</option>
        </select>
        <button className="btn" onClick={clearSearch}>Clear</button>
      </section>

      <main className="grid">
        {visibleBooks.length === 0 && <p className="muted">No books match "{query}".</p>}
        {visibleBooks.map((book) => (
          <BookCard
            key={book.id}
            book={book}
            isFav={favs.includes(book.id)}
            onToggleFav={toggleFav}
          />
        ))}
      </main>
    </div>
  );
}
