NavigationComponent = React.createClass({
  getLogoutButton() {
    return (
      <li>
        <a onClick={logout}>Logout</a>
      </li>
    );
  },
  getLoginButton() {
    return (
      <li>
        <a href="" onClick={login}>Login</a>
      </li>
    );
  },
  render() {
    const user = this.props.user;
    const navbarLinks = [
      {href: "/", name: "Home"},
    ];
    const {path, context: {pathname}} = FlowRouter.current();
    if (user) {
      navbarLinks.push(
        {name: "Profile", href: "/profile"},
        {},
        {name: "ASST0", href: "/asst0"},
        {name: "ASST1", href: "/asst1"},
        {name: "ASST2", href: "/asst2"},
        {name: "ASST3", href: "/asst3"}
      );
    }
    const links = navbarLinks.map((link) => {
      const {name, href} = link;
      if (name) {
        return (
          <li className={pathname === href ? "active" : null}>
          <a href={href}>{name}</a>
          </li>
        );
      } else {
        return (
          <li className="divider-vertical"></li>
        )
      }
    });

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
