import { debounce } from 'lodash'
import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { activeFileActions } from '../store/ReduxStateSlices';

const TextInput = props => {

  const isSaved = useSelector(state => state.activeFile.isSaved);
  const autoSaveIsOn = useSelector(state => state.activeFile.autoSaveIsOn)
  const dispatch = useDispatch()

  const call = useCallback(
    debounce(() => {
        console.log('click has been attemmpted', autoSaveIsOn)
        document.querySelector('.save-container button').click()
    }, 1000),
    []
  )

  const provideText = e => {
    props.handleText(e.target.value);
    if (isSaved) {
      dispatch(activeFileActions.changeIsSaved({bool: false}));
    }
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