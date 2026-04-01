import Profile from "./Profile.ts"
import SocialGraph from "./SocialGraph.ts";


export class HashTable {
  size: number;
  count: number;
  buckets: Array<Array<[number, Profile]>>;
  toArray: Profile[];
  constructor(size: number = 10) {
    this.buckets = new Array(size).fill(null).map(() => []);
    // this.buckets = new Array(size).fill([]);
    this.size = size;
    this.count = 0;
    this.toArray = []; //for react mapping
  }

  // Hash Function that returns an index
  hash(key: number) {
    return key % this.size;
  }
  // Insert O(1)
  set(key: number, value: string) {
    const idx = this.hash(key);
    console.log(`Hashing key "${key}" to index ${idx}`);
    const bucket = this.buckets[idx];
    const existing = bucket.find((p) => p[0] === key);
    if (existing) {
      const profile: Profile = new Profile(key, value)
      existing[1] = profile;
      this.toArray = this.toArray.map((p) =>
        profile.id === key ? profile : p,
      );
    } else {
      const profile: Profile = new Profile(key, value)
      bucket.push([key, profile]);
      this.count++;
      this.toArray.push(profile);
    }
  }

  addAdjacent(key: number, adjacent: number[]) {
    const idx = this.hash(key);
    const bucket = this.buckets[idx]
    const existing = bucket.find(p => p[0] === key);
    if (existing) {
      existing[1].adjacentList.push(...adjacent);

    } else {
      throw new Error("the key is not found");
    }
  }

  // Search O(1)
  get(key: number): Profile | undefined {
    const idx = this.hash(key);
    const selectedBucket = this.buckets[idx]; // [["999", "Alice"], ["123", "Hesham"]]
    const pair = selectedBucket.find((p) => p[0] === key);
    return pair ? pair[1] : undefined;
  }
}

export const x = new HashTable(13);

x.set(123, "hesham");
x.set(999, "osama");
x.set(303, "ali");
x.set(10, "omar");
x.set(70, "mohamed");
x.set(80, "ahmed");

x.addAdjacent(123, [999, 303, 10]);
x.addAdjacent(999, [123, 70, 80]);
x.addAdjacent(303, [123, 999, 70, 80]);
x.addAdjacent(10, [123, 999, 303, 70, 80]);
x.addAdjacent(70, [123, 999, 303, 10, 80]);
x.addAdjacent(80, [123, 999, 303, 10, 70]);

console.log(x.toArray);

const myAdjacent = SocialGraph.create_adjacencyList(x.toArray);
console.log(myAdjacent)