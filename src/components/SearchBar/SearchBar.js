import React from 'react'
import './SearchBar.scss'

class SearchBar extends React.Component {
  state = {
    term: ''
  }

  search = () => {
    this.props.onSearch(this.state.term)
  }

  handleTermChange = event => {
    this.setState({ term: event.target.value })
  }

  handleEnterKey = event => {
    if (event.keyCode === 13) {
      this.search()
    }
  }

  handleOnFocus = event => {
    let input = event.target
    if (!input.value) {
      input.setAttribute('placeholder', '')
    }
  }

  handleOnBlur = event => {
    let input = event.target
    if (!input.value) {
      input.setAttribute('placeholder', 'Enter A Song, Album, or Artist')
    }
  }

  render() {
    return (
      <div className="SearchBar">
        <div className="row">
          <div className="col-md-12">
            <div className="jumbotron text-center" />
            <h2 className="bar">Start searching for muisc HERE</h2>

            <div className="col-md-6 col-md-offset-3">
              <div className="input-group input-group-lg" />
              <input
                placeholder="Enter A Song, Album, or Artist"
                onChange={this.handleTermChange}
                onKeyUp={this.handleEnterKey}
                onFocus={this.handleOnFocus}
                onBlur={this.handleOnBlur}
              />

              <br />
              <a className="btn" onClick={this.search}>
                SEARCH
              </a>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default SearchBar
