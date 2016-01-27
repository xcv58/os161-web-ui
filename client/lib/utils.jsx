UserSubs = new SubsManager();

subscribeUserData = function() {
    const data = {};
    const handle = UserSubs.subscribe("userData");
    if (handle.ready()) {
      data.user = Meteor.user();
    }
    return data;
}

logout = () => {
  Meteor.logout();
};

login = () => {
  lock.show();
};
