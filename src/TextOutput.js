import ReactMarkdown from 'react-markdown'
import remarkBreaks from 'remark-breaks'

const TextOutput = props => {


  return <div className='output-container'>
    <ReactMarkdown remarkPlugins={[remarkBreaks]}>{props.text}</ReactMarkdown>
  </div>
}

export default TextOutput