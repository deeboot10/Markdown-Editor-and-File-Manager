import { useState } from "react";
import { Fragment } from "react"
import { useDispatch } from "react-redux";
import { activeFileActions, refreshActions } from '../../store/ReduxStateSlices'
import EditModal from './EditModal'
import EditSvg from "../../svg/EditSvg";
import DeleteFileSvg from "../../svg/DeleteFileSvg";

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
        <EditSvg onClick={showEditModal} />
        <DeleteFileSvg onClick={deleteFileHandler}/>
        {editModalIsVisible && <EditModal name={name} closeHandler={closeModalHandler} fileName={name} />}
      </div>
    </div>
  </Fragment>
}

export default FileItem