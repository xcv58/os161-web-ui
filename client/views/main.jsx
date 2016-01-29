MainLayout = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    return subscribeUserData();
  },
  render() {
    if (!this.data.ready) {
      return (<LoadingComponent />);
    }
    const content = this.data.user ? this.props.content : <LoginComponent />;
    return (
      <div>
        <NavigationComponent user={this.data.user} />
        <main>
          <div className="container">
            {content}
          </div>
        </main>
        <FooterComponent />
      </div>
    );
  }
});

FooterComponent = React.createClass({
  render() {
    return (
      <footer className="page-footer">
        <div className="container">
          <div className="row">
            <div className="col l6 s12">
              <h5 className="white-text">Footer Content</h5>
              <p className="grey-text text-lighten-4">You can use rows and columns here to organize your footer content.</p>
            </div>
            <div className="col l4 offset-l2 s12">
              <h5 className="white-text">Links</h5>
              <ul>
                <li><a className="grey-text text-lighten-3" href="#!">Link 1</a></li>
                <li><a className="grey-text text-lighten-3" href="#!">Link 2</a></li>
                <li><a className="grey-text text-lighten-3" href="#!">Link 3</a></li>
                <li><a className="grey-text text-lighten-3" href="#!">Link 4</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footer-copyright">
          <div className="container">
            © 2016 Copyright Text
          </div>
        </div>
      </footer>
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
        <h1>Hello</h1>
        <h1>Hello</h1>
        <h1>Hello</h1>
        <h1>Hello</h1>
        <h1>Hello</h1>
      </div>
    );
  }
});

LoginComponent = React.createClass({
  render() {
    return (
      <div className="row">
        <div className="col s12">
          <div className="center-align">
            <a onClick={login} className="btn-large waves-effect waves-light">
              Login<i className="material-icons right">group</i>
            </a>
          </div>
        </div>
      </div>
    );
  }
});

LoadingComponent = React.createClass({
  render() {
    return (
      <div className="row">
        <div className="progress">
          <div className="indeterminate"></div>
          </div>
      </div>
    );
  }
})
