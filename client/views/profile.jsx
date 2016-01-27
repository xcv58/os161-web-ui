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
      <div className="row">
        <div className="col s12">
          <a onClick={editProfile} className="btn waves-effect waves-light">
            Edit Profile<i className="material-icons right">perm_identity</i>
          </a>
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

const profileItemStyle = {
  width: '80%',
  WebkitTransition: 'all',
  msTransition: 'all'
};

ShowProfileComponent = React.createClass({
  getGroupComponent(group) {
    if (group) {
      const members = group.members.map((member) => {
        return (
          <li className="collection-item avatar">
          <img src="https://s.gravatar.com/avatar/ba5297a43b1a894e8980ee3898cbed9d?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fi.png" alt="" className="circle" />
          <span className="title">Title</span>
          <p>First Line <br/>
            Second Line
          </p>
          <a href="#!" className="secondary-content"><i className="material-icons">grade</i></a>
          </li>
        );
      })
      return (
        <div className="col s12 m12 l8">
          <div className="col s12 m12 l12">
            <p>Your Group: {group.name}</p>
          </div>
          <div className="col s12 m12 l12">
            <ul className="collection">
              {members}
            </ul>
          </div>
          <div className="row center-align">
            <div className="col s12 m12 l12">
              <button style={profileItemStyle} className="waves-effect waves-light btn z-depth-2 red">
                Leave Group
              </button>
            </div>
          </div>
        </div>
      );
    }
    return (
        <div className="col s12 m12 l8">
          <div className="row center-align">
            <div className="col s12 m12 l6">
              <button style={profileItemStyle} className="waves-effect waves-light btn z-depth-2">
                Create a group
              </button>
            </div>
            <div className="col s12 m12 l6">
              <button style={profileItemStyle} className="waves-effect waves-light btn z-depth-2">
                Join a group
              </button>
            </div>
          </div>
        </div>
      );
  },
  render() {
    const user = this.props.user;
    const {email, name, picture} = user.services.auth0;

    const itemClass = "chip z-depth-2 truncate";

    const group = {
      name: "123",
      members: [
        "abcd",
        "defg"
      ]
    };
    const groupComponent = this.getGroupComponent(group);
    const notInGroup = this.getGroupComponent(false);

    return (
      <div className="row">
        <div className="col s12 m12 l4">
          <div className="center-align">
            <image src={picture} style={profileItemStyle} className="avatar center-align circle z-depth-2" />
            <p style={profileItemStyle} className={itemClass}>
              {user.profile.firstname} {user.profile.lastname}
            </p>
            <p style={profileItemStyle} className={itemClass}>{email}</p>
            <button style={profileItemStyle} onClick={editProfile} className="waves-effect waves-light btn z-depth-2">
              Edit Profile
            </button>
          </div>
        </div>
        {groupComponent}
        {notInGroup}
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
