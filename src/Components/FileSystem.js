import FileItem from "./FileSystemComponents/FileItem"
import AddNewFileButton from './FileSystemComponents/AddNewFileButton'
import { useSelector } from "react-redux"
import AddNewFolderButton from './FileSystemComponents/AddNewFolderButton'
import FolderItem from "./FileSystemComponents/FolderItem"
import file from "../initialFiles/initial-file"

const FileSystem = ({text}) => {
  
  let arrayOfKeys = Object.keys(localStorage);
  arrayOfKeys = arrayOfKeys.filter(key => key !== 'foldersContainer')
  let allFileItems = [];
  let allFolderItems = [];
  
  if (!localStorage.getItem('foldersContainer')) {
    localStorage.setItem('foldersContainer', [
      'defaultFolder'
    ])
  }
  if (!arrayOfKeys.length) {
    localStorage.setItem('default', file);
  }
  
  
  const activeFile = useSelector(state => state.activeFile.activeFile);
  


  const arrayOfFolders = localStorage.getItem('foldersContainer').split(',')


  arrayOfFolders.forEach(folderName => {
    allFolderItems.push(
      <FolderItem key={folderName} name={ folderName }/>
    )
  })

  arrayOfKeys.forEach( key => {
    allFileItems.push(<FileItem name={key} key={key} className={key === activeFile ? 'active' : ''}></FileItem>)
  })

  return <div className='filesystem'>
    <div className="addnewbuttons-container">
      <AddNewFileButton />
      <AddNewFolderButton />
    </div>
    <hr />
    <div>
      {allFolderItems}
      {allFileItems}
    </div>
  </div>
}

export default FileSystem