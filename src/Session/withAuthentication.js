
import AuthUserContext from './context'
import { withFirebase } from '../Firebase&Database';
import React, {Component} from 'react'
const withAuthentication = Component => {
  class WithAuthentication extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        authUser: null,
      };
      console.log('ran')
    }

    componentDidMount() {
      this.listener = this.props.firebase.auth.onAuthStateChanged(
        authUser => {
          authUser
            ? this.setState({ authUser })
            : this.setState({ authUser: null });
        },
      );
    }

    componentWillUnmount() {
      this.listener();
    }

    render() {
        console.log(this.state.authUser)
      return (
        <AuthUserContext.Provider value={this.state.authUser}>
          <Component {...this.props} authUser={this.state.authUser}/>
        </AuthUserContext.Provider>
      );
    }
  }

  return withFirebase(WithAuthentication);
};

export default withAuthentication;