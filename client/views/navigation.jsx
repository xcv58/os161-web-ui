NavigationComponent = React.createClass({
  getLogoutButton() {
    return <span>
      &nbsp;
      <button onClick={logout}>Logout</button>
    </span>
  },
  getLoginButton() {
    return <span>
      &nbsp;
      <button onClick={login}>Login</button>
    </span>
  },
  getProfileLink() {
    return <span>
      &nbsp;
      <a href="/profile">Profile</a>
    </span>
  },
  render() {
    const user = this.props.user;
    return <p>
      Navigation:&nbsp;<a href="/">Home</a>
      {this.props.user ? this.getProfileLink() : null}
      {this.props.user ? this.getLogoutButton() : this.getLoginButton()}
    </p>
  }
});
