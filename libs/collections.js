Submissions = new Mongo.Collection('submissions');
Groups = new Mongo.Collection('groups');

ProfileSchema = new SimpleSchema({
  firstname: { type: String, min: 1 },
  lastname: { type: String, min: 1 }
});
