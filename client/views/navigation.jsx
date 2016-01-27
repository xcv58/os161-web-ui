NavigationComponent = React.createClass({
  componentDidMount() {
    $(".button-collapse").sideNav();
  },
  getLoginOutButton(user) {
    const className = "waves-effect waves-light btn";
    if (user) {
      return (
        <li onClick={logout}>
          <a className={className}>Logout</a>
        </li>
      );
    } else {
      return (
        <li onClick={login}>
          <a className={className}>Login</a>
        </li>
      );
    }
  },
  render() {
    const user = this.props.user;
    const navbarLinks = [
      {href: "/", name: "Home"},
    ];
    const {path, context: {pathname}} = FlowRouter.current();
    if (user) {
      const profile = {name: "Profile", href: "/profile"};
      if (!user.profile) {
        profile.newBadge = 1;
      }
      navbarLinks.push(
        profile,
        {name: "ASST0", href: "/asst0"},
        {name: "ASST1", href: "/asst1"},
        {name: "ASST2", href: "/asst2"},
        {name: "ASST3", href: "/asst3"}
      );
    }
    const links = navbarLinks.map((link) => {
      const {name, href, newBadge} = link;
      if (name) {
        return (
          <li className={pathname === href ? "active" : null}>
            <a href={href}>
              {name}
              {newBadge ? <span className="new badge">{newBadge}</span> : null}
            </a>
          </li>
        );
      } else {
        return (
          <li className="divider-vertical"></li>
        )
      }
    });
    const loginOutButton = this.getLoginOutButton(this.props.user);
    links.push(loginOutButton);
    return (
      <nav>
        <div className="nav-wrapper">
          <a href="#" data-activates="mobile-demo" className="button-collapse">
            <i className="material-icons">menu</i>
          </a>
          <a className="brand-logo" href="/">CSE 421/521</a>
          <ul className="right hide-on-med-and-down">
            {links}
          </ul>
          <ul className="side-nav" id="mobile-demo">
            {links}
          </ul>
        </div>
      </nav>
    );
    return (
      <nav className="navbar navbar-default" role="navigation">
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              </button>
              <a className="navbar-brand" href="/">CSE 421/521</a>
          </div>
          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav">
              {links}
            </ul>
            <ul className="nav navbar-nav navbar-right">
              {this.props.user ? this.getLogoutButton() : this.getLoginButton()}
            </ul>
          </div>
        </div>
      </nav>
    );
  }
});
