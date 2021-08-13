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

  const saveFiles = () => {
    props.save();
  }

  const activeFile = props.active;

  return <div className="menu">
    <div className='submenu'>
      <div onClick={props.toggle} className='svg-container'>
      <svg xmlns="http://www.w3.org/2000/svg" height='30' width='30' viewBox="0 0 16 16">
        <path d="M.54 3.87.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3h3.982a2 2 0 0 1 1.992 2.181l-.637 7A2 2 0 0 1 13.174 14H2.826a2 2 0 0 1-1.991-1.819l-.637-7a1.99 1.99 0 0 1 .342-1.31zM2.19 4a1 1 0 0 0-.996 1.09l.637 7a1 1 0 0 0 .995.91h10.348a1 1 0 0 0 .995-.91l.637-7A1 1 0 0 0 13.81 4H2.19zm4.69-1.707A1 1 0 0 0 6.172 2H2.5a1 1 0 0 0-1 .981l.006.139C1.72 3.042 1.95 3 2.19 3h5.396l-.707-.707z"/>
      </svg>
      </div>
      <div onClick={boldHandler} className="svg-container">
        <svg xmlns="http://www.w3.org/2000/svg" height='30' width='30' viewBox="0 0 16 16">
          <path d="M8.21 13c2.106 0 3.412-1.087 3.412-2.823 0-1.306-.984-2.283-2.324-2.386v-.055a2.176 2.176 0 0 0 1.852-2.14c0-1.51-1.162-2.46-3.014-2.46H3.843V13H8.21zM5.908 4.674h1.696c.963 0 1.517.451 1.517 1.244 0 .834-.629 1.32-1.73 1.32H5.908V4.673zm0 6.788V8.598h1.73c1.217 0 1.88.492 1.88 1.415 0 .943-.643 1.449-1.832 1.449H5.907z"/>
        </svg>
      </div>
      <div onClick={italicHandler} className="svg-container">
        <svg xmlns="http://www.w3.org/2000/svg" height='30' width='30' viewBox="0 0 16 16">
          <path d="M7.991 11.674 9.53 4.455c.123-.595.246-.71 1.347-.807l.11-.52H7.211l-.11.52c1.06.096 1.128.212 1.005.807L6.57 11.674c-.123.595-.246.71-1.346.806l-.11.52h3.774l.11-.52c-1.06-.095-1.129-.211-1.006-.806z"/>
        </svg>
      </div>
      <div onClick={quoteHandler} className="svg-container">
        <svg xmlns="http://www.w3.org/2000/svg" height='20' width='20' viewBox="0 0 16 16">
          <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.5a1 1 0 0 0-.8.4l-1.9 2.533a1 1 0 0 1-1.6 0L5.3 12.4a1 1 0 0 0-.8-.4H2a2 2 0 0 1-2-2V2zm7.194 2.766a1.688 1.688 0 0 0-.227-.272 1.467 1.467 0 0 0-.469-.324l-.008-.004A1.785 1.785 0 0 0 5.734 4C4.776 4 4 4.746 4 5.667c0 .92.776 1.666 1.734 1.666.343 0 .662-.095.931-.26-.137.389-.39.804-.81 1.22a.405.405 0 0 0 .011.59c.173.16.447.155.614-.01 1.334-1.329 1.37-2.758.941-3.706a2.461 2.461 0 0 0-.227-.4zM11 7.073c-.136.389-.39.804-.81 1.22a.405.405 0 0 0 .012.59c.172.16.446.155.613-.01 1.334-1.329 1.37-2.758.942-3.706a2.466 2.466 0 0 0-.228-.4 1.686 1.686 0 0 0-.227-.273 1.466 1.466 0 0 0-.469-.324l-.008-.004A1.785 1.785 0 0 0 10.07 4c-.957 0-1.734.746-1.734 1.667 0 .92.777 1.666 1.734 1.666.343 0 .662-.095.931-.26z"/>
        </svg>
      </div>
      <div onClick={codeHandler} className="svg-container">
        <svg xmlns="http://www.w3.org/2000/svg" height='25' width='25' viewBox="0 0 16 16">
          <path d="M5.854 4.854a.5.5 0 1 0-.708-.708l-3.5 3.5a.5.5 0 0 0 0 .708l3.5 3.5a.5.5 0 0 0 .708-.708L2.707 8l3.147-3.146zm4.292 0a.5.5 0 0 1 .708-.708l3.5 3.5a.5.5 0 0 1 0 .708l-3.5 3.5a.5.5 0 0 1-.708-.708L13.293 8l-3.147-3.146z"/>
        </svg>
      </div>
      <div onClick={header1Handler} className="svg-container">
        <svg xmlns="http://www.w3.org/2000/svg" height='27' width='27' viewBox="0 0 16 16">
          <path d="M8.637 13V3.669H7.379V7.62H2.758V3.67H1.5V13h1.258V8.728h4.62V13h1.259zm5.329 0V3.669h-1.244L10.5 5.316v1.265l2.16-1.565h.062V13h1.244z"/>
        </svg>
      </div>
      <div onClick={header2Handler} className="svg-container">
        <svg xmlns="http://www.w3.org/2000/svg" height='27' width='27' viewBox="0 0 16 16">
          <path d="M7.638 13V3.669H6.38V7.62H1.759V3.67H.5V13h1.258V8.728h4.62V13h1.259zm3.022-6.733v-.048c0-.889.63-1.668 1.716-1.668.957 0 1.675.608 1.675 1.572 0 .855-.554 1.504-1.067 2.085l-3.513 3.999V13H15.5v-1.094h-4.245v-.075l2.481-2.844c.875-.998 1.586-1.784 1.586-2.953 0-1.463-1.155-2.556-2.919-2.556-1.941 0-2.966 1.326-2.966 2.74v.049h1.223z"/>
        </svg>
      </div>
      <div onClick={header3Handler} className="svg-container">
        <svg xmlns="http://www.w3.org/2000/svg" height='27' width='27' viewBox="0 0 16 16">
          <path d="M7.637 13V3.669H6.379V7.62H1.758V3.67H.5V13h1.258V8.728h4.62V13h1.259zm3.625-4.272h1.018c1.142 0 1.935.67 1.949 1.674.013 1.005-.78 1.737-2.01 1.73-1.08-.007-1.853-.588-1.935-1.32H9.108c.069 1.327 1.224 2.386 3.083 2.386 1.935 0 3.343-1.155 3.309-2.789-.027-1.51-1.251-2.16-2.037-2.249v-.068c.704-.123 1.764-.91 1.723-2.229-.035-1.353-1.176-2.4-2.954-2.385-1.873.006-2.857 1.162-2.898 2.358h1.196c.062-.69.711-1.299 1.696-1.299.998 0 1.695.622 1.695 1.525.007.922-.718 1.592-1.695 1.592h-.964v1.074z"/>
        </svg>
      </div>
      <div onClick={linkHandler} className='svg-container'>
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 16 16">
          <path d="M6.354 5.5H4a3 3 0 0 0 0 6h3a3 3 0 0 0 2.83-4H9c-.086 0-.17.01-.25.031A2 2 0 0 1 7 10.5H4a2 2 0 1 1 0-4h1.535c.218-.376.495-.714.82-1z"/>
          <path d="M9 5.5a3 3 0 0 0-2.83 4h1.098A2 2 0 0 1 9 6.5h3a2 2 0 1 1 0 4h-1.535a4.02 4.02 0 0 1-.82 1H12a3 3 0 1 0 0-6H9z"/>
        </svg>
      </div>
    </div>
    <div className='save-container'>
      <label>Autosave:</label>
      <input className='checkbox' type="checkbox" defaultChecked onClick={saveFiles}/>
      <button onClick={props.save} className={props.text === localStorage.getItem(activeFile) ? 'saved' : 'save'}>{props.text === localStorage.getItem(activeFile) ? 'Saved' : 'Save'}</button>
    </div>
  </div>
}

export default Menu