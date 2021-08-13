import NewFileModalContent from "./NewFileModalContent"
import { Fragment } from 'react'

const NewFileModal = props => {
  return <Fragment>
    <div className='newfile-modal' onClick={props.close}></div>
    <NewFileModalContent folder={props.folder} close={props.close}/>
  </Fragment>
}

export default NewFileModal