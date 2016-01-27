// const checkUser()
Meteor.methods({
  "updateProfile": function(profile) {
    if (!this.userId) {
      throw new Meteor.Error('not login!');
    }
    check(profile, ProfileSchema);
    return Meteor.users.update(this.userId, {$set: {"profile": profile}});
  },
  "createGroup": function(name) {
    // TODO: make sure user is not in a group
    // TODO: check name is valid String
    // TODO: check group contains itself.
  },
  "joinGroup": function(name) {
    // TODO: make sure user is not in a group
    // TODO: check name is valid String
    // TODO: check group contains itself.
  },
  "leaveGroup": function() {
    // TODO: make sure user is in certain group
    // TODO: make sure
  }
});
