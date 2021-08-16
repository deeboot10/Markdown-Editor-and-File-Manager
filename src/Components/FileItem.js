import { useState } from "react";
import { Fragment } from "react"
import { useDispatch } from "react-redux";
import { activeFileActions, refreshActions } from '../store/Refresh'
import EditModal from './EditModal'

const FileItem = ({ name, className }) => {

  const dispatch = useDispatch();
  const [editModalIsVisible, setEditModalIsVisible] = useState(false);

  const deleteFileHandler = () => {
    localStorage.removeItem(name);
    let arrayOfKeys = Object.keys(localStorage);
    arrayOfKeys = arrayOfKeys.filter(name => 
      name !== 'foldersContainer'  
    )
    document.querySelector('textarea').value = localStorage.getItem(arrayOfKeys[0])
    dispatch(activeFileActions.changeActiveFile({ name: arrayOfKeys[0] }));
    dispatch(refreshActions.toggleRefresh())
  }

  const closeModalHandler = () => {
    setEditModalIsVisible(false)
  }

  const showEditModal = () => {
    setEditModalIsVisible(true)
  }

  const changeFileHandler = () => {
    (() => document.querySelector('textarea'))().value = localStorage.getItem(name);
    dispatch(refreshActions.toggleRefresh())
    dispatch(activeFileActions.changeActiveFile({ name: name }));
  }

  return <Fragment>
    <div className={className + ' fileitem-container'}>
      <p onClick={changeFileHandler}>{name}</p>
      <div className='fileitem-svg-container'>
        <svg onClick={showEditModal}  xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="black" viewBox="0 0 16 16">
          <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z"/>
        </svg>
        <svg onClick={deleteFileHandler} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="black" viewBox="0 0 16 16">
          <path d="M14 3a.702.702 0 0 1-.037.225l-1.684 10.104A2 2 0 0 1 10.305 15H5.694a2 2 0 0 1-1.973-1.671L2.037 3.225A.703.703 0 0 1 2 3c0-1.105 2.686-2 6-2s6 .895 6 2zM3.215 4.207l1.493 8.957a1 1 0 0 0 .986.836h4.612a1 1 0 0 0 .986-.836l1.493-8.957C11.69 4.689 9.954 5 8 5c-1.954 0-3.69-.311-4.785-.793z"/>
        </svg>
        {editModalIsVisible && <EditModal name={name} closeHandler={closeModalHandler} fileName={name} />}
      </div>
    </div>
  </Fragment>
}

export default FileItem