import { useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { refreshActions } from '../../store/ReduxStateSlices'
import { Button } from '@material-ui/core';
import { Input } from '@material-ui/core';

const NewFileModalContent = (props) => {

  const dispatch = useDispatch();

  const checkIsEnter = e => {
    if (e.keyCode === 13) {
      e.target.parentElement.parentElement.querySelector("button").click();
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
    <Input onKeyUp={checkIsEnter} type="text" placeholder="enter name ..."/>
    <Button color='primary' variant='contained' size='small' onClick={addNewFileHandler}>Add</Button>
  </div>
}

export default NewFileModalContent