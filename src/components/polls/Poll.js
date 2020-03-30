// presentational componet
import React, { Component } from 'react';
import styles from '../layout/styles';
import { Link } from 'react-router';

class Poll extends Component {
    constructor(props) {
        super(props)
        this.state = {
            linkStyle: 'normal',
            currentUser: ''
        }
        this.onHover = this.onHover.bind(this)
        this.offHover = this.offHover.bind(this)
    }
    
    componentDidMount(){
        var curUsr = this.props.currentUser;
        this.setState({ currentUser : curUsr });
    }
    
    onHover(e) {
        this.setState({ linkStyle: 'hover' });
    }
    
    offHover() {
        this.setState({ linkStyle: 'normal' });
    }
    
    render() {
        
        const style = styles.zone; // needs to be inside the render func!
        
        return (
          <div style={this.state.currentUser == this.props.currentPoll.author ? style.containerOwner : style.container}>
				    <h2 style={style.header}>
    			    <Link to={`/Polldetailfull/${this.props.currentPoll._id}`}>{this.props.currentPoll.pollquestion}</Link>
				    </h2>
		        <br/>
		        <span>by {this.props.currentPoll.author}</span>
		        { this.state.currentUser == this.props.currentPoll.author ?
			        <Link className="btn" 
                style={this.state.linkStyle == 'normal' ? style.link : style.linkHover}
                  onMouseOver={this.onHover}
                  onMouseOut={this.offHover} 
                  to={`/editthepoll/${this.props.currentPoll._id}`}>Edit your poll</Link>
                : ''}
				  </div>);
    }
}

export default Poll;