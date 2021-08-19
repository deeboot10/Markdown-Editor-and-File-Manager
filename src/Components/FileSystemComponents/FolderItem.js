import { useDispatch } from 'react-redux'
import { refreshActions, activeFileActions, isDraggedActions } from '../../store/ReduxStateSlices'
import { Button } from '@material-ui/core';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import ArrowDown from '../../svg/ArrowDown'
import ArrowRight from '../../svg/ArrowRight'

const FolderItem = props => {

  const [folderIsVisible, setFolderIsVisible] = useState(true);
  const dispatch = useDispatch();
  const isDragged = useSelector(state => state.isDragged.isDragged);


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

  const dropHandler = (e) => {
    e.preventDefault();
    const draggedFile = e.dataTransfer.getData('Text');
    let textCopy;
    const root = JSON.parse(localStorage.getItem('root'));
    const folders = Object.keys(root);
    folders.forEach(folderName => {
      const fileNames = Object.keys(root[folderName]);
      fileNames.forEach(fileName => {
        if (fileName === draggedFile) {
          textCopy = root[folderName][fileName];
          delete root[folderName][fileName];
          if (Object.keys(root[folderName]).length === 0 && folderName !== props.name) {
            delete root[folderName]
          }
        }
      })
    })


    // console.log('origin folder:', e.dataTransfer.getData('originFolder'))
    root[e.target.id][draggedFile] = textCopy;
    localStorage.setItem('root', JSON.stringify(root));
    e.target.classList.remove('green-bg')
    dispatch(activeFileActions.changeActiveFile({name: draggedFile}))
    dispatch(isDraggedActions.isDraggedFalse())
    dispatch(refreshActions.toggleRefresh())
  }

  const dragOverHandler = (e) => {
    e.preventDefault();
    e.target.classList.add('green-bg')
  }

  const dragLeaveHandler = (e) => {
    e.target.classList.remove('green-bg')
  }

  return <div className='folder-item'>
    <div className='folder-item-menu'>
      <span>
        {folderIsVisible ? <ArrowDown click={toggleFolderVisibility} /> : <ArrowRight click={toggleFolderVisibility}/>}
        {props.name}
        <span>
          { !folderIsVisible && ' (' + props.children.length + ' files)'}
        </span>
      </span>
      <Button className='delete-folder-btn' size='small' variant='outlined' color='secondary' onClick={deleteFolderhandler}>
        delete
      </Button>
    </div>
    <div className="folder-item-files" >
      {folderIsVisible && props.children}
    </div>
    <div onDragOver={dragOverHandler} onDragLeave={dragLeaveHandler}  onDrop={dropHandler} id={props.name} className="landing-area">
      drop files here ...
    </div>
  </div>
}

export default FolderItem 