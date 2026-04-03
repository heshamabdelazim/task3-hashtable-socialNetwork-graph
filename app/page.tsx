"use client";
import Graph from "./Components/Graph";
import { hashTable_instance } from "./classes/HashTable";
import { useRef, useState } from "react";
import Profile from "./classes/Profile.ts";

export default function Home() {
  const [profiles, setProfiles] = useState<[]>(hashTable_instance.toArray);
  const nameInput = useRef(null);
  const idInput = useRef(null);
  const relations: [number, number][] = hashTable_instance.getRelations();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nameInput.current.value || !idInput.current.value) return alert("Please enter both name and ID");
    console.log(nameInput.current.value);
    const theProfile = new Profile(idInput.current.value, nameInput.current.value);
    hashTable_instance.set(idInput.current.value, theProfile);
    setProfiles(old => [...old, theProfile]);
    nameInput.current.value = "";
    idInput.current.value = "";
    nameInput.current.focus();
  }
  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-zinc-50 font-sans">
      <h1>Social Graph</h1>
      <form className="flex flex-col">
        <input type="text" placeholder="Enter name" ref={nameInput} />
        <input type="number" placeholder="Enter ID" ref={idInput} />
        <button className="bg-lime-300" onClick={handleSubmit}>insert to the HashTable</button>
      </form>
      <Graph profiles={profiles} relations={relations} />

    </div>
  );
}
