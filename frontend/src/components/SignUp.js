import React, { Component } from 'react'
import { Grid, Segment, Button } from 'semantic-ui-react'

export default class SignUp extends Component {
  render() {
    return (
      <div>
        <form>
          <Segment className="form-segment">
            <Grid columns='equal'>
              <Grid.Row>
                <Grid.Column>
                  <input name="firstName" placeholder="First Name" onChange={this.props.handleInput} />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  <input name="lastName" placeholder="Last Name" onChange={this.props.handleInput} />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  <input name="email" placeholder="Email" onChange={this.props.handleInput} />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  <input name="username" placeholder="Username" onChange={this.props.handleInput} />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  <input type="password" name="password" placeholder="Password" onChange={this.props.handleInput} />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  <Button fluid name="submit" onClick={this.props.handleSignUp} secondary>
                    Submit
                  </Button>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Segment>
        </form>
      </div>
    )
  }
}
