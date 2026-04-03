import Profile from "./Profile.ts"
import SocialGraph from "./SocialGraph.ts";


export class HashTable {
  private size: number;
  private count: number;
  private buckets: Array<Array<[number, Profile]>>;
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
  public get(key: number): Profile | undefined {
    const idx = this.hash(key);
    const selectedBucket = this.buckets[idx]; // [["999", "Alice"], ["123", "Hesham"]]
    const pair = selectedBucket.find((p) => p[0] === key);
    return pair ? pair[1] : undefined;
  }

  public getAdjacencyList() {
    return SocialGraph.create_adjacencyList(this.toArray)
  }

  public getRelations() {
    return SocialGraph.create_relations(this.getAdjacencyList())
  }
}

export const hashTable_instance = new HashTable(13);

hashTable_instance.set(123, "hesham");
hashTable_instance.set(999, "osama");
hashTable_instance.set(303, "ali");
hashTable_instance.set(10, "omar");
hashTable_instance.set(70, "mohamed");
hashTable_instance.set(80, "ahmed");

hashTable_instance.addAdjacent(123, [999, 303, 10]);
hashTable_instance.addAdjacent(999, [123, 70, 80]);
hashTable_instance.addAdjacent(303, [123, 999, 70, 80]);
hashTable_instance.addAdjacent(10, [123, 999, 303, 70, 80]);
hashTable_instance.addAdjacent(70, [123, 999, 303, 10, 80]);
hashTable_instance.addAdjacent(80, [123, 999, 303, 10, 70]);

console.log(hashTable_instance.toArray);

const myAdjacent = SocialGraph.create_adjacencyList(hashTable_instance.toArray);