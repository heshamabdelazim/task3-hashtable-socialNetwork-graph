"use client";
import Graph from "./Components/Graph";
import { HashTable, profile } from "./classes/HashTable";
import { useRef, useState } from "react";

export default function Home() {
  const [profiles, setProfiles] = useState<profile[]>([{ id: 0, name: "Parent", cx: 600, cy: 70 }]);
  const nameInput = useRef(null);
  const idInput = useRef(null);
  const x = new HashTable(13);
  const relations: [number, number][] = [[1,2], [1,3], [1,4], [2,5], [2,6], [3,7], [3,8], [4,9], [4,10]];

  const handleSubmit = (e) => { 
    e.preventDefault();
    if(!nameInput.current.value || !idInput.current.value) return alert("Please enter both name and ID");
    console.log(nameInput.current.value);
    const theProfile = {id: idInput.current.value, name: nameInput.current.value};
    x.set(idInput.current.value, theProfile);
    setProfiles(old=>[...old, ...x.toArray]);
    nameInput.current.value = "";
    idInput.current.value = "";
  }
  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-zinc-50 font-sans">
      <form className="flex flex-col">
        <input type="text" placeholder="Enter name" ref={nameInput} />
        <input type="number" placeholder="Enter ID" ref={idInput} />
        <button className="bg-lime-300" onClick={handleSubmit}>insert to the HashTable</button>
      </form>
      <Graph profiles={profiles} relations={relations} />

    </div>
  );
}
