MemberComponent = React.createClass({
  render() {
    const user = this.props.user;
    const {firstname, lastname} = user.profile;
    const {email, name, picture} = user.services.auth0;
    return (
      <li className="collection-item avatar">
      <img src={picture} alt={email} className="circle" />
      <span className="title">{firstname} {lastname}</span>
      <a href="#!" className="secondary-content"></a>
      <p>{email}</p>
      </li>
    );
  }
});

GroupInfoComponent = React.createClass({
  mixins: [ReactMeteorData, MeteorCallMixin],
  getMeteorData() {
    const group = this.props.group;
    const data = {users: [], ready: false};
    const handle = UserSubs.subscribe("users", group.members);
    if (handle.ready()) {
      data.users = findUserByUserIds(group.members).fetch();
      data.ready = true;
    }
    return data;
  },
  leaveGroup() {
    this.clicked();
    Meteor.call("leaveGroup", (err, res) => {
      this.reset();
      if (err) {
        console.log(err);
        Materialize.toast(`${err.reason}`, 5000, "red");
      } else {
        console.log(res);
        Materialize.toast(`You leaves group ${this.props.group.name}`, 5000, "green");
      }
    });
  },
  onMouseEnter(event) {
    const target = event.target;
    target.setSelectionRange(0, target.value.length)
  },
  onChange(event) {
  },
  render() {
    if (!this.data.ready) {
      return (
        <div className="col s12 m12 l8">
          <LoadingComponent />
        </div>
      )
    }
    const {group} = this.props;
    const {users} = this.data;
    const inviteLink = Meteor.absoluteUrl(`profile?groupname=${group.name}&token=${group.token}`);
    const invite = users.length === 1 ? (
      <div className="input-fields col s12 m12 l12">
        <label htmlFor="token">Invite Link</label>
        <input onMouseEnter={this.onMouseEnter} onChange={this.onChange}
               type="text" className="validate" value={inviteLink} />
      </div>
    ) : null;
    const members = users.map((user) => {
      return (
        <MemberComponent key={user._id} user={user} />
      );
    });
    const leaveGroupButton = (
      <div className="col s12 m12 l12">
        <button disabled={this.state.clicked}
                onClick={this.leaveGroup}
                style={profileItemStyle}
                className="waves-effect waves-light btn z-depth-2 red">
          Leave Group
        </button>
      </div>
    )
    return (
      <div className="col s12 m12 l8">
        {this.state.clicked ? <LoadingComponent /> : null}
        <div className="input-fields col s12 m12 l12">
          <label htmlFor="groupname" className="active">Group Name</label>
          <input onMouseEnter={this.onMouseEnter} onChange={this.onChange}
                 type="text" className="validate" value={group.name} />
        </div>
        <div className="input-fields col s12 m12 l12">
          <label htmlFor="token">Group Token</label>
          <input onMouseEnter={this.onMouseEnter} onChange={this.onChange}
                 type="text" className="validate" value={group.token} />
        </div>
        <div className="col s12 m12 l12">
          <ul className="collection">
            {members}
          </ul>
        </div>
        {invite}
        <div className="row center-align">
          {leaveGroupButton}
        </div>
      </div>
    );
  }
});

CreateJoinGroupComponent = React.createClass({
  mixins: [MeteorCallMixin],
  componentDidMount() {
    const {params, queryParams} = FlowRouter.current();
    const {groupname, token} = queryParams;
    if (groupname && token) {
      this.callJoinGroup(groupname, token);
    }
  },
  createGroup() {
    MaterializeModal.form({
      title: "Create new group!",
      bodyTemplate: "create-group",
      callback: (error, response) => {
        if (!response.submit) {
          Materialize.toast("Cancelled by user!", 5000, "red");
          this.reset();
          return;
        }
        const {groupname} = response.form;
        console.log("group name:", groupname);
        try {
          check({name: groupname}, GroupNameSchema);
        } catch (exception) {
          Materialize.toast(exception.message, 5000, "red");
          throw exception;
        }

        this.clicked();
        Meteor.call("createGroup", groupname, (err, res) => {
          this.reset();
          if (err) {
            console.log(err);
            Materialize.toast(`${err.reason}`, 5000, "red");
          } else {
            Materialize.toast(`Create group ${groupname}!`, 5000, "green");
          }
        });
      }
    });
  },
  joinGroup() {
    MaterializeModal.form({
      title: "Join group!",
      bodyTemplate: "join-group",
      callback: (error, response) => {
        if (!response.submit) {
          Materialize.toast("Cancelled by user!", 5000, "red");
          this.reset();
          return;
        }
        const {groupname, token} = response.form;
        this.callJoinGroup(groupname, token);
      }
    });
  },
  callJoinGroup(groupname, token) {
    try {
      check({name: groupname}, GroupNameSchema);
      check({token: token}, GroupTokenSchema);
    } catch (exception) {
      Materialize.toast(exception.message, 5000, "red");
      throw exception;
    }

    this.clicked();
    Meteor.call("joinGroup", groupname, token, (err, res) => {
      this.reset();
      if (err) {
        console.log(err);
        Materialize.toast(`${err.reason}`, 5000, "red");
      } else {
        Materialize.toast(`Join group ${groupname}!`, 5000, "green");
      }
    });
  },
  render() {
    return (
        <div className="col s12 m12 l8">
          {this.state.clicked ? <LoadingComponent /> : null}
          <div className="row center-align">
            <div className="col s12 m12 l6">
              <button disabled={this.state.clicked}
                      onClick={this.createGroup}
                      style={profileItemStyle}
                      className="waves-effect waves-light btn z-depth-2">
                Create a group
              </button>
            </div>
            <div className="col s12 m12 l6">
              <button disabled={this.state.clicked}
                      onClick={this.joinGroup}
                      style={profileItemStyle}
                      className="waves-effect waves-light btn z-depth-2">
                Join a group
              </button>
            </div>
          </div>
        </div>
      );
  }
})

GroupComponent = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    const user = this.props.user;
    const data = {ready: false};
    const handle = UserSubs.subscribe("group");
    if (handle.ready()) {
      data.group = findOneGroupByUserId(user._id);
      data.ready = true;
    }
    return data;
  },
  render() {
    if (!this.data.ready) {
      return (
        <div className="col s12 m12 l8">
          <LoadingComponent />
        </div>
      );
    }
    const user = this.props.user;
    if (this.data.group) {
      return <GroupInfoComponent group={this.data.group} />
    } else {
      return <CreateJoinGroupComponent user={user}/>
    }
  }
});
