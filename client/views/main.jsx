const logout = () => {
  Meteor.logout();
};

const login = () => {
  lock.show();
};

MainLayout = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    let data = {};
    let handle = Meteor.subscribe("userData");
    if (handle.ready()) {
      data.user = Meteor.user();
    }
    return data;
  },
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
  render() {
    console.log(this.props.user);
    return <div>
      <header>
        This is our header
      </header>
      <p>
        Navigation:&nbsp;<a href="/">Home</a>
        {this.data.user ? this.getLogoutButton() : this.getLoginButton()}
      </p>
      <main>
        {this.data.user ? this.props.content : <LoginComponent />}
      </main>
      <footer>
        This is our footer
      </footer>
    </div>
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
    return <div>
      <h1>Hello,
      &nbsp;
      {this.data.user ? this.data.user.services.auth0.name : 'guest'}
      </h1>
    </div>
  }
});

ProfileComponent = React.createClass({
  render() {
    return <div>
      <h1>Hello,
      &nbsp;
      </h1>
    </div>
  }
});

LoginComponent = React.createClass({
  render() {
    return <div>
      <button onClick={login}>Login</button>
    </div>
  }
});
