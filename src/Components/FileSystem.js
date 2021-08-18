import FileItem from "./FileSystemComponents/FileItem"
import AddNewFileButton from './FileSystemComponents/AddNewFileButton'
import { useSelector } from "react-redux"
import AddNewFolderButton from './FileSystemComponents/AddNewFolderButton'
import FolderItem from "./FileSystemComponents/FolderItem"

const FileSystem = () => {
  
  
  const activeFile = useSelector(state => state.activeFile.activeFile);

  const rootObject = JSON.parse(localStorage.getItem('root'))
  const arrayOfFolderKeys = Object.keys(rootObject)


  let arrayOfFolders = [];
  arrayOfFolderKeys.forEach(folderName => {
    let arrayOfFiles = [];
    const arrayOfFileKeys = Object.keys(rootObject[folderName])
    arrayOfFileKeys.forEach(fileName => {
      arrayOfFiles.push(<FileItem name={fileName} key={fileName} className={fileName === activeFile ? 'active' : ''}></FileItem>)
    })
    arrayOfFolders.push(<FolderItem key={folderName} name={ folderName }>{arrayOfFiles}</FolderItem>)
  })

  return <div className='filesystem'>
    <div className="addnewbuttons-container">
      <AddNewFileButton />
      <AddNewFolderButton />
    </div>
    <hr />
    <div>
      {arrayOfFolders}
    </div>
  </div>
}

export default FileSystem