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
  componentDidMount() {
    editProfile();
  },
  render() {
    return (
      <div>
        <a onClick={editProfile} className="btn waves-effect waves-light">
          Edit Profile<i className="material-icons right">perm_identity</i>
        </a>
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
    return (
      <div>
        <image src={picture} />
        <p>{user.profile.firstname} {user.profile.lastname}</p>
        <p>{email}</p>
        <button onClick={editProfile}>Edit Profile</button>
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
