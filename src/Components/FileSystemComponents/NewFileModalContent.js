import { useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { refreshActions, activeFileActions } from '../../store/ReduxStateSlices'
import { Button } from '@material-ui/core';
import { Input } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { useRef } from 'react';


const NewFileModalContent = (props) => {
  const activeFolder = useSelector(state => state.activeFile.activeFolder)
  const activeFile = useSelector(state => state.activeFile.activeFile)
  const dispatch = useDispatch();
  const inputRef = useRef();

  const checkIsEnter = e => {
    if (e.keyCode === 13) {
      e.target.parentElement.parentElement.querySelector("button").click();
    }
  }

  useEffect(() => {
    document.querySelector('.newfile-modal-container input').focus();
  }, []);

  const addNewFileHandler = e => {


    // checking if such name already exists
    const input = inputRef.current.value;
    let allNames = [];
    const rootObj = JSON.parse(localStorage.getItem('root'));
    const allFolderNames = Object.keys(rootObj);
    allNames = [...allFolderNames];
    for (let i = 0; i < allFolderNames.length; i++){
      const allFileNames = Object.keys(rootObj[allFolderNames[i]])
      allNames = [...allNames, ...allFileNames]
    }


    if (props.folder) {
      // adding new folder
      if (input !== '' && !allNames.includes(input)) {
        let root = JSON.parse(localStorage.getItem('root'));
        const defaultFileName = input + '.md';
        root[input] = {};
        if (allNames.includes(defaultFileName)) {
          alert('select different name');
        } else {
          root[input][defaultFileName] = '*happy typing!*';
          document.querySelector('textarea').value = root[input][defaultFileName]
          localStorage.setItem('root', JSON.stringify(root))
          dispatch(activeFileActions.changeActiveFile({name: defaultFileName}))
          dispatch(refreshActions.toggleRefresh())  
          props.close()
          document.querySelector('textarea').focus();
        }
      } else {
        if (input === '') {
          alert('You must enter some name!')
        } else {
          alert('File or folder with such name already exists!');
        }
        inputRef.current.focus()
        inputRef.current.selectionStart = 0;
        inputRef.current.selectionEnd = input.length;
      }
    } else {
      // adding new file
      if (input !== '' && !allNames.includes(input)) {
        let root = JSON.parse(localStorage.getItem('root'));
        root[activeFolder][input] = '**new file created**';
        localStorage.setItem('root', JSON.stringify(root))
        document.querySelector('textarea').value = root[activeFolder][input];
        dispatch(activeFileActions.changeActiveFile({name: input}))
        dispatch(refreshActions.toggleRefresh())
        props.close()
        document.querySelector('textarea').focus();
      } else {
        if (input === '') {
          alert('You must enter some name!')
        } else {
          alert('File or folder with such name already exists!');
        }
        inputRef.current.focus()
        inputRef.current.selectionStart = 0;
        inputRef.current.selectionEnd = input.length;
      }
    }
  }


  return <div className='newfile-modal-container'>
    <label>Name of file:</label>
    <Input style={{margin: '0 10px'}} inputRef={inputRef} color={ props.folder ? 'secondary' : 'primary'} required onKeyUp={checkIsEnter} type="text" placeholder="enter name ..."/>
    <Button color={ props.folder ? 'secondary' : 'primary'} disableElevation variant='contained' onClick={addNewFileHandler}>Add</Button>
  </div>
}

export default NewFileModalContent