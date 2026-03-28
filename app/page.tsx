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
        <button onClick={handleSubmit}>insert to the hashtable</button>
      </form>
      <Graph profiles={profiles} relations={relations} />
      <svg width={600} height={600} style={{border:"3px solid green"}}>
        <circle cx={200} cy={555} r={40} />
        <line x1={200} y1={50} x2={200} y2={300} stroke="black" strokeWidth="2"/>
      </svg>
    </div>
  );
}
