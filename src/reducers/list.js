export const listReducer = (selector) => ({
  set: (_, items) => items || [],
  clear: () => [],
  updateAt: (state, index, entry) => [...selector(state).slice(0, index), entry, ...state.slice(index + 1)],
  remove: (state, index) => [...selector(state).slice(0, index), ...state.slice(index + 1)],
  push: (state, ...entries) => [...selector(state), ...entries],
  filter: (state, fn) => selector(state).filter(fn),
  sort: (state, fn) => [...selector(state)].sort(fn),
});


