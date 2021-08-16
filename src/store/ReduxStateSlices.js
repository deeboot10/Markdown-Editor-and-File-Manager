import { createSlice, configureStore } from '@reduxjs/toolkit'


// This state is used just to refresh whole app if some component demands changes
const initialValue = {
  refresh: 0
}
const refreshSlice = createSlice({
  name: 'refresh',
  initialState: initialValue,
  reducers: {
    toggleRefresh(state) {
      state.refresh++;
    }
  }
});



// Keeping track of what is active file so app can react to that
// And I am going to add autosave to the same slice
let arrayOfKeys = Object.keys(localStorage);
arrayOfKeys = arrayOfKeys.filter(name => 
  name !== 'foldersContainer'  
)

const activeFileInitialValue = {
  activeFile: arrayOfKeys[0],
  autoSaveIsOn: false
}
const activeFileSlice = createSlice({
  name: 'activeFile',
  initialState: activeFileInitialValue,
  reducers: {
    changeActiveFile(state, action) {
      state.activeFile = action.payload.name;
    },
    changeAutoSave(state) {
      state.autoSaveIsOn = !state.autoSaveIsOn;
    }
  }
});


const store = configureStore({
  reducer: {
    refresh: refreshSlice.reducer,
    activeFile: activeFileSlice.reducer
  }
})

export const refreshActions = refreshSlice.actions;
export const activeFileActions = activeFileSlice.actions;

export default store;