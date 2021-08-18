import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { activeFileActions, refreshActions } from '../../store/ReduxStateSlices'
import { Button } from '@material-ui/core';
import { Input } from '@material-ui/core';
import { useRef } from 'react';

const EditModalContent = (props) => {

  const dispatch = useDispatch();
  const activeFile = useSelector(state => state.activeFile.activeFile)
  const inputRef = useRef();

  const checkIsEnter = e => {
    if (e.keyCode === 13) {
      e.target.parentElement.parentElement.querySelector('button').click();
    }
  }


  useEffect(() => {
    document.querySelector(".edit-modal-container input").focus()
  }, []);

  const editCommitHandler = e => {
    const newName = inputRef.current.value;
    console.log(props.name, activeFile)
    let root = JSON.parse(localStorage.getItem('root'));
    const folderKeysArr = Object.keys(root);
    let currentFolder;
    folderKeysArr.forEach(key => {
      if (props.oldName in root[key]) {
        currentFolder = key;
      }
    })
    let content = root[currentFolder][props.oldName];
    delete root[currentFolder][props.oldName]
    root[currentFolder][newName] = content
    localStorage.setItem('root', JSON.stringify(root))
    dispatch(activeFileActions.changeActiveFile({name: newName}))
    dispatch(refreshActions.toggleRefresh())
    document.querySelector('textarea').focus();
    props.close()
  }
  
  return <div className='edit-modal-container'>
    <label>Set new name:</label>
    <Input inputRef={inputRef} style={{margin: '0 10px'}} onKeyUp={checkIsEnter} type="text" placeholder="enter name ..."/>
    <Button color='primary' variant='contained' disableElevation onClick={editCommitHandler}>rename</Button>
  </div>
}

export default EditModalContent