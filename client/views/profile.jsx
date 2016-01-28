ProfileComponent = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    return subscribeUserData();
  },
  render() {
    if (!this.data.ready) {
      return (<LoadingComponent />);
    }
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
  componentDidMount() {
    editProfile();
  },
  render() {
    return (
      <div className="row">
        <div className="col s12">
          <div className="center-align">
            <a onClick={editProfile} className="btn-large waves-effect waves-light">
              Edit Profile<i className="material-icons right">perm_identity</i>
            </a>
          </div>
        </div>
      </div>
    );
  }
});

const editProfile = function() {
  MaterializeModal.form({
    title: "Update your profile!",
    bodyTemplate: "profile",
    callback: function(error, response) {
      if (!response.submit) {
        Materialize.toast("Cancelled by user!", 5000, "red");
        return;
      }
      const {firstname, lastname} = response.form;
      const profile = {
        firstname: firstname,
        lastname: lastname
      };
      try {
        check(profile, ProfileSchema);
      } catch (exception) {
        Materialize.toast(exception.message, 5000, "red");
        throw exception;
      }

      Meteor.call("updateProfile", profile, (err, res) => {
        if (err) {
          console.log(err);
          Materialize.toast(`${err.reason}`, 5000, "red");
        } else {
          Materialize.toast(`updated ${firstname} ${lastname}`, 5000, "green");
        }
      });
    }
  });
}

ShowProfileComponent = React.createClass({
  render() {
    const user = this.props.user;
    const {email, name, picture} = user.services.auth0;

    const itemClass = "chip z-depth-2 truncate";

    return (
      <div className="row">
        <div className="col s12 m12 l4">
          <div className="center-align">
            <div className="col s12">
              <image src={picture} style={profileItemStyle} className="avatar-large center-align circle z-depth-2" />
            </div>
            <p style={profileItemStyle} className={itemClass}>
              {user.profile.firstname} {user.profile.lastname}
            </p>
            <p style={profileItemStyle} className={itemClass}>{email}</p>
            <button style={profileItemStyle} onClick={editProfile} className="waves-effect waves-light btn z-depth-2">
              Edit Profile
            </button>
          </div>
        </div>
        <GroupComponent user={user}/>
      </div>
    );
  }
})

Template.profile.helpers({
  profile: function() {
    const user = Meteor.user();
    const profile = user && user.profile;
    const {email, name, picture} = user.services.auth0;
    let {firstname, lastname} = profile || {};
    return {
      firstname: firstname,
      lastname: lastname,
      email: email
    };
  }
});
