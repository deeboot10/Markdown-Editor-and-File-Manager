import { debounce } from 'lodash'
import { useCallback } from 'react';

const TextInput = props => {

  const call = useCallback(
    debounce(() => {
      if (document.querySelector('.checkbox').checked) {
        document.querySelector('.save-container button').click()
      }
    }, 1000),
    []
  )

  const provideText = e => {
    props.handleText(e.target.value);
    call()
  }

  return <div className='input-container'>
    <textarea placeholder="start typing ..." onChange={provideText}>
    
    </textarea>
  </div>
}

export default TextInput