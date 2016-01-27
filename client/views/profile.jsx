ProfileComponent = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    return subscribeUserData();
  },
  render() {
    let user = this.data.user;
    if (!user) {
      return <LoginComponent />
    }
    if (!user.profile || this.props.query.edit === '1') {
      return <EditProfileComponent user={user} />;
    } else {
      return <ShowProfileComponent user={user} />;
    }
  }
});

EditProfileComponent = React.createClass({
  save() {
    let {firstname, lastname} = this.refs;
    const profile = {
      firstname: firstname.value,
      lastname: lastname.value
    };
    Meteor.call("updateProfile", profile, (err, res) => {
      if (err) {
        console.log(err);
      } else {
        console.log(res);
        FlowRouter.go("/profile");
      }
    });
  },
  render() {
    console.log("edit");
    const user = this.props.user;
    const profile = user && user.profile;
    const {email, name, picture} = user.services.auth0;
    let {firstname = "First name", lastname = "Last name"} = profile || {};
    return (
      <div>
        <p>{email}</p>
        <input type="text" ref="firstname" placeholder={firstname} />
        <br/>
        <input type="text" ref="lastname" placeholder={lastname} />
        <br/>
        <button onClick={this.save}>Save</button>
      </div>
    );
  }
});

ShowProfileComponent = React.createClass({
  edit() {
    FlowRouter.go("/profile?edit=1");
  },
  render() {
    const user = this.props.user;
    console.log("show");
    const {email, name, picture} = user.services.auth0;
    return (
      <div>
        <image src={picture} />
        <p>{user.profile.firstname} {user.profile.lastname}</p>
        <p>{email}</p>
        <button onClick={this.edit}>Edit Profile</button>
      </div>
    );
  }
})
