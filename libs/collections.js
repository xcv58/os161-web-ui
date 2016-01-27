Submissions = new Mongo.Collection('submissions');
Groups = new Mongo.Collection('groups');

ProfileSchema = new SimpleSchema({
  firstname: { type: String, min: 1 },
  lastname: { type: String, min: 1 }
});

GroupSchema = new SimpleSchema({
  name: { type: String, min: 3, max: 1000 },
  members: { type: [String], min: 3, max: 1000, minCount: 1, maxCount: 2 },
  visible: { type: Boolean }
});
