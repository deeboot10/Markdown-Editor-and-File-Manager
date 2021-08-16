import { debounce } from 'lodash'
import { useCallback } from 'react';
import { useSelector } from 'react-redux';


const TextInput = props => {

  const autoSaveIsOn = useSelector(state => state.activeFile.autoSaveIsOn)

  const call = useCallback(
    debounce(() => {
        console.log('click has been attemmpted', autoSaveIsOn)
        document.querySelector('.save-container button').click()
    }, 1000),
    []
  )

  const provideText = e => {
    props.handleText(e.target.value);
    if (autoSaveIsOn) {
      call()
    }
  }

  return <div className='input-container'>
    <textarea placeholder="start typing ..." onChange={provideText}>
    
    </textarea>
  </div>
}

export default TextInput