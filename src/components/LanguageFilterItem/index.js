import './index.css'

const LanguageFilterItem = props => {
  const {eachLanguageItemDetails, updateActiveLanguageItem, isActive} = props
  const {id, language} = eachLanguageItemDetails

  const onClickLanguage = () => {
    updateActiveLanguageItem(id)
  }

  const languageButtonStatus = isActive ? 'active-language-btn' : ''
  return (
    <li className="language-item">
      <button
        type="button"
        className={`language-btn ${languageButtonStatus}`}
        onClick={onClickLanguage}
      >
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
