import React, { Component } from 'react';
import styles from '../layout/styles';
import Api from '../helper/ApiManager';

// import { Router, Route, IndexRoute, Link, IndexLink, browserHistory } from 'react-router';

class EditPollDetail extends React.Component {
	
	constructor(props) {
    	super(props);
    		this.state = {
    			editing: props.editMode, 
          editText: props.children,
          selectedID: props.id,
          newText: '',
          user_feedback: '' 
    		}
    		
    	this.changeText = this.changeText.bind(this);
    	this.submit = this.submit.bind(this);
    	this.remove = this.remove.bind(this);
    }
  
	edit() {
		this.setState({editing: true, editText:''});
	}
	
	changeText(event) {
		// Report error
		if (!event.target.value.trim()) {
			this.setState({ user_feedback: '* A response cannot be left blank'});
			return;
		}
			
		this.setState({ newText: event.target.value })

		this.props.changetext(event.target.value, this.props.id)
	}
	
	submit = (event) => {
		event.preventDefault();
		if (this.state.newText != '') {
			this.props.submit(this.props.id, this.state.newText.trim())	
			this.setState({editing: false, editText:'', user_feedback: ''});
		} else {
			this.setState({editing: false, user_feedback: ''});
		}
	}

	remove() {

		this.props.onRemove(this.props.id);
	}
	cancel = (event) => {
		event.preventDefault();
		this.setState({editing:false, user_feedback: '' })
	}
	renderForm() {
		const style = styles.editPoll;
			return (
        <div className="container-fluid responseBox" key={this.props.id}>
          <div className="row" key={this.props.id}>
          <form onSubmit={this.submit} style={style.miniform} key={this.props.id}>
            <div className="col-xs-12 col-sm-8 col-md-6">
              <input ref={this.props.id} type="text" 
                className="form-control" onChange={this.changeText}
                value={this.props.respText} />
            </div>
            <div className="col-xs-12 col-sm-4 col-md-6">
              <div className="float-right">
                <button className="btn-sm btn-success" 
                  style={style.buttonSpace} 
                  type="submit" 
                  value="Update">
                  <i className="fa fa-floppy-o" aria-hidden="true"></i>
                  &nbsp;Update</button>
                <button className="btn-sm btn-default" 
                  style={style.buttonSpace}
                  onClick={this.cancel}>
                  <i className="fa fa-ban" aria-hidden="true"></i>
                  &nbsp;Cancel</button>
              </div>
            </div>
          </form>
          <br/>
          <span className="error-text">{this.state.user_feedback}</span>
          </div>
				</div>)
	}
	renderDisplay() {
		const style = styles.editPoll;
			return (
        <div className="container-fluid" style={style.containerBox}>
						<div className="row responseOption">
							<div className="col-xs-12 col-sm-8 col-md-6">
								{this.props.respText}
							</div>
              <div className="col-xs-12 col-sm-4 col-md-6">
                <div className="float-right">
                  <button className="btn-sm btn-warning" 
                    style={style.buttonSpace}
                    onClick={() => this.setState({editing:true})}>
                    <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
                    &nbsp;Edit</button>
                  <button className="btn-sm btn-danger"
                    style={style.buttonSpace} 
                    onClick={this.remove}>
                    <i className="fa fa-times" aria-hidden="true"></i>
                    &nbsp;Delete</button>
                </div>
              </div>							
						</div>
				</div>)
	}
	render() {
		return (this.state.editing) ? this.renderForm() : this.renderDisplay()								
	}
}

export default EditPollDetail;