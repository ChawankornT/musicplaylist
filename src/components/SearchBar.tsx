"use client";

import { useState } from "react";

export default function SearchBar({
  onSearch,
}: {
  onSearch: (name: string) => void;
}) {
  const [name, setName] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSearch(name);
      }}
      className="flex gap-2"
    >
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="ค้นหาเพลงหรือศิลปิน"
        className="input px-3 py-2 border border-gray-300 rounded-md w-full bg-white"
      />
      <button className="btn px-4 py-2 rounded-md bg-green-500 cursor-pointer">
        ค้นหา
      </button>
    </form>
  );
}
