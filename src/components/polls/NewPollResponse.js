import React, { Component } from 'react';
import styles from '../layout/styles';
// import Api from '../helper/ApiManager';

// import { Router, Route, IndexRoute, Link, IndexLink, browserHistory } from 'react-router';

class NewPollResponse extends Component {
	constructor(props) {
    	super(props);
    		this.state = {
                valid: true,
                newText: '',
                user_feedback: ''
        };
        // TODO: Re factor out user_feedback
        // BIND EVENTS!!!
        this.changeText = this.changeText.bind(this);
        this.cancel = this.cancel.bind(this);
        this.save = this.save.bind(this);
    }
	
	changeText = (event) => {
		console.log(this.refs.inputNewResponse.value);
		if (!this.refs.inputNewResponse.value) {
			this.setState({
				user_feedback: '* Cannot be blank',
				valid: false
			})
			return;
		} else {
			this.setState({
				user_feedback: '',
				valid: true
			})
		}
		this.setState({ newText: this.refs.inputNewResponse.value });
	}
	cancel = (e) => {
		e.preventDefault();
		
		this.props.cancel();
	}
	save = (e) => {
		e.preventDefault();
		if (!this.refs.inputNewResponse.value) return;
		console.log('save new resp ', this.refs.inputNewResponse.value);
		this.props.saveNew(this.state.newText);
		// (if) save ok, return out of edit mode
		this.props.cancel();
	}
	render() {
	const style = styles.editPoll;
		return (<div className="container-fluid responseBox">
					<div className="row">
					<form onSubmit={this.save} style={style.miniform}>
						<div className="col-xs-12 col-sm-8 col-md-6">
							<input type="text" ref="inputNewResponse"
								className="form-control" onChange={this.changeText}
								placeholder="Add a new poll option"
								value={this.state.newText} />
						</div>
						<span className="error-text">{this.state.user_feedback}</span>
						<div className="col-xs-12 col-sm-4 col-md-6">
							<div className="float-right">
								<button className="btn-sm btn-success" 
									style={style.buttonSpace} 
									type="submit" 
									value="Save">
									<i className="fa fa-floppy-o" aria-hidden="true"></i>
									&nbsp;Save</button>
								<button className="btn-sm btn-default" 
									style={style.buttonSpace}
									onClick={this.cancel}>
									<i className="fa fa-ban" aria-hidden="true"></i>
									&nbsp;Cancel</button>
							</div>
						</div>
					</form>
					<br/>
					
					{this.props.adding}
					</div>
				</div>)
	}
}

export default NewPollResponse;
