import { useState } from "react";
import { Fragment } from "react"
import { useDispatch } from "react-redux";
import { activeFileActions, refreshActions, isDraggedActions } from '../../store/ReduxStateSlices'
import EditModal from './EditModal'
import EditSvg from "../../svg/EditSvg";
import DeleteFileSvg from "../../svg/DeleteFileSvg";

const FileItem = ({ name, className }) => {

  const dispatch = useDispatch();
  const [editModalIsVisible, setEditModalIsVisible] = useState(false);

  const deleteFileHandler = () => {

    let root = JSON.parse(localStorage.getItem('root'));
    const folderKeys = Object.keys(root);
    let currentFolder;
    folderKeys.forEach(key => {
      if (name in root[key]) {
        currentFolder = key;
      }
    })

    if (Object.keys(root[currentFolder]).length > 1) {
      delete root[currentFolder][name];
      localStorage.setItem('root', JSON.stringify(root));
      dispatch(activeFileActions.changeActiveFile({ name: Object.keys(root[currentFolder])[0] }));
      document.querySelector('textarea').value = root[currentFolder][Object.keys(root[currentFolder])[0]];
    } else {
      alert('you must have at least one file')
    }
    dispatch(refreshActions.toggleRefresh())
  }

  const closeModalHandler = () => {
    setEditModalIsVisible(false)
  }

  const showEditModal = () => {
    setEditModalIsVisible(true)
  }

  const changeFileHandler = () => {
    (() => {
      const root = JSON.parse(localStorage.getItem('root'));
      let activeFolder;
      const folderKeys = Object.keys(root);
      folderKeys.forEach(key => {
        if (name in root[key]) {
          activeFolder = key;
        }
      })
      document.querySelector('textarea').value = root[activeFolder][name]; 
    })()
    dispatch(activeFileActions.changeActiveFile({ name: name }));
    dispatch(activeFileActions.changeIsSaved({ bool: true }));
    dispatch(refreshActions.toggleRefresh())
  }

  const dragStart = (e) => {
    e.dataTransfer.setData('Text', e.target.id);
    dispatch(isDraggedActions.isDraggedTrue());
  }

  const dragEnd = () => {
    dispatch(isDraggedActions.isDraggedFalse())
  }

  return <Fragment>
    <div className={className + ' fileitem-container'}>
      <p draggable={true} onDragStart={dragStart} onDragEnd={dragEnd} onClick={changeFileHandler} id={name}>{name}</p>
      <div className='fileitem-svg-container'>
        <EditSvg onClick={showEditModal} />
        <DeleteFileSvg onClick={deleteFileHandler}/>
        {editModalIsVisible && <EditModal name={name} closeHandler={closeModalHandler} fileName={name} />}
      </div>
    </div>
  </Fragment>
}

export default FileItem