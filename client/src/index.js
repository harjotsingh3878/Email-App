import React from 'react';
import ReactDOM from 'react-dom';
import CommentBox from './CommentBox';
import './index.css';

ReactDOM.render(
    <CommentBox
    //url='http://localhost:3002/api/emails'
    url='http://zaimbr.com/api/emails'
    pollInterval={2000} />,
    document.getElementById('root')
    
);