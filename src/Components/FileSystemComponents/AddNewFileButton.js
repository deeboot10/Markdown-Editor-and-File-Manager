import { useState, Fragment } from "react"
import NewFileModal from './NewFileModal'
import { Button } from "@material-ui/core"

const AddNewFileButton = () => {

  const [newFileModal, setNewFileModal] = useState(false)

  const openModalHandler = () => {
    setNewFileModal(true)
  }

  const closeModalHandler = () => {
    setNewFileModal(false)
  }

  return <Fragment>
    <Button size='small' disableElevation className='addnewbutton' variant="outlined" color='primary' onClick={openModalHandler}>
      <b>
        Add New File
      </b>
    </Button>
    {newFileModal ? <NewFileModal close={closeModalHandler}/> : null}
  </Fragment>
}

export default AddNewFileButton