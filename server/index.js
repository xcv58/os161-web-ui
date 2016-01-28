Meteor.startup(function () {
});

Meteor.publish("userData", function() {
  if (this.userId) {
    const options = {fields: {'services': 1, 'profile': 1}};
    return Meteor.users.find({_id: this.userId}, options);
  } else {
    this.ready();
  }
});

Meteor.publish("group", function() {
  if (this.userId) {
    return findGroupByUserId(this.userId);
  } else {
    this.ready();
  }
});

Meteor.publish("users", function(userIds) {
  return findUserByUserIds(userIds);
});
