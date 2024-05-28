// Write your JS code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import BlogItem from '../BlogItem'

import './index.css'

class BlogList extends Component {
  state = {
    isLoading: true,
    blogsData: [],
  }

  componentDidMount() {
    this.getBlogsData()
  }

  getBlogsData = async () => {
    const response = await fetch('https://apis.ccbp.in/blogs')
    const data = await response.json()
    const fromattedData = data.map(eachItem => ({
      id: eachItem.id,
      title: eachItem.title,
      imageUrl: eachItem.image_url,
      avatarUrl: eachItem.avatar_url,
      author: eachItem.author,
      topic: eachItem.topic,
    }))
    this.setState({
      blogsData: fromattedData,
      isLoading: false,
    })
  }

  render() {
    const {isLoading, blogsData} = this.state
    return (
      <div className="blogs-list">
        {isLoading ? (
          <div data-testid="loader">
            <Loader type="TailSpin" color="#00bff" height={50} width={50} />
          </div>
        ) : (
          <ul className="blogs-list">
            {blogsData.map(eachItem => (
              <BlogItem key={eachItem.id} blogItemDetails={eachItem} />
            ))}
          </ul>
        )}
      </div>
    )
  }
}
export default BlogList
