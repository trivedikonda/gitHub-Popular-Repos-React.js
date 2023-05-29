// Write your code here
import './index.css'

const RepositoryItem = props => {
  const {repositoryDetails} = props
  const {
    avatarUrl,
    forksCount,
    issuesCount,
    name,
    starsCount,
  } = repositoryDetails
  return (
    <li className="repository-item">
      <img width={60} height={60} src={avatarUrl} alt={name} />
      <h1 className="name-heading">{name}</h1>
      <div className="image-and-count">
        <img
          className="image"
          width={20}
          height={20}
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
        />
        <p className="para">{starsCount} stars</p>
      </div>

      <div className="image-and-count">
        <img
          className="image"
          width={20}
          height={20}
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
        />
        <p className="para">{forksCount} forks</p>
      </div>

      <div className="image-and-count">
        <img
          className="image"
          width={20}
          height={20}
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
        />
        <p className="para">{issuesCount} open issues</p>
      </div>
    </li>
  )
}

export default RepositoryItem
