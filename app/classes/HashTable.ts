export type profile = {
  id: number;
  name: string;
};

export class HashTable {
  size: number;
  count: number;
  buckets: Array<Array<[number, profile]>>;
  toArray: profile[];
  constructor(size: number = 10) {
    this.buckets = new Array(size).fill(null).map(() => []);
    // this.buckets = new Array(size).fill([]);
    this.size = size;
    this.count = 0;
    this.toArray = [];
  }

  // Hash Function that returns an index
  hash(key: number) {
    return key % this.size;
  }
  // Insert O(1)
  set(key: number, value: profile) {
    const idx = this.hash(key);
    console.log(`Hashing key "${key}" to index ${idx}`);
    const bucket = this.buckets[idx];
    const existing = bucket.find((p) => p[0] === key);
    if (existing) {
      existing[1] = value;
      this.toArray = this.toArray.map((profile) =>
        profile.id === key ? value : profile,
      );
    } else {
      bucket.push([key, value]);
      this.count++;
      this.toArray.push(value);
    }
  }

  // Search O(1)
  get(key: number): profile | undefined {
    const idx = this.hash(key);
    const selectedBucket = this.buckets[idx]; // [["name", "Alice"], ["location", "Cairo"]]
    const pair = selectedBucket.find((p) => p[0] === key);
    return pair ? pair[1] : undefined;
  }
}
