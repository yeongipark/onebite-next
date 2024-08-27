"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Searchbar() {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const onSubmit = () => {
    if (search) {
      router.push(`/search?q=${search}`);
    }
  };

  const onEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSubmit();
    }
  };

  return (
    <div>
      <input onKeyDown={onEnter} type="text" onChange={onChangeSearch} />
      <button onClick={onSubmit}>검색</button>
    </div>
  );
}
