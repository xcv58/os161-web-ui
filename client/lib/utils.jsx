UserSubs = new SubsManager();

logout = () => {
  Meteor.logout();
};

login = () => {
  lock.show();
};
