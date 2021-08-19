import { createSlice, configureStore } from '@reduxjs/toolkit'
import initialFileMarkdown from '../initialFiles/initial-file';

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

if (!localStorage.getItem('root')) {
  const defaultRoot = {
    defaultFolder: {
      defaultFile: initialFileMarkdown
    }
  }
  localStorage.setItem('root', JSON.stringify(defaultRoot))
}
const rootObject = JSON.parse(localStorage.getItem('root'))
const folders = Object.keys(rootObject)
const file = (Object.keys(rootObject[folders[0]]))[0]

let root = JSON.parse(localStorage.getItem('root'));
const folderKeys = Object.keys(root);
let currentFolder;
folderKeys.forEach(key => {
  if (file in root[key]) {
    currentFolder = key;
  }
})

const activeFileInitialValue = {
  activeFile: file,
  autoSaveIsOn: false,
  activeFolder: currentFolder,
  isSaved: true
}
const activeFileSlice = createSlice({
  name: 'activeFile',
  initialState: activeFileInitialValue,
  reducers: {
    changeActiveFile(state, action) {
      state.activeFile = action.payload.name;
      let activeFolder;
      let root = JSON.parse(localStorage.getItem('root'));
      const folderKeys = Object.keys(root);
      folderKeys.forEach(key => {
        if (state.activeFile in root[key]) {
          activeFolder = key;
        }
      })
      state.activeFolder = activeFolder;
    },
    changeAutoSave(state) {
      state.autoSaveIsOn = !state.autoSaveIsOn;
    },
    changeIsSaved(state, action) {
      state.isSaved = action.payload.bool;
    }
  }
});


const isDraggedInitialValue = {
  isDragged: false
}
const isDraggedSlice = createSlice({
  name: 'isDragged',
  initialState: isDraggedInitialValue,
  reducers: {
    isDraggedTrue(state) {
      state.isDragged = true
    },
    isDraggedFalse(state) {
      state.isDragged = false
    }
  }
});


const store = configureStore({
  reducer: {
    refresh: refreshSlice.reducer,
    activeFile: activeFileSlice.reducer,
    isDragged: isDraggedSlice.reducer
  }
})

export const refreshActions = refreshSlice.actions;
export const activeFileActions = activeFileSlice.actions;
export const isDraggedActions = isDraggedSlice.actions

export default store;