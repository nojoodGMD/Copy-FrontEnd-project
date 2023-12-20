import { useParams } from 'react-router-dom'

export default function WrongActivation() {
  const { msg } = useParams()

  return (
    <div className="main-container">
      <div className="activation-content">
        <h1 className="activation-msg">Error occured</h1>
        <h3>{msg}</h3>
      </div>
    </div>
  )
}
