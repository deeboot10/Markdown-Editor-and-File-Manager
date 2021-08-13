import { createSlice, configureStore } from '@reduxjs/toolkit'



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



//local storage
let arrayOfKeys = Object.keys(localStorage);
arrayOfKeys = arrayOfKeys.filter(name => 
  name !== 'foldersContainer'  
)

const activeFileInitialValue = {
  activeFile: arrayOfKeys[0]
}
const activeFileSlice = createSlice({
  name: 'activeFile',
  initialState: activeFileInitialValue,
  reducers: {
    changeActiveFile(state, action) {
      state.activeFile = action.payload.name;
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