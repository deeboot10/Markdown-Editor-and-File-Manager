import { useState, Fragment } from "react"
import NewFileModal from './NewFileModal'

const AddNewFileButton = () => {

  const [newFileModal, setNewFileModal] = useState(false)

  const openModalHandler = () => {
    setNewFileModal(true)
  }

  const closeModalHandler = () => {
    setNewFileModal(false)
  }

  return <Fragment>
    <button className='add-new-file-button' onClick={openModalHandler}>
      <b>
        Add New File
      </b>
    </button>
    {newFileModal ? <NewFileModal close={closeModalHandler}/> : null}
  </Fragment>
}

export default AddNewFileButton