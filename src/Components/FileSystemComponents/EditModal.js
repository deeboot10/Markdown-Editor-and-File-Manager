import { Fragment } from "react"
import EditModalContent from './EditModalContent'

const EditModal = (props) => {
  return <Fragment>
    <div className='edit-modal' onClick={props.closeHandler}></div>
    <EditModalContent name={props.name} oldName={props.fileName} close={props.closeHandler}/>
  </Fragment>
}

export default EditModal