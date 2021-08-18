import { Switch } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { activeFileActions } from "../store/ReduxStateSlices";
import { FormatBold, FormatItalic, FormatQuote, Code, Link, FolderOpen } from "@material-ui/icons";
import Header1 from "../svg/Header1";
import Header2 from "../svg/Header2";
import Header3 from "../svg/Header3";
import { Button } from "@material-ui/core";

const Menu = (props) => {
  
  const getAreaField = () => {
    return document.querySelector('textarea');
  }
  const boldHandler = () => {
    const area = getAreaField();
    area.value += '**bold**';
    area.focus()
    const lastPlaceIndex = area.selectionStart
    area.selectionStart = lastPlaceIndex - 6;
    area.selectionEnd = lastPlaceIndex - 2;
  }
  const italicHandler = () => {
    const area = getAreaField();
    area.value += '*italic*';
    area.focus()
    const lastPlaceIndex = area.selectionStart
    area.selectionStart = lastPlaceIndex - 7;
    area.selectionEnd = lastPlaceIndex - 1;
  } 
  const codeHandler = () => {
    const area = getAreaField();
    area.value += '```\ncode\n```';
    area.focus()
    const lastPlaceIndex = area.selectionStart
    area.selectionStart = lastPlaceIndex - 8;
    area.selectionEnd = lastPlaceIndex - 4;
  }
  const quoteHandler = () => {
    const area = getAreaField();
    area.value += '> quote';
    area.focus()
    const lastPlaceIndex = area.selectionStart
    area.selectionStart = lastPlaceIndex - 5;
    area.selectionEnd = lastPlaceIndex;
  }
  const header1Handler = () => {
    const area = getAreaField();
    area.value += '# header 1';
    area.focus()
    const lastPlaceIndex = area.selectionStart
    area.selectionStart = lastPlaceIndex - 8;
    area.selectionEnd = lastPlaceIndex;
  }
  const header2Handler = () => {
    const area = getAreaField();
    area.value += '## header 2';
    area.focus()
    const lastPlaceIndex = area.selectionStart
    area.selectionStart = lastPlaceIndex - 8;
    area.selectionEnd = lastPlaceIndex;
  }
  const header3Handler = () => {
    const area = getAreaField();
    area.value += '### header 3';
    area.focus()
    const lastPlaceIndex = area.selectionStart
    area.selectionStart = lastPlaceIndex - 8;
    area.selectionEnd = lastPlaceIndex;
  }
  const linkHandler = () => {
    const area = getAreaField();
    area.value += '[link name](url)';
    area.focus()
    const lastPlaceIndex = area.selectionStart
    area.selectionStart = lastPlaceIndex - 15;
    area.selectionEnd = lastPlaceIndex - 6;
  }


  // autosave toggle
  const dispatch = useDispatch();
  const autosaveChangeHandler = () => {
    dispatch(activeFileActions.changeAutoSave());
    props.save();
  }

  const isSaved = useSelector(state => state.activeFile.isSaved)

  return <div className="menu">
    <div className='submenu'>
      <div onClick={props.toggle} className='svg-container'>
        <FolderOpen fontSize='large'/>
      </div>
      <div onClick={boldHandler} className="svg-container">
        <FormatBold />
      </div>
      <div onClick={italicHandler} className="svg-container">
        <FormatItalic />
      </div>
      <div onClick={quoteHandler} className="svg-container">
        <FormatQuote />
      </div>
      <div onClick={codeHandler} className="svg-container">
        <Code />
      </div>
      <div onClick={header1Handler} className="svg-container">
        <Header1 />
      </div>
      <div onClick={header2Handler} className="svg-container">
      <Header2 />
      </div>
      <div onClick={header3Handler} className="svg-container">
      <Header3 />
      </div>
      <div onClick={linkHandler} className='svg-container'>
        <Link />
      </div>
    </div>
    <div className='save-container'>
      <label>Autosave:</label>
      <Switch onChange={autosaveChangeHandler} color='primary'/>
      <Button style={isSaved ? { color: 'white', border: '1px solid white' } : {}} disabled={isSaved} onClick={props.save} variant='contained' size='small' color='primary'>{isSaved ? 'saved' : 'save'}</Button>
    </div>
  </div>
}

export default Menu