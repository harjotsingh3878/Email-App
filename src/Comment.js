import React, { Component } from 'react';
import './index.css';
import marked from 'marked';
class Comment extends Component {
    rawMarkup() {
        let rawMarkup = marked(this.props.children.toString());
        return { __html: rawMarkup };
    }
    render() {
        return (
            <div className='uniqueName'>
            <h3>{this.props.email}</h3>
            <span dangerouslySetInnerHTML={ this.rawMarkup() } />
            </div>
        )
    }
}
export default Comment;