import React from 'react'

function MyLine({id, x1, y1, x2, y2}) {
  return (
        <line
          key={`line-${id}`}
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke="black"
          strokeWidth="2"
        />
  )
}

export default MyLine
