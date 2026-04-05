import Profile from "./Profile.ts";

class SocialGraph {

    constructor() { }
    static create_adjacencyList(profiles: Profile[]) {
        // [{id:123, name: "Hesham", adjacentList:[999, 303, 10]}, ...]
        let adjacentList: { [key: number]: number[] } = {};
        for (const prof of profiles) {
            adjacentList[prof["id"]] = prof.adjacentList;
        }
        return adjacentList;
    }
    // {[key:number]: number[]}[]
    static create_relations(adjacentList: { [key: number]: number[] }[]): [number, number][] {
        const relations: [number, number][] = [] // to create [[1,2], [3,4], ...] (this is the return)
        const allKeys = Object.keys(adjacentList);
        console.log(allKeys); //[ '10', '70', '80', '123', '303', '999']
        const indexedKeys: { [key: string]: number } = {};
        for (let i = 0; i < allKeys.length; i++) {
            indexedKeys[allKeys[i]] = i + 1;
        }
        //now we have indexedKeys = { '10': 1, '70': 2, '80': 3, '123': 4, '303': 5, '999': 6 }
        for (const key of allKeys) {
            for (const neighbor of adjacentList[key]) {
                relations.push([indexedKeys[key], indexedKeys[neighbor]])
            }
        }
        return relations;
    }
    public BFS(adjacentList, start, handle_react_node) {
        const queue = [start]
        const visited = new Set();

        while (queue.length > 0) {
            const node = queue.shift();

            if (!visited.has(node)) {
                queue.push(...adjacentList[node]);
                console.log("Now We Proceed the node ", node)
                console.log("we pushed into queue", queue)
                // handle_react_node()
                visited.add(node);
                console.log("and now the current node became visited", visited)
                console.log("An iteration Done---------------")
                visited.add(node);
            }
        }

    }
    public DFS(adjacentList, start) {
        const stack = [start];
        const visited = new Set();
        while (stack.length > 0) {
            const node = stack.pop();
            if (!visited.has(node)) {
                stack.push(...adjacentList[node])
                console.log("Now We Proceed the node ", node)
                console.log("we pushed into stack", stack)
                // handle_react_node()
                visited.add(node);
                console.log("and now the current node became visited", visited)
                console.log("An iteration Done---------------")
            }
        }

    }
}

export default SocialGraph;


const adjacentList = {
    '10': [123, 999, 303, 70, 80],
    '70': [123, 999, 303, 10, 80],
    '80': [123, 999, 303, 10, 70],
    '123': [999, 303, 10],
    '303': [123, 999, 70, 80],
    '999': [123, 70, 80]
}

// const x = new SocialGraph();
// x.BFS(adjacentList, 123);
// const profiles = [{ id: 123, name: "hesham", adjacentList: [999, 303, 10] }, { id: 999, name: "osama", adjacentList: [123, 70, 80] }, { id: 303, name: "ali", adjacentList: [123, 999, 70, 80] }, { id: 10, name: "omar", adjacentList: [123, 999, 303, 70, 80] }, { id: 70, name: "mohamed", adjacentList: [123, 999, 303, 10, 80] }, { id: 80, name: "ahmed", adjacentList: [123, 999, 303, 10, 70] }]
// console.log(SocialGraph.create_adjacencyList(profiles))
console.log(SocialGraph.create_relations(adjacentList));
/* relations output
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





