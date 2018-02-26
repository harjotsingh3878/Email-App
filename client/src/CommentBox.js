import React, { Component } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
//import CommentList from './CommentList';
import CommentForm from './CommentForm';
//import DATA from './data';
import './index.css';

const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
  };

class CommentBox extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            data: [],
            time: {}, seconds: 518400,
            modalIsOpen: false,
            errorModalIsOpen: false,
            IsEmailInvalid: false };
        this.loadCommentsFromServer = this.loadCommentsFromServer.bind(this);
        this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
        this.handleInvalidEmail = this.handleInvalidEmail.bind(this);

        /*timer*/
        // this.state = { time: {}, seconds: 518400 };
        this.timer = 0;
        this.startTimer = this.startTimer.bind(this);
        this.countDown = this.countDown.bind(this);
        this.startTimer();

        /*modal*/
        // this.state = {
        //     modalIsOpen: false
        //   };
      
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.openErrorModal = this.openErrorModal.bind(this);
        this.closeErrorModal = this.closeErrorModal.bind(this);
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
        //comment.id = Date.now();
        //let newComments = comments.concat([comment]);
        //this.setState({ data: newComments });
        var re = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
        console.log(`${comment.email}`);
        if(re.test(String(comment.email).toLowerCase())){
            axios.post(this.props.url, comment)
            .then(res => {
                this.setState({ data: res });
                this.openModal();
            })
            .catch(err => {
                console.error(err);
                this.setState({ data: comments });
            });
        } else {
            this.handleInvalidEmail(true);
            //this.openErrorModal();
            //this.openModal();
        }  
    }
    handleInvalidEmail(invalidEmail) {
        this.setState({IsEmailInvalid: invalidEmail});
    }
    componentDidMount() {
       // this.loadCommentsFromServer();
       // setInterval(this.loadCommentsFromServer, this.props.pollInterval);

        let timeLeftVar = this.secondsToTime(this.state.seconds);
        this.setState({ time: timeLeftVar });
    }

    /*TIMER*/
    secondsToTime(secs){
        let days = Math.floor(secs / (24 * 60 * 60));
        if(days < 10) {
            days = "0" + days;
        }

        let divisor_for_hours = secs % (24* 60 * 60);
        let hours = Math.floor(divisor_for_hours / (60 * 60));
        if(hours < 10) {
            hours = "0" + hours;
        }
    
        let divisor_for_minutes = secs % (60 * 60);
        let minutes = Math.floor(divisor_for_minutes / 60);
        if(minutes < 10) {
            minutes = "0" + minutes;
        }
    
        let divisor_for_seconds = divisor_for_minutes % 60;
        let seconds = Math.ceil(divisor_for_seconds);
        if(seconds < 10) {
            seconds = "0" + seconds;
        }
    
        let obj = {
            "d": days, 
            "h": hours,
            "m": minutes,
            "s": seconds
        };
        return obj;
      }
    
      startTimer() {
        if (this.timer === 0) {
          this.timer = setInterval(this.countDown, 1000);
        }
      }
    
      countDown() {
        // Remove one second, set state so a re-render happens.
        let seconds = this.state.seconds - 1;
        this.setState({
          time: this.secondsToTime(seconds),
          seconds: seconds,
        });
        
        // Check if we're at zero.
        if (seconds === 0) { 
          clearInterval(this.timer);
        }
      }

      /*Modal*/

      openModal() {
        this.setState({modalIsOpen: true});
      }
    
      closeModal() {
        this.setState({modalIsOpen: false});
      }

      openErrorModal() {
        this.setState({errorModalIsOpen: true});
      }
    
      closeErrorModal() {
        this.setState({errorModalIsOpen: false});
      }

    render() {
        return (
            <div>
                <div className="countdown styled">
                    <div>{this.state.time.d}<span>Days</span></div>
                    <div>{this.state.time.h}<span>Hours</span></div>
                    <div>{this.state.time.m}<span>Minutes</span></div>
                    <div>{this.state.time.s}<span>Seconds</span></div>
                </div>
                <div className="rc-header">Stay tuned for something amazing!. Subscribe to be notified.</div>
                <div className='commentBox'>
                <CommentForm 
                    onCommentSubmit={ this.handleCommentSubmit } 
                    onInvalidEmailChange={this.handleInvalidEmail}
                    InvalidEmail={this.state.IsEmailInvalid}/>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                    >

                    <div className="rc-modal-img"></div>
                    <div className="rc-modal-comment rc-comment-big">Thank You!</div>
                    <div className="rc-modal-comment">Share if you need three extra entries.</div>
                    <div className="rc-social-icons social rc-social-modal">
                        <div className="rc-social-block">
                            <div className="fb-share-button" data-href="http://zaimbr.com/" data-layout="button" data-size="large" data-mobile-iframe="true">
                                <a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Fzaimbr.com%2F&amp;src=sdkpreparse" className="fb-xfbml-parse-ignore" rel="noopener noreferrer">Share</a>
                            </div>
                            <div className="rc-social rc-facebook-color"></div>
                        </div>
                        <div className="rc-social-block">
                            <a className="twitter-share-button link twitter" href="https://twitter.com/intent/tweet?text=http%3A%2F%2Fzaimbr.com%2F" target="_target" data-size="large"><span className="fa fa-twitter"></span></a>
                            <div className="rc-social rc-twitter-color"></div>
                        </div>
                        <div className="rc-social-block">
                            <a id="google-plus" href="https://plus.google.com/share?url=http://zaimbr.com/" 
                            onClick="javascript:window.open(this.href,'', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');return false;" target="_blank" rel="noopener noreferrer"><img
  src="https://www.gstatic.com/images/icons/gplus-64.png" alt="Share on Google+"/></a>
                            <div className="rc-social rc-googleplus-color"></div>
                        </div>
                    </div>
                </Modal>

                <Modal
                    isOpen={this.state.errorModalIsOpen}
                    onRequestClose={this.closeErrorModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                    >
                    <button className="rc-modal-close" onClick={this.closeErrorModal}></button>
                    <div className="rc-modal-comment">The email you entered was incorrect.</div>
                </Modal>
                </div>
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