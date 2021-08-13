import { useState, Fragment } from "react"
import NewFileModal from './NewFileModal'

const AddNewFolderButton = () => {

  const [newFileModal, setNewFileModal] = useState(false)

  const openModalHandler = () => {
    setNewFileModal(true)
  }
  const closeModalHandler = () => {
    setNewFileModal(false)
  }

  return <Fragment>
    <button className='add-new-folder-button' onClick={openModalHandler}>
      <b>
        Add New Folder
      </b>
    </button>
    {newFileModal ? <NewFileModal folder={true} close={closeModalHandler}/> : null}
  </Fragment>
}

export default AddNewFolderButton