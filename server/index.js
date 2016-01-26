Meteor.startup(function () {
});

Meteor.publish("userData", function () {
  if (this.userId) {
    return Meteor.users.find({_id: this.userId},
      {fields: {'services': 1, 'things': 1}});
    } else {
      this.ready();
    }
  });
