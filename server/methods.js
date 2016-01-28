const checkLogin = (userId) => {
  if (!userId) {
    throw new Meteor.Error(401, "not login!");
  }
};

const checkNotInGroup = (userId) => {
  const cursor = findGroupByUserId(userId);
  if (cursor.count() > 0) {
    throw new Meteor.Error(409, "Already in a group!");
  }
};

Meteor.methods({
  "updateProfile": function(profile) {
    // Meteor._sleepForMs(3000); //to simulate longer response sleep for 2 seconds
    checkLogin(this.userId);
    check(profile, ProfileSchema);
    return Meteor.users.update(this.userId, {$set: {"profile": profile}});
  },
  "createGroup": function(name) {
    // Meteor._sleepForMs(3000); //to simulate longer response sleep for 2 seconds
    checkLogin(this.userId);
    checkNotInGroup(this.userId);
    // TODO: make sure user is not in a group
    let group = findOneGroupByName(name);
    if (group) {
      throw new Meteor.Error(409, `Group ${name} already exists!`);
    }

    group = {
      name: name,
      members: [this.userId]
    }
    return insertGroup(group);
  },
  "joinGroup": function(name, token) {
    // Meteor._sleepForMs(3000); //to simulate longer response sleep for 2 seconds
    const {userId} = this;
    checkLogin(userId);
    checkNotInGroup(userId);
    const group = findOneGroupByName(name);
    if (!group) {
      throw new Meteor.Error(404, `Group ${name} not found!`);
    }
    if (group.members.length === 2) {
      throw new Meteor.Error(403, `Group ${name} is full!`);
    }
    if (group.token !== token) {
      throw new Meteor.Error(403, `Group ${name} token is not ${token}!`);
    }
    group.members.push(userId);
    check(group, GroupSchema);
    return Groups.update(group._id, group);
  },
  "leaveGroup": function() {
    // Meteor._sleepForMs(3000); //to simulate longer response sleep for 2 seconds
    const userId = this.userId;
    checkLogin(userId);
    const group = findOneGroupByUserId(userId);
    if (!group) {
      throw new Meteor.Error(404, `You are not in a group!`);
    }
    if (group.members.length === 1) {
      console.log(`User ${userId} destroy group: ${group.name}`);
      return Groups.remove(group._id);
    }
    console.log(`User ${userId} leaves group: ${group.name}`);
    const selector = { members: { $in: [this.userId] }};
    const options = { $pull: { members: this.userId }};
    return Groups.update(selector, options);
  }
});
