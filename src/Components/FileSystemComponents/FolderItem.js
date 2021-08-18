import { useDispatch } from 'react-redux'
import { refreshActions, activeFileActions } from '../../store/ReduxStateSlices'
import { Button } from '@material-ui/core';
import FolderSmallSvg from '../../svg/FolderSmallSvg';
import { useState } from 'react';

const FolderItem = props => {

  const [folderIsVisible, setFolderIsVisible] = useState(true);
  const dispatch = useDispatch();

  const toggleFolderVisibility = () => {
    setFolderIsVisible(state => !state);
  }

  const deleteFolderhandler = () => {
    let root = JSON.parse(localStorage.getItem('root'))

    if (Object.keys(root).length > 1) {
      delete root[props.name];
      const firstFolder = Object.keys(root)[0]
      const firstFile = Object.keys(root[firstFolder])[0]
      localStorage.setItem('root', JSON.stringify(root));
      dispatch(activeFileActions.changeActiveFile({ name: firstFile }));
      document.querySelector('textarea').value = root[firstFolder][firstFile];
    } else {
      alert('you must have at least one folder')
    }
    dispatch(refreshActions.toggleRefresh())
  }

  return <div className='folder-item'>
    <div className='folder-item-menu'>
      <span>
        <FolderSmallSvg click={toggleFolderVisibility}/>
        {props.name}
        <span>
          { !folderIsVisible && ' (' + props.children.length + ' files)'}
        </span>
      </span>
      <Button className='delete-folder-btn' size='small' variant='outlined' color='secondary' onClick={deleteFolderhandler}>
        delete
      </Button>
    </div>
    <div className="folder-item-files">
      {folderIsVisible && props.children}
    </div>
  </div>
}

export default FolderItem