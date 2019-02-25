import React, { Component } from 'react';
import { connect } from 'react-redux'
import Card from './Card'

class CardListFollowing extends Component {
  constructor(props) {
    super(props)
    this.state = {
      posts: [],
      replies: [],
      username: this.props.user.user,
    }
  }

  componentDidMount() {
      fetch('http://localhost:3000/api/loadFollowingPosts', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          username: this.state.username,
        })
      })
      .then(response => response.json())      
      .then(text => this.setState({ posts: text }))
  }
  
  render() {
    const { posts } = this.state;
    const sortedPosts = posts.sort((a, b) => (a.upvotes > b.upvotes) ? -1 : 1)

    
    return (
      <div>
      <div className="tc pt2">
      <button type="button" className="bg-black white ">All Posts</button>
      <button type="button" className="bg-black white ">Following</button>
      <button type="button" className="bg-black white ">My Posts</button>  
      </div>
    
      {
        sortedPosts.map((post, i) => {
          return(
          <Card 
          key={i}
          id={posts[i].id}
          username={posts[i].username}
          title={posts[i].title}
          text={posts[i].text}
          />
          );
        })
      }
      </div>
    )
  };
}

const mapStateToProps = state => {
  return {
    user: state.user,
  }
}

export default connect(mapStateToProps)(CardListFollowing);