Meteor.startup(function () {
});

Meteor.publish("userData", function () {
  if (this.userId) {
    const options = {fields: {'services': 1, 'profile': 1}};
    return Meteor.users.find({_id: this.userId}, options);
  } else {
    this.ready();
  }
});
