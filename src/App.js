import Menu from './Menu.js'
import FileSystem from './FileSystem.js';
import TextOutput from "./TextOutput";
import TextInput from "./TextInput";
import BottomBar from './BottomBar'
import { useState, Suspense } from "react";
import './index.css'
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { refreshActions} from './store/Refresh'
import {useDispatch} from 'react-redux'

function App() {

  const [text, setText] = useState("")
  const [fileSystemIsVisible, setFileSystemIsVisible] = useState(true)
  const refresh = useSelector(state => state.refresh.refresh);
  const activeFile = useSelector(state => state.activeFile.activeFile);
  

  useEffect(() => {
    (() => document.querySelector('textarea'))().value = localStorage.getItem(activeFile);
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
    localStorage.setItem(activeFile, text)
    dispatch(refreshActions.toggleRefresh())
  }

  const textHandler = text => {
    setText(text)
  }

  let words = text.split(/\s+/).filter(char => /[a-zA-Z]/.test(char)).length;
  let lines = text.split(/\r\n|\r|\n/).length


  return (
    <div className="App">
      <Suspense>
        <Menu save={saveHandler} toggle={toggleFileSystemhandler} text={text} active={activeFile}/>
      </Suspense>
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
