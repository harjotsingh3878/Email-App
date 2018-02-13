import React, { Component } from 'react';
import Comment from './Comment';
import './index.css';
class CommentList extends Component {
    render() {
        let commentNodes = this.props.data.map(comment => {
            return (
                <Comment uname={ comment.uname } key={ comment['_id'] }>
                { comment.email }
                </Comment>
            )
        })
        return (
            <div className='commentList'>
            { commentNodes }
            </div>
        )
    }
}
export default CommentList;