/** @jsx h */
import { h, Component } from 'preact';
import Logo from './Logo';
import Login from './Login';
import authentication from '../../services/authentication';
import Update from './Update';
import NewVersion from './NewVersion';
import Console from './Console';
import firebase from 'firebase';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: props.user,
      isChangingAuthentication: false,
      hasUpdate: props.hasUpdate,
      forceOpenConsole: false,
    };
    this.toggleLogin = this.toggleLogin.bind(this);
  }
  componentDidMount() {
    if (this.state.user) {
      authentication.getToken().then(token => {
        authentication.writeCookie(token);
      });
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.hasUpdate && !this.props.hasUpdate) {
      this.setState({
        hasUpdate: true,
      });
    }
  }
  toggleLogin() {
    this.setState({ isChangingAuthentication: true });
    if (this.state.user) {
      authentication.signOut().then(() => {
        authentication.clearCache();
        authentication.eraseCookie();
        this.setState({ isChangingAuthentication: false, user: null });
      });
    } else {
      authentication.signIn().then(user => {
        this.setState({
          isChangingAuthentication: false,
          user,
          forceOpenConsole: true,
        });
      });
    }
  }
  render() {
    return (
      <div className="App-wrapper">
        <Logo />
        <Login
          isChangingAuthentication={
            this.state.isChangingAuthentication || this.props.isAuthRedirected
          }
          isLoggedIn={Boolean(this.state.user)}
          toggleLogin={this.toggleLogin}
        />
        {this.state.hasUpdate ? <Update /> : null}
        {this.props.hasNewVersion ? <NewVersion /> : null}
        {this.state.user
          ? <Console
              user={this.state.user}
              forceOpen={this.state.forceOpenConsole}
            />
          : null}
      </div>
    );
  }
}

export default App;
