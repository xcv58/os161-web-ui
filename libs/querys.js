findGroupByUserId = (userId) => {
    const selector = { members: { $in: [userId] }};
    return Groups.find(selector);
}

findOneGroupByUserId = (userId) => {
    const selector = { members: { $in: [userId] }};
    return Groups.findOne(selector);
}

findOneGroupByName = (name) => {
  const selector = {name: name};
  const group = Groups.findOne(selector);
  return group;
};

findUserByUserIds = (userIds) => {
  const selector = { _id: { $in: userIds }};
  return Meteor.users.find(selector);
};

insertGroup = (group) => {
  group.token = Random.hexString( 32 );
  check(group, GroupSchema);
  return Groups.insert(group);
};
