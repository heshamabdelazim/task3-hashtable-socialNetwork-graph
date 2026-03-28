import React, { useRef } from 'react'
import { profile } from '../classes/HashTable';
import MyNode from './MyNode';

function Graph({ profiles, relations }) {
  const positioned_profiles: profileWithPosition[] = generateNodesArr(profiles);
  const relationsArr = generateRelations(relations);

  console.log(positioned_profiles);
  return (
    <svg width="1100" height="700" style={{ border: '1px solid #ccc' }}>
      {positioned_profiles.map((profile, i) => (
        <MyNode key={profile.id} id={profile.id} cx={profile.cx} cy={profile.cy} label={profile.name} />
      ))}
      
      {/* Lines: Rendered first so they stay behind the circles */}
      {/* {children.map((child, i) => (
        <line
          key={`line-${i}`}
          x1={parent.x}
          y1={parent.y}
          x2={child.x}
          y2={child.y}
          stroke="black"
          strokeWidth="2"
        />
      ))}

      
      <circle cx={parent.x} cy={parent.y} r="30" fill="royalblue" />
      <text x={parent.x} y={parent.y + 5} textAnchor="middle" fill="white" fontSize="12">
        {parent.label}
      </text>

      {children.map((child, i) => (
        <g key={`child-${i}`}>
          <circle cx={child.x} cy={child.y} r="25" fill="lightgreen" />
          <text x={child.x} y={child.y + 5} textAnchor="middle" fontSize="10">
            {child.label}
          </text>
        </g>
      ))} */}
    </svg>
  );
}
type profileWithPosition = profile & {cx: number, cy: number};
function generateNodesArr(profiles:profile[]) { 
    // generating a new profiles with cx and cy
    let rowNumber = 1;
    let colNumber = 1;
    let distance=200
    profiles?.map((profile, index) => { 
      if (colNumber == 5) {
        rowNumber++;
        colNumber = 1;
        profile["cx"] = colNumber * distance;
        profile["cy"] = rowNumber * distance;
        colNumber++;
      } else { 
        profile["cx"] = colNumber * distance;
        profile["cy"] = rowNumber * distance;
        colNumber++;
      }
    })
  return profiles;
  }

function generateRelations(profiles: profile[]) { 
  //to create array of lines
  //[[1,2], [1,3], [1,4], [2,5], [2,6], [3,7], [3,8], [4,9], [4,10]]
  // output is [{x1, y1, x2, y2}, ...]
  // [1,2] =output=> [{x1:200, y1:200, x2:400, y2:200}]
  // [3,7] =output=> [{x1:600, y1:200, x2:600, y2:400}]
  let 
}

export default Graph;

function generatePosition(order:number) { 
  //input 7 =output=> {cx: 3cols*200=(600), cy: 2rows*200=(400)}
  const distance = 200;
  let rowNumber = Math.ceil(order/4);
}




// function Graph() {
// const parent = { x: 200, y: 50, label: "Parent" };
//   const children = [
//     { x: 100, y: 200, label: "Child 1" },
//     { x: 200, y: 200, label: "Child 2" },
//     { x: 300, y: 200, label: "Child 3" },
//   ];

//   return (
//     <svg width="400" height="300" style={{ border: '1px solid #ccc' }}>
//       {/* Lines: Rendered first so they stay behind the circles */}
//       {children.map((child, i) => (
//         <line
//           key={`line-${i}`}
//           x1={parent.x}
//           y1={parent.y}
//           x2={child.x}
//           y2={child.y}
//           stroke="black"
//           strokeWidth="2"
//         />
//       ))}

//       {/* Parent Circle */}
//       <circle cx={parent.x} cy={parent.y} r="30" fill="royalblue" />
//       <text x={parent.x} y={parent.y + 5} textAnchor="middle" fill="white" fontSize="12">
//         {parent.label}
//       </text>

//       {/* Child Circles */}
//       {children.map((child, i) => (
//         <g key={`child-${i}`}>
//           <circle cx={child.x} cy={child.y} r="25" fill="lightgreen" />
//           <text x={child.x} y={child.y + 5} textAnchor="middle" fontSize="10">
//             {child.label}
//           </text>
//         </g>
//       ))}
//     </svg>
//   );
// }

// export default Graph;