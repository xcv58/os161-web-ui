NavigationComponent = React.createClass({
  componentDidMount() {
    $(".button-collapse").sideNav({
      menuWidth: 300,
      edge: 'right',
      closeOnClick: true
    });
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
      return (<NavLinkComponent key={link.name} link={link} pathname={pathname}/>);
    });
    const loginOutButton = this.getLoginOutButton(this.props.user);
    return (
      <nav>
        <div className="nav-wrapper">
          <a href="#" data-activates="mobile-demo" className="button-collapse right">
            <i className="material-icons">menu</i>
          </a>
          <a className="brand-logo" href="/">CSE 421/521</a>
          <ul className="right hide-on-med-and-down">
            {links}
            {loginOutButton}
          </ul>
          <ul className="side-nav" id="mobile-demo">
            {links}
            {loginOutButton}
          </ul>
        </div>
      </nav>
    );
  }
});

NavLinkComponent = React.createClass({
  render() {
    const {name, href, newBadge} = this.props.link;
    return (
      <li className={this.props.pathname === href ? "active" : null}>
        <a href={href}>
          {name}
          {newBadge ? <span className="new badge">{newBadge}</span> : null}
        </a>
      </li>
    );
  }
});
