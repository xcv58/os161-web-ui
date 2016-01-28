Submissions = new Mongo.Collection('submissions');
Groups = new Mongo.Collection('groups');

ProfileSchema = new SimpleSchema({
  firstname: { type: String, min: 1 },
  lastname: { type: String, min: 1 }
});

GroupSchema = new SimpleSchema({
  _id: { type: String, optional: true },
  name: { type: String, min: 3, max: 1000 },
  members: { type: [String], min: 3, max: 1000, minCount: 1, maxCount: 2 },
  token: { type: String, min: 32, max: 32 },
  hide: { type: Boolean, optional: true }
});

GroupNameSchema = GroupSchema.pick(['name']);
GroupTokenSchema = GroupSchema.pick(['token']);
