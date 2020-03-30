import React, { Component } from 'react';
import styles from '../layout/styles';
import EditPollDetail from './EditPollDetail';
import NewPollResponse from './NewPollResponse';

class PollResponse extends Component {
  constructor(props) {
    super(props);
      this.state = {
              valid: true,
              addMode: false
      };
      // BIND EVENTS!!!
      this.showAddOpt = this.showAddOpt.bind(this);
      this.cancelAddOpt = this.cancelAddOpt.bind(this);
  }

	// bound function - renders each answer - PollDetail component
  eachPollResponse = (resp) => {
 		const remove = () => {} ;
		return (
      <EditPollDetail key={resp.respID} 
				id={resp.respID} submit={this.props.save} 
				changetext={this.props.onChange}
				editMode={this.state.editing} 
				onRemove={this.props.deleteOpt} 
        respText={resp.response}>
				{resp.response}
      </EditPollDetail>);
	}
	
	showAddOpt() {
		console.log('add new response func')
		this.setState({ addMode: true });
	}
	cancelAddOpt() {
		// Change
		this.setState({ addMode: false });
	}

  render() {
    const style = styles.editPoll;
      return (
        <div key={this.props.thePollId}>
          <div style={style.responses}>
              {this.props.poll.responses.map(this.eachPollResponse)}
          </div>
          <div>
            <button className="btn-sm btn-success"
              style={style.buttonSpace} 
              onClick={this.showAddOpt}>
              <i className="fa fa-plus" aria-hidden="true"></i>
              &nbsp;New response</button>
            {this.state.addMode ? 
              <NewPollResponse 
                adding={this.state.addMode} 
                cancel={this.cancelAddOpt}
                saveNew={this.props.addNew} /> :
            '' }
          </div>
        </div>
      )
  }
}

PollResponse.defaultProps = {
	someResponses: [{ _id:1, response: "not"},
                    { _id:2, response:"loaded"},
                    { _id:3, response:"yet"}
                   ]		
}

PollResponse.propTypes = {
	someResponses: React.PropTypes.array
}

export default PollResponse;