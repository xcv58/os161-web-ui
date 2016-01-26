const ProfileSchema = new SimpleSchema({
  firstname: { type: String },
  lastname: { type: String }
});

Meteor.methods({
  "updateProfile": function(profile) {
    if (!this.userId) {
      throw new Meteor.Error('not login!');
    }
    check(profile, ProfileSchema);
    return Meteor.users.update(this.userId, {$set: {"profile": profile}});
  }
});
