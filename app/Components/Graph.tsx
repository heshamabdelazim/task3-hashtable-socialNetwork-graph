import { profile } from '../classes/HashTable';
import MyLine from './MyLine';
import MyNode from './MyNode';

function Graph({ profiles, relations }) {
  const positioned_profiles: profileWithPosition[] = generateNodesArr(profiles);
  const linesArr = generateRelations(relations);
  console.log(positioned_profiles)

  return (
    <svg width="1100" height="700" style={{ border: '3px solid green' }}>
      {/* Lines: Rendered first so they stay behind the circles */}
      {linesArr.map((line, i) => (
        <MyLine
          key={`line-${i}`}
          id={i}
          x1={line[0].cx}
          y1={line[0].cy}
          x2={line[1].cx}
          y2={line[1].cy}
        />
      ))}
      {positioned_profiles.map((profile) => (
        <MyNode key={profile.id} id={profile.id} cx={profile.cx} cy={profile.cy} label={profile.name} />
      ))}
    </svg>
  );
}
const distance = 200

type profileWithPosition = profile & { cx: number, cy: number };
function generateNodesArr(profiles: profile[]) {
  // to make this structure: [{id, name, cx, cy}, ...] to render nodes
  let rowNumber = 1;
  let colNumber = 1;
  profiles?.map((profile) => {
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

function generateRelations(relations: [number, number][]) {
  //to create array of lines
  //[[1,2], ...] =output=> [{x1, y1, x2, y2}, ...]
  // [1,2] =output=> [{x1:200, y1:200, x2:400, y2:200}]
  // [3,7] =output=> [{x1:600, y1:200, x2:600, y2:400}]
  const linesArray = relations.map(relation => {
    const [x, y] = relation;
    return [getNodePosition(x), getNodePosition(y)]
  })
  return linesArray;
}

function getNodePosition(order: number) {
  //input 7 =output=> {cx: 3cols*200=(600), cy: 2rows*200=(400)}
  let colNumber = order % 4 === 0 ? 4 : order % 4;
  let rowNumber = Math.ceil(order / 4);
  return { cx: colNumber * distance, cy: rowNumber * distance };
}

export default Graph;

