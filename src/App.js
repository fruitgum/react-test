import React from 'react'
import PropTypes from 'prop-types'
import './index.css'
import { News } from './components/news';
import { Add } from './components/add';
import myNews from './components/data';


class App extends React.Component {
  state = {
    news: myNews,
  }
  handleAddNews = data => {
    const nextNews = [data, ...this.state.news]
    this.setState({ news: nextNews })
  }
  render() {
    return (
      <React.Fragment>
        <Add onAddNews={this.handleAddNews} />
        <h3>Новости</h3>
        <News data={this.state.news} />
      </React.Fragment>
    )
  }
}

export default App