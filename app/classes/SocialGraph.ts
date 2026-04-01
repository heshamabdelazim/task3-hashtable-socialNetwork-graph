/*
class SocialGraph{
    # static create_adjacencyList
            input: [{id:123, name: "Hesham", adjacentList:[999, 303, 10]}, ...]
            output: Adjancency List 

    # static edges_relations
            input: [{id:123, name: "Hesham", adjacentList:[999, 303, 10]}, ....]
            output: relations

    # function bfs & dfs
}
*/

import Profile from "./Profile.ts";

class SocialGraph {

    constructor() {

    }
    static create_adjacencyList(profiles: Profile[]) {
        let newArr = profiles.map(p => {
            const adj: { [key: number]: number[] } = {}
            adj[p.id] = p.adjacentList;
            return adj
        })

        return newArr;
    }
    // {[key:number]: number[]}[]
    static create_relations(adjacentList: { [key: number]: number[] }[]): [number, number][] {
        let allKeys: { [key: number]: number } = {};
        let relations: [number, number][] = []
        for (let k = 0; k < adjacentList.length; k++) {  //within this loop, I 
            const keyName = Object.keys(adjacentList[k])[0];
            allKeys[keyName] = k + 1 //to make (allKeys) => {id: order_in_arr} {'123': 1, '999': 2, '303': 3,  '10': 4, '70': 5, '80': 6 }
        }
        for (let i = 0; i < adjacentList.length; i++) {
            const keyName = Object.keys(adjacentList[i])[0];
            for (let j = 0; j < adjacentList[i][keyName].length; j++) {
                const neighbor = adjacentList[i][keyName][j];
                relations.push([i + 1, allKeys[neighbor]])
            }
        }
        console.log(allKeys)
        return relations;
    }
}

export default SocialGraph;



const adjacentList = [
    { '123': [999, 303, 10] },
    { '999': [123, 70, 80] },
    { '303': [123, 999, 70, 80] },
    { '10': [123, 999, 303, 70, 80] },
    { '70': [123, 999, 303, 10, 80] },
    { '80': [123, 999, 303, 10, 70] }
]

console.log(SocialGraph.create_relations(adjacentList));
/* output
[
  [ 1, 2 ], [ 1, 3 ], [ 1, 4 ],
  [ 2, 1 ], [ 2, 5 ], [ 2, 6 ],
  [ 3, 1 ], [ 3, 2 ], [ 3, 5 ],
  [ 3, 6 ], [ 4, 1 ], [ 4, 2 ],
  [ 4, 3 ], [ 4, 5 ], [ 4, 6 ],
  [ 5, 1 ], [ 5, 2 ], [ 5, 3 ],
  [ 5, 4 ], [ 5, 6 ], [ 6, 1 ],
  [ 6, 2 ], [ 6, 3 ], [ 6, 4 ],
  [ 6, 5 ]
]
*/