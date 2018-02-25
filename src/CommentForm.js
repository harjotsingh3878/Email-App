import React, { Component } from 'react';
import './index.css';
class CommentForm extends Component {
 constructor(props) {
 super(props);
    this.state = { uname: '', email: '' };
    this.handleUserNameChange = this.handleUserNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleInvalidEmailChange = this.handleInvalidEmailChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
 }
 handleUserNameChange(e) {
    this.setState({ uname: e.target.value });
 }
 handleEmailChange(e) {
    this.setState({ email: e.target.value });
 }
 handleInvalidEmailChange(e) {
    if(this.props.InvalidEmail)
        this.props.onInvalidEmailChange(false);
 }
 handleSubmit(e) {
    e.preventDefault();
    let uname = this.state.uname.trim();
    let email = this.state.email.trim();
    if (!email || !uname) {
        return;
    }
    this.props.onCommentSubmit({ uname: uname, email: email });
    this.setState({ uname: '', email: '' });
     //console.log(`${this.state.uname} said "${this.state.email}"`)
}
 render() {
 return (
 <form className='commentForm' onSubmit={ this.handleSubmit }>
    <input
        type='text'
        placeholder='Your name…'
        className='commentFormAuthor rc-input'
        value={ this.state.uname }
        onChange={ this.handleUserNameChange } />
    <input
        type='text'
        placeholder='Your email…'
        className={
            this.props.InvalidEmail ? 'commentFormText rc-input error' : 'commentFormText rc-input'
        }
        value={ this.state.email }
        onKeyPress={ this.handleInvalidEmailChange }
        onChange={ this.handleEmailChange } />

    { this.props.InvalidEmail ? <span class="error">Invalid Email</span> : null }
    
    <input
        type='submit'
        className='commentFormPost rc-submit'
        value='Submit' />
 </form>
 )
 }
}
export default CommentForm;