import React, { Component } from 'react';
import Poll from './Poll';
import Api from '../helper/ApiManager';
//waste
import Auth from '../../utils/Auth';

class CreatePoll extends Component {
    constructor(){
        super()
            this.state = {
                poll:{
                    pollquestion: '',
                    author: '',
                    responses: []
                }
        };
    }
    
    componentDidMount() {
        const currentUser = Auth.getCookie('voting-username');
        const initPoll = { pollquestion: '',
                    author: currentUser,
                    responses: [] }
        this.setState({ poll: initPoll });
    }
    
    updatePoll(event){

        // Take a copy of state and update that
        let updtPoll = Object.assign({}, this.state.poll);
        updtPoll[event.target.id] = event.target.value;
        
        // then reset the new state
        this.setState({
            poll: updtPoll
        });
        
    }
   

    submitPoll(event){
        
      if (this.state.poll.pollquestion === '')
      {
          alert("A poll needs a question");
          return;
      }

      // call the function from the container (not here as this is presentation layer)

      let pollObject = Object.assign({},this.state.poll);


    // do this to validate at least 2 options
      if (this.state.poll.responses.indexOf(";") < 0)
      {
          alert("Need at least 2 options. Use ; to separate options");
          return;
      }

      Api.post('/api/polls', pollObject, (err, response) => {
        if (err) { 
          console.log("Error: " + JSON.stringify(err)); 
          location.replace('/');
          return;
        }
			});
    }
    
    // TODO: "" i did this; and then this; " and got 3 options
    
    render(){	
        return (
			    <div className="container">
            <div className="col-xs-12 col-sm-8 col-md-6">
              Add a new poll:<br/>
                    
                <input onChange={this.updatePoll.bind(this)} id="pollquestion" className="form-control" type="text" placeholder="Poll question" value={this.state.poll.pollquestion}/>
                <br/>
                Author:
                <br/>
                <input id="author" className="form-control" type="text" placeholder="Author" value={this.state.poll.author}/>
                <br/>
                Responses:
                <br/>
                <input onChange={this.updatePoll.bind(this)} id="responses" className="form-control" type="text" placeholder="response" value={this.state.poll.responses}/>
                <p>NB: add multiple responses using ; </p>
             
                <br/>
                <button onClick={this.submitPoll.bind(this)} className="btn btn-info" >Send</button>
            </div>
          </div>
	      );
    }

    
}

    
export default CreatePoll