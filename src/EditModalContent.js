import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { activeFileActions, refreshActions } from './store/Refresh'

const EditModalContent = (props) => {

  const dispatch = useDispatch();
  const activeFile = useSelector(state => state.activeFile.activeFile)

  const checkIsEnter = e => {
    if (e.keyCode === 13) {
      e.target.parentElement.querySelector('button').click();
      console.log('why')
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
    <input onKeyUp={checkIsEnter} type="text" placeholder="enter name ..."/>
    <button onClick={editCommitHandler}>Add</button>
  </div>
}

export default EditModalContent