import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { activeFileActions, refreshActions } from '../store/ReduxStateSlices'
import { Button } from '@material-ui/core';
import { Input } from '@material-ui/core';

const EditModalContent = (props) => {

  const dispatch = useDispatch();
  const activeFile = useSelector(state => state.activeFile.activeFile)

  const checkIsEnter = e => {
    if (e.keyCode === 13) {
      e.target.parentElement.parentElement.querySelector('button').click();
    }
  }


  useEffect(() => {
    document.querySelector(".edit-modal-container input").focus()
  }, []);

  const editCommitHandler = e => {
    let name = e.target.parentElement.querySelector('input').value
    if (props.name === activeFile) {
      dispatch(activeFileActions.changeActiveFile({name: name}))
    }
    let content = localStorage.getItem(props.oldName);
    localStorage.removeItem(props.oldName)
    localStorage.setItem(name, content)
    dispatch(refreshActions.toggleRefresh())
    document.querySelector('textarea').focus();
    props.close()
  }
  
  return <div className='edit-modal-container'>
    <label>Set new name:</label>
    <Input onKeyUp={checkIsEnter} type="text" placeholder="enter name ..."/>
    <Button color='primary' variant='contained' size='small' onClick={editCommitHandler}>Add</Button>
  </div>
}

export default EditModalContent