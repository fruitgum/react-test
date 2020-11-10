
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import './index.css';

const myNews = [
{    
  id: 1,
  author: 'Саша Печкин',
  text: 'В четверг, четвертого числа...',
  bigText: 'в четыре с четвертью часа четыре чёрненьких чумазеньких чертёнка чертили чёрными чернилами чертёж.',
  rating: 0
},  {
  id: 2,
  author: 'Просто Вася',
  text: 'Считаю, что $ должен стоить 35 рублей!',
  bigText: 'А евро 42!',
  rating: 132
},  {
  id: 3,
  author: 'Max Frontend',
  text: 'Прошло 2 года с прошлых учебников, а $ так и не стоит 35',
  bigText: 'А евро опять выше 70.',
  rating: 1488  
},  {
  id: 4,
  author: 'Гость',
  text: 'Бесплатно. Без смс, про реакт, заходи - https://maxpfrontend.ru',
   bigText: 'Еще есть группа VK, telegram и канал на youtube! Вся инфа на сайте, не реклама!',
   rating: -850
  }
];

class News extends React.Component {

renderNews = () => {
  const { data } = this.props
  let newsTemplate 
  if (data.length) {
    newsTemplate = data.map(function(item) {
      return <Article key={item.id} data={item} />
    })
  }else{
    newsTemplate = <p>No news</p>
  }
  return newsTemplate
}

  render(){
    const { data } = this.props
    return(
      <div className="news">
      {this.renderNews()}
      {
        data.length ? <strong>Total news: {data.length}</strong> : null
      }
      </div>
    )
  }
}


class Article extends React.Component {

  state = {
    visible: false,
    rating: this.props.data.rating,
    removed: false,
    count: News.length
  }
  rmc = (e) => {
    e.preventDefault()
    this.setState({ visible: true })
  }

  rem = (e) => {
    e.preventDefault()
    this.setState({removed: true})
    console.log(this.state.count)
  }

  rm = (f) => {
    this.setState({rating: --this.state.rating})
  }

  rp = (g) => {
    this.setState({rating: ++this.state.rating})
  }

  colorize = () => {
    if (this.state.rating > 0) {
      return ('item__rating__g')
    }else if(this.state.rating < 0){
      return ('item__rating__b')
    }
    return ('item__rating')
  }

   render() {
    const {author, text, bigText} = this.props.data
    const {visible, rating, removed} = this.state
    return(
      <React.Fragment>
        {
          !removed && <div className="article">
          <p className="item__author">{author}:</p>
          <p className="item__text">{text}</p>
          { 
            !visible && <a href="#more" onClick={this.rmc} className="item__readmore">more...</a> 
          }
          {
            visible && <p className="item__big-text">{bigText}</p> 
          }
         <div className='ratingBlock'>
          <span onClick={this.rm} className="rm">-1</span>
          <span className={this.colorize()}>{rating}</span>
          <span onClick={this.rp} className="rp">+1</span>
         </div>
         <p className="remove__item" onClick={this.rem}>Remove</p>
        </div>
        }
        {
          removed && null
        }
        </React.Fragment>
      )
    }
  }



class Add extends React.Component {
  state ={
    id: +new Date(),
    author: '',
    text: '',
    bigText: '',
    rating: 0,
    check: false
  }
 
  constructor(props) {
    super(props);
    this.input=React.createRef()
  }

  bch = (e) => {
    e.preventDefault()
  }

  hc = (e) => {
    const {id} = e.currentTarget
    this.setState({ [id]: e.currentTarget.value })
  }

  cClk = (f) => {
    this.setState({check:f.currentTarget.checked})
  }

  alarmClick = (e) => {
    e.preventDefault()
    const {id, author, text, bigText, rating} = this.state
   this.props.onAddNews({id, author, text, bigText, rating})

  }

  validate = () =>{
  if(this.state.author.trim() && this.state.text.trim() && this.state.bigText.trim() && this.state.check){
      return true
    }
    return false
  }

  render(){
    const {author, text, bigText} = this.state;
     return(
      <div className="add">
      <input id='author' className="add__author" placeholder='Name...' value={author} onChange={this.hc} ref={this.input} />
      <input id='text' className="add__author" placeholder='header' value={text} onChange={this.hc} ref={this.input} />
      <textarea id='bigText' className="add__text"  placeholder="Text" value={bigText} onChange={this.hc} ref={this.input} />
      <label className="add__checkrule">  I agree with rules
      <input type="checkbox" onClick={this.cClk} />
      </label>
      <button className='add__btn' disabled={!this.validate()} onClick={this.alarmClick}>ALARM!</button>
        </div>
    )
  }
}

News.propTypes = {
  data: PropTypes.array.isRequired
}

Article.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number.isRequired,
    author: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    bigText: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired
  })
}

Add.propTypes = {
  onAddNews: PropTypes.func.isRequired
}

class App extends React.Component{
  state = {
    news: myNews
  }
  handleAddNews = (data) =>{
    const nextNews = [data, ...this.state.news]
    this.setState({news: nextNews})
  }
  render(){
    return(
    <React.Fragment>
    <h3>NEWS</h3>
    <Add onAddNews={this.handleAddNews}/>
    <News data={this.state.news} />
    
    </React.Fragment>
    )
  }
};

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

