import Menu from './Components/Menu.js'
import FileSystem from './Components/FileSystem.js';
import TextInput from './Components/TextInput'
import TextOutput from './Components/TextOutput'
import BottomBar from './Components/BottomBar'
import { useState } from "react";
import './index.css'
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { activeFileActions, refreshActions} from './store/ReduxStateSlices'
import {useDispatch} from 'react-redux'

function App() {

  const [text, setText] = useState("")
  const [fileSystemIsVisible, setFileSystemIsVisible] = useState(true)
  const refresh = useSelector(state => state.refresh.refresh);
  const activeFile = useSelector(state => state.activeFile.activeFile);
  const activeFolder = useSelector(state => state.activeFile.activeFolder)

  
  useEffect(() => {
    (() => document.querySelector('textarea'))().value = JSON.parse(localStorage.getItem('root'))[activeFolder][activeFile];
    dispatch(refreshActions.toggleRefresh())
  }, [])

  useEffect(() => {
    if ((() => document.querySelector('textarea'))().value !== text) {
      setText((() => document.querySelector('textarea'))().value)
    }
  }, [refresh, text])

  const toggleFileSystemhandler = () => {
    setFileSystemIsVisible(prev => {
      return !prev;
    })
  }
  
  const dispatch = useDispatch();
  const saveHandler = () => {
    let root = JSON.parse(localStorage.getItem('root'))
    root[activeFolder][activeFile] = text;
    localStorage.setItem('root', JSON.stringify(root))
    dispatch(activeFileActions.changeIsSaved({bool: true}))
    dispatch(refreshActions.toggleRefresh())
  }

  const textHandler = text => {
    setText(text)
  }

  const words = text.split(/\s+/).filter(char => /[a-zA-Z]/.test(char)).length;
  const lines = text.split(/\r\n|\r|\n/).length


  return (
    <div className="App">
      <Menu save={saveHandler} toggle={toggleFileSystemhandler} text={text} active={activeFile}/>
      <div className="main-container">
        {fileSystemIsVisible ? <FileSystem text={text}/> : null}
        <TextInput handleText={textHandler}/>
        <TextOutput text={text} />
      </div>
      <BottomBar lines={lines} words={words}/>
    </div>
  );
}

export default App;
