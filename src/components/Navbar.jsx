import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { FilmStrip, MagnifyingGlass } from "phosphor-react";

export function Navbar() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) return;

    navigate(`/search?q=${search}`);
    setSearch("");
  };

  return (
    <nav id="sidebar" className="flex justify-between items-center py-4">
      <h2>
        <Link
          to="/"
          className="flex items-center gap-1 text-red-600 hover:text-red-500 transition-colors"
        >
          <FilmStrip size={24} weight="thin" />
          <p className="font-bold text-sm logo">MovieTape</p>
        </Link>
      </h2>
      <form
        className="flex gap-2 bg-zinc-800 px-4 py-3 rounded-lg text-zinc-400"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          placeholder="Find a movie"
          className="bg-transparent text-sm outline-none focus-within:text-zinc-200"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
        <button type="submit">
          <MagnifyingGlass size={16} />
        </button>
      </form>
    </nav>
  );
}
