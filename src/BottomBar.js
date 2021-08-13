const BottomBar = (props) => {
  const { words, lines } = props;
  
  return <div className='bottom-bar'>
    <span>Markdown</span>
    <span><b>{words}</b> words</span>
    <span><b>{lines}</b> lines</span>
  </div>
}

export default BottomBar