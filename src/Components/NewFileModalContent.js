import { useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { refreshActions } from '../store/Refresh'

const NewFileModalContent = (props) => {

  const dispatch = useDispatch();

  const checkIsEnter = e => {
    if (e.keyCode === 13) {
      e.target.parentElement.querySelector("button").click();
    }
  }

  useEffect(() => {
    document.querySelector('.newfile-modal-container input').focus();
  }, []);

  const addNewFileHandler = e => {

    if (props.folder) {
      // adding new folder
      let previousFoldersContainer = localStorage.getItem('foldersContainer').split(',');
      previousFoldersContainer.push(e.target.parentElement.querySelector('input').value);
      localStorage.setItem('foldersContainer', previousFoldersContainer)
      dispatch(refreshActions.toggleRefresh())
    } else {
      // adding new file
      localStorage.setItem(e.target.parentElement.querySelector('input').value, '')
      dispatch(refreshActions.toggleRefresh())
    }
    document.querySelector('textarea').focus();
    props.close()
  }
  
  return <div className='newfile-modal-container'>
    <label>Name of file:</label>
    <input onKeyUp={checkIsEnter} type="text" placeholder="enter name ..."/>
    <button onClick={addNewFileHandler}>Add</button>
  </div>
}

export default NewFileModalContent