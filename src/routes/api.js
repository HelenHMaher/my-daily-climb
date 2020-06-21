const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectId;
const MONGODB_CONNECTION_STRING = process.env.DB;
//Example connection: MongoClient.connect(MONGODB_CONNECTION_STRING, function(err, db) {});

module.exports = function (app) {
  app
    .route("/api/climbs")

    .get(function (req, res) {
      //response will be array of book objects
      //json res format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]
      MongoClient.connect(MONGODB_CONNECTION_STRING, (err, client) => {
        const db = client.db("myDailyClimb");
        if (err) {
          console.log(`Database err: ${err}`);
        } else {
          console.log(`Successful database connection`);
          db.collection("climb")
            .find({})
            .toArray((err, climbs) => {
              if (err) return res.json(`could not find entries: ${err}`);
              const climbsArray = climbs.map((entry) => {
                let climb = {
                  _id: entry._id,
                  title: entry.climb_name,
                  commentcount: entry.num_of_comments,
                };
                return climb;
              });
              res.json(climbsArray);
            });
        }
      });
    })

    .post(function (req, res) {
      if (!req.body.title) return res.json("please submit a title");
      const climb = {
        climb_title: req.body.title,
        num_of_comments: 0,
        comments: [],
      };
      //response will contain new book object including atleast _id and title
      MongoClient.connect(MONGODB_CONNECTION_STRING, (err, client) => {
        const db = client.db("myDailyClimb");
        if (err) {
          console.log(`Database err: ${err}`);
        } else {
          console.log("Successful database connection");
          db.collection("climb").insertOne(climb, (err, doc) => {
            if (err) res.json(`could not update: ${err}`);
            const entry = { _id: doc.insertedId, title: climb.climb_title };
            res.json(entry);
          });
        }
      });
    })

    .delete(function (req, res) {
      //if successful response will be 'complete delete successful'
      MongoClient.connect(MONGODB_CONNECTION_STRING, (err, client) => {
        const db = client.db("myDailyClimb");
        if (err) {
          console.log(`Database err: ${err}`);
        } else {
          console.log("Successful database connection");
          db.collection("climb").deleteMany({}, (err, data) => {
            if (err) res.json(`could not delete: ${err}`);
            res.json("complete delete successful");
          });
        }
      });
    });

  app
    .route("/api/climbs/:id")
    .get(function (req, res) {
      const climbId = req.params.id;
      //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
      MongoClient.connect(MONGODB_CONNECTION_STRING, (err, client) => {
        const db = client.db("myDailyClimb");
        if (err) {
          console.log(`Database err: ${err}`);
        } else {
          console.log("Successful database connection");
          db.collection("climb")
            .find({ _id: new ObjectId(climbId) })
            .toArray((err, data) => {
              if (err) res.json(`could not find ${climbId} ${err}`);
              if (data[0]) {
                const climb = {
                  _id: data[0]._id,
                  title: data[0].climb_title,
                  comments: data[0].comments,
                };
                res.json(climb);
              } else {
                console.log(climbId);
                res.json(`no climb exists`);
              }
            });
        }
      });
    })

    .post(function (req, res) {
      const climbId = req.params.id;
      const comment = req.body.comment;
      //json res format same as .get
      MongoClient.connect(MONGODB_CONNECTION_STRING, (err, client) => {
        const db = client.db("myDailyClimb");
        if (err) {
          console.log(`Database err: ${err}`);
        } else {
          console.log("Successful database connection");
          db.collection("climb").findAndModify(
            { _id: new ObjectId(climbId) },
            {},
            { $inc: { num_of_comments: 1 }, $push: { comments: comment } },
            { new: true, upsert: false },
            (err, data) => {
              if (err) res.json(`could not update ${climbId} ${err}`);
              const climb = {
                _id: data.value._id,
                title: data.value.climb_title,
                comments: data.value.comments,
              };
              res.json(climb);
            }
          );
        }
      });
    })

    .delete(function (req, res) {
      const climbId = req.params.id;
      //if successful response will be 'delete successful'
      MongoClient.connect(MONGODB_CONNECTION_STRING, (err, client) => {
        const db = client.db("myDailyClimb");
        if (err) {
          console.log(`Database err: ${err}`);
        } else {
          console.log("Successful database connection");
          db.collection("climb").findOneAndDelete(
            { _id: new ObjectId(climbId) },
            (err, doc) => {
              if (err) {
                res.send(`could not delete ${climbId} ${err}`);
              } else {
                doc.value
                  ? res.json(`delete successful`)
                  : res.json(`no climb exists`);
              }
            }
          );
        }
      });
    });
};
