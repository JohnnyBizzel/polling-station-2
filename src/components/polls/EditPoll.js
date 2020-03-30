// presentational componet
// "use strict"; // maybe need this?
import React, { Component } from 'react';
import styles from '../layout/styles';
import Api from '../helper/ApiManager';
// import EditPollDetail from './EditPollDetail';
// import NewPollResponse from './NewPollResponse';
import PollResponse from './PollResponse';

import { Link } from 'react-router';



/////////////////////////////////////////
//
//  EDIT POLL COMPONENT
//
/////////////////////////////////////////

class EditPoll extends Component {
    constructor(props) {
    	super(props)
    	this.state = {
            poll:{
                pollquestion: '',
                author: '',
                responses: [1]
            },
            newresponses:[2],
            valid: true,
            deleteMode: false
        };
    	
    	this.save = this.save.bind(this);
    	this.update = this.update.bind(this);
    	this.deleteOption = this.deleteOption.bind(this);
    	this.deleting = this.deleting.bind(this);
    	this.deletePoll = this.deletePoll.bind(this);
    }
    
    componentDidMount(){
        
        // NB: pollID is a parameter of the URL (a query string)
        
        Api.get('/api/polls/' + this.props.params.id, null, (err, response) => {
            if(err){
                 alert("Error: " + err); 
            }
            else{
                var newobj = {pollquestion:response.message.pollquestion,
                	author:response.message.author,
                	responses:response.message.responses}
                this.setState({
                    poll:newobj
                });
                var newarr = this.state.poll.responses.map(function(i,index){
                    return i.response;
                });
                this.setState({
                    newresponses:newarr
                });
                console.log("Api GET Loading:",this.state.poll.responses);
            }
        });
        
        let isValid = Object.assign({},this.state.valid);
        isValid = JSON.stringify(true)
        this.setState({
		        valid:isValid
		    })
        
    }
	
	/* update text event (and update state) */
    update = (changedText, id) => {
		if (!changedText.trim()) {
			console.log('TEXT is blank ERROR!!')
			return;
		}
    	let newStateResponses = {...this.state }; // == Object.assign({}, this.state);

	    newStateResponses.poll.responses.forEach((rs) => {
	      if (rs.respID === id) {
	      	// change the record matching the id
	        rs.response = changedText;
	      }
	    })
	    //newStateResponses.user_feedback = ''; 
    	this.setState(newStateResponses);
    	// this.setState({ user_feedback: '' });
	}    
    
	save = (id, updatedText) => {
		console.log('in the save: ', this.state.poll.pollquestion)
		
		let newState = {...this.state };
		// let allResponses = Object.assign([],this.state.poll.responses);
		let updatedResponse = {};
		// TODO: Validation - if voted on already, values should not be changed?
		newState.poll.responses.forEach(function(r) {
			if (r.respID == id) {
				r.response = updatedText;
				console.log('Modified:',r);
				updatedResponse.response = updatedText;
				updatedResponse.respID = r.respID;
				updatedResponse.votes = r.votes;
			}
		})
		updatedResponse.operation = '[UPDATE]';
		console.log(updatedResponse);
	
		this.setState(newState);
        
        // Now update in the database:
        
    if(this.state.valid){
			Api.put('/api/polls/' + this.props.params.id, updatedResponse, (err, response) => {
				if (err) { 
				     console.log("Error: " + JSON.stringify(err)); 
				     return;
				}
				else{
				    console.log("changes succesfully saved" + JSON.stringify(response.text))
				}
			
			});
    }
    else{
        alert("something wrong with your options.")
    }
	}

	add = (newResponseText) => {
		console.log('add a new option:', newResponseText);
		let newStateResponses = {...this.state };
		let highestId = -1;
		for (let i = 0; i < newStateResponses.poll.responses.length; i++) {
			if (newStateResponses.poll.responses[i].respID > highestId)
				highestId = newStateResponses.poll.responses[i].respID;
		}
		highestId += 1;
		const newResponse = { response: newResponseText,
							respID : highestId,
							votes: 0 }
		newStateResponses.poll.responses.push(newResponse);
		console.log('New option = ', newResponse);
		this.setState(newStateResponses);
		
		// Now update in the database
		newResponse.operation = '[ADD]';
		
		Api.put('/api/polls/' + this.props.params.id, newResponse, (err, response) => {
			if (err) { 
			     console.log("Error: " + JSON.stringify(err)); 
			     return;
			}
			else{
			    console.log("add option succesfully saved" + JSON.stringify(response.text))
			}
		
		});
	}
	
	deleteOption = (id) => {
		console.log('delete Opt', id);
		// TODO: Validation... maybe stop deleting an option with votes?
		// Update State to remove the unwanted option
		let newStateResponses = {...this.state };
		// need at least 2 responses
		// TODO: warning message
		if (newStateResponses.poll.responses.length < 2) {
			this.setState({ valid:  false });
			return;
		}
		
	
		// Use API to delete the option from the Db.
		if(this.state.valid){
			// find the index and splice out the deleted element
			const idx = newStateResponses.poll.responses.findIndex((x) => x.respID === id);
			console.log(idx, id);
			if (idx < 0) return;
		    newStateResponses.poll.responses.splice(idx, 1);
	    	this.setState(newStateResponses);
	    	console.log(newStateResponses);
	    	
	    	// deleted response object
    		let delResponse = {};
    		delResponse.operation = '[DELETE]';
			delResponse.respID = id;
    		
			Api.put('/api/polls/' + this.props.params.id, delResponse, (err, response) => {
				if (err) { 
				     console.log("Error: " + JSON.stringify(err)); 
				     return;
				}
				else{
				    console.log("delete succesfully saved" + JSON.stringify(response.text))
				}
			
			});
        }
        else{
        	// TODO- convert to on screen error
            alert("You must have at least 2 options for a poll.")
        }
	}
	
	deleting(event) {
		event.preventDefault();
		this.setState({ deleteMode: true });

		
		//this.props.history.push('/');
	}
	
	deletePoll(event) {
		event.preventDefault();
		console.log('delete this poll: ', this.props.params.id);
		Api.del('/api/polls/' + this.props.params.id, (err, response) => {
			if (err) { 
			     console.log("Error: " + JSON.stringify(err)); 
			     return;
			}
			else{
			    console.log("Delete option succesfully executed" + JSON.stringify(response.text))
			}
		
		});
		
		this.setState({ deleteMode: false });
		location.replace('/');
	}
    
    render() {
    	let pollID = 'none';
    	let deleteMode = this.state.deleteMode;
		if (this.props.params != undefined)
			pollID = this.props.params.id;

        const zoneStyle = styles.zone; // needs to be inside the render func!
        
        return (<div style={zoneStyle.container}>
				    <h4 style={zoneStyle.header}>
				       <Link style={zoneStyle.title} to={`/Polldetailfull/${pollID}`}>{this.state.poll.pollquestion}</Link>
				    </h4>
				        <PollResponse onChange={this.update} 
				        	poll={this.state.poll}
				        	thePollId={pollID} 
				        	save={this.save}
				        	addNew={this.add}
				        	deleteOpt={this.deleteOption} />
				        <br/>
				        <span>created by {this.state.poll.author}</span>
				        <br/>
				     <button className="btn-sm" onClick={this.deleting}>Delete this poll</button>
				    	
				    {deleteMode ? <button className="btn-sm btn-danger" onClick={this.deletePoll}>Sure?</button> : ''}
				</div>
                );
    }
}

export default EditPoll