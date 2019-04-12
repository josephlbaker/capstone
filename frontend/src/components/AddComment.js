import React, { Component } from 'react'
import { Container, Segment, Button, Menu } from 'semantic-ui-react'
import '../styles/AddComment.css';

export default class AddComment extends Component {

  render() {
    return (
      <Container>
        <Segment>
          <div className="new-post">
            <h2>Add a Comment</h2>
            <form onSubmit={this.props.handleNewComment}>
              <input className="text-area" name="content" onChange={this.props.handleInput} />
              <Button size='mini'><button className="cancel-button" onClick={this.props.cancelComment}>Cancel</button></Button>
              <Button primary size='mini'><input className="submit-button" name="submit" type="submit" value="Submit" /></Button>
            </form>
          </div>
        </Segment>
      </Container>
    )
  }
}
