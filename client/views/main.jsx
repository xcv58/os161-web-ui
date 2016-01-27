MainLayout = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    return subscribeUserData();
  },
  render() {
    const content = this.data.user ? this.props.content : <LoginComponent />;
    return (
      <div>
        <NavigationComponent user={this.data.user} />
        <main>
          <div className="container">
            {content}
          </div>
        </main>
        <footer>
          This is our footer
        </footer>
      </div>
    );
  }
});

WelcomeComponent = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    return {
      user: Meteor.user()
    };
  },
  render() {
    return (
      <div>
        <h1>Hello,
          &nbsp;
          {this.data.user ? this.data.user.services.auth0.name : 'guest'}
        </h1>
      </div>
    );
  }
});

LoginComponent = React.createClass({
  render() {
    return (
      <div>
        <button onClick={login}>Login</button>
      </div>
    );
  }
});
