"use client";
import React, { useState } from 'react'

function MyNode({ id, cx, cy, label }) {
  let [isVisited, setIsVisited] = useState(false);
  return (
    <g key={`profile-${id}`}>
      <circle cx={cx} cy={cy} r="50" fill={isVisited ? "lightgreen" : "lightgray"} />
      <text x={cx} y={cy + 5} textAnchor="middle" fontSize="15">
        {label}
      </text>
    </g>
  )
}

export default MyNode
