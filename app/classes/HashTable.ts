class HashTable {
  constructor(size = 10) {
    this.buckets = new Array(size).fill(null).map(() => []);
    this.size = size;
    this.count = 0;
  }

  // Hash Function
  hash(key) {
    let hash = 0;
    for (let char of String(key)) {
      hash = (hash + char.charCodeAt(0)) % this.size;
    }
    return hash;
  }

  // Insert O(1)
  set(key, value) {
    const idx = this.hash(key);
    const bucket = this.buckets[idx];
    const existing = bucket.find((p) => p[0] === key);
    if (existing) existing[1] = value;
    else {
      bucket.push([key, value]);
      this.count++;
    }
  }

  // Search O(1)
  get(key) {
    const idx = this.hash(key);
    const pair = this.buckets[idx].find((p) => p[0] === key);
    return pair ? pair[1] : undefined;
  }
}

const x = new HashTable();
console.log(x.hash("hello"));
console.log(x.hash("hi"));
console.log(x);
