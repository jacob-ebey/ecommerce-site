export const listReducer = {
  set: (_, items) => items || [],
  clear: () => [],
  updateAt: (currentList, index, entry) => [...currentList.slice(0, index), entry, ...currentList.slice(index + 1)],
  remove: (currentList, index) => [...currentList.slice(0, index), ...currentList.slice(index + 1)],
  push: (currentList, ...entries) => [...currentList, ...entries],
  filter: (currentList, fn) => currentList.filter(fn),
  sort: (currentList, fn) => [...currentList].sort(fn),
};


