import React from 'react';
import Photo from './Photo';
import Comments from './Comments';
//import comments
const Single = React.createClass({
  render() {
    // index of the post
    const i = this.props.posts.findIndex((post) => post.code === this.props.params.postId);
    const post = this.props.posts[i];
    //get the comments, even if there are no comments
    const postComments = this.props.comments[this.props.params.postId] || [];
    // which will get us the post

    return (
      <div className="single-photo">
        <Photo i={i} post={post}{...this.props} />
        <Comments postComments={postComments} {...this.props} />

      </div>
    )
  }
});
export default Single;