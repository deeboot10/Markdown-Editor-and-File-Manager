import { useState, Fragment } from "react"
import NewFileModal from './NewFileModal'
import { Button } from "@material-ui/core"

const AddNewFolderButton = () => {

  const [newFileModal, setNewFileModal] = useState(false)

  const openModalHandler = () => {
    setNewFileModal(true)
  }
  const closeModalHandler = () => {
    setNewFileModal(false)
  }

  return <Fragment>
    <Button size='small' disableElevation className='addnewbutton' variant='outlined' color='secondary' onClick={openModalHandler}>
      <b>
        Add New Folder
      </b>
    </Button>
    {newFileModal ? <NewFileModal folder={true} close={closeModalHandler}/> : null}
  </Fragment>
}

export default AddNewFolderButton