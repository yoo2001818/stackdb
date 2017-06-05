// @flow

export type Key = string | number;

// Storage object governs every persisting objects - table metadatas, indexes,
// data entries, histories, etc.
// Note that storage object is completely asynchronous - it utilizes Promise
// extensively.
// Even though storage object manages every persisting objects, writing data
// would be processed by upper objects.
export interface Storage<Address> {
  // Table metadatas. They can be stored in a some kind of hash table - there
  // are not so much data, and they can reside on memory.
  // "null" means the root metadata object.
  // TODO Since the table metadata's format is not decided yet, we'll use JSONs
  // for this.
  getMetadata(key: ?string): Promise<?Object>;
  setMetadata(key: ?string, data: ?Object): Promise<void>;
  // Indexes. Although stackdb uses B+Tree primarily, some storage formats,
  // like IndexedDB should use their own native indexing method. For this
  // reason, the Storage object should include their own indexing 'drivers',
  // exposing simple methods to the user.
  // Also note that, mutable methods should be used after updating bookkeeping
  // entries.
  // Keys may use different formats, however, strings and numbers must be
  // supported.
  // Returned address should point to entries table, which stores history
  // / checkpoint indexes.
  // TODO Upper layer should provide comparator, hashing, encoding/decoding
  // mechanism
  getIndex(key: ?string): Promise<?IndexStorage<Address>>;
  createIndex(key: ?string): Promise<?IndexStorage<Address>>;
  removeIndex(key: ?string): Promise<void>;
  // Entries.
  // Histories. (Bookkeeping)
}

export interface IndexStorage<Address> {
  get(key: Key): Promise<?Address>;
  set(key: Key, address: Address): Promise<void>;
  remove(key: Key): Promise<void>;
  iterator(key: ?Key): Iterator<Promise<?Address>>;
  reverseIterator(key: ?Key): Iterator<Promise<?Address>>;
}
