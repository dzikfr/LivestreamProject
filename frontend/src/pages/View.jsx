import ReactPlayer from "react-player" 
import { useParams } from "react-router-dom"

const View = () => {

  const {id} = useParams()

  return (
    <div>
      <ReactPlayer url={id} controls/>
    </div>
  )
}

export default View
