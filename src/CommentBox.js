import React, { Component } from 'react';
import Alert from 'react-s-alert';
import axios from 'axios';
//import CommentList from './CommentList';
import CommentForm from './CommentForm';
//import DATA from './data';
import './index.css';
import './react-s-alert/s-alert-default.css';
import './react-s-alert/stackslide.css';

class CommentBox extends Component {
    constructor(props) {
        super(props);
        this.state = { data: [] };
        this.loadCommentsFromServer = this.loadCommentsFromServer.bind(this);
        this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
    }
    loadCommentsFromServer() {
        axios.get(this.props.url)
        .then(res => {
            this.setState({ data: res.data });
        })
    }
    handleCommentSubmit(comment) {
        //add POST request
        let comments = this.state.data;
        comment.id = Date.now();
        let newComments = comments.concat([comment]);
        this.setState({ data: newComments });
        axios.post(this.props.url, comment)
        .then(res => {
            this.setState({ data: res });
        })
        .catch(err => {
            console.error(err);
            this.setState({ data: comments });
        });
    }
    componentDidMount() {
        this.loadCommentsFromServer();
        setInterval(this.loadCommentsFromServer, this.props.pollInterval);
    }
    render() {
        return (
            <div className='commentBox'>
            {/* <h2>Comments:</h2>
            <CommentList data={ this.state.data }/> */}
            <CommentForm onCommentSubmit={ this.handleCommentSubmit }/>
            <Alert stack={{limit: 3}} />
            </div>
        )
    }

            // constructor(props) {
    //     super(props);
    //     this.state = { data: [] };
    // }
    // render() {
    //     return (
    //         <div className='commentBox'>
    //         <h2>Comments:</h2>
    //         <CommentList data={ this.state.data }/>
    //         <CommentForm />
    //         </div>
    //     )
    // }
}
export default CommentBox;