import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'
import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const apiStatusConstants = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

// Write your code here
class GithubPopularRepos extends Component {
  state = {
    activeLanguageId: languageFiltersData[0].id,
    apiStatus: apiStatusConstants.inProgress,
    reposList: [],
  }

  componentDidMount() {
    this.getRepositories()
  }

  updateActiveLanguageItem = activeLanguageId => {
    this.setState({activeLanguageId}, this.getRepositories)
  }

  getRepositories = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {activeLanguageId} = this.state
    const url = `https://apis.ccbp.in/popular-repos?language=${activeLanguageId}`

    try {
      const response = await fetch(url)
      console.log(response)

      if (response.ok === true) {
        const data = await response.json()
        console.log(data)

        const updatedData = data.popular_repos.map(eachRepositoryDetails => ({
          avatarUrl: eachRepositoryDetails.avatar_url,
          forksCount: eachRepositoryDetails.forks_count,
          id: eachRepositoryDetails.id,
          issuesCount: eachRepositoryDetails.issues_count,
          name: eachRepositoryDetails.name,
          starsCount: eachRepositoryDetails.stars_count,
        }))

        // console.log(updatedData)
        this.setState({
          reposList: updatedData,
          apiStatus: apiStatusConstants.success,
        })
      }
    } catch {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  repositoriesList = () => {
    const {reposList} = this.state
    return (
      <ul className="repositories-container">
        {reposList.map(eachRepository => (
          <RepositoryItem
            key={eachRepository.id}
            repositoryDetails={eachRepository}
          />
        ))}
      </ul>
    )
  }

  renderFailureView = () => (
    <div className="failure-container">
      <img
        height={300}
        width={400}
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png "
        alt="failure view"
      />
      <p className="failure-msg">Something Went Wrong</p>
    </div>
  )

  renderLoader = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  renderContent = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.repositoriesList()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        // case apiStatusConstants.inProgress:
        return this.renderLoader()
    }
  }

  render() {
    const {activeLanguageId} = this.state
    return (
      <div className="app-container">
        <h1 className="main-heading">Popular</h1>
        <ul className="languages-container">
          {languageFiltersData.map(eachLanguageItem => (
            <LanguageFilterItem
              key={eachLanguageItem.id}
              eachLanguageItemDetails={eachLanguageItem}
              updateActiveLanguageItem={this.updateActiveLanguageItem}
              isActive={activeLanguageId === eachLanguageItem.id}
            />
          ))}
        </ul>
        {this.renderContent()}
      </div>
    )
  }
}

export default GithubPopularRepos
