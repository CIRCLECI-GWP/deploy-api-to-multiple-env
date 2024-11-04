const { MongoMemoryServer } = require("mongodb-memory-server");
const { MongoClient } = require("mongodb");
const data = require("./data");

let database = null;
let mongo = null;

async function startDatabase() {
  mongo = await MongoMemoryServer.create();
  const mongoDBURL = mongo.getUri();
  const connection = await MongoClient.connect(mongoDBURL, {});

  //Seed Database
  if (!database) {
    database = connection.db();
    await database.collection("users").insertMany(data.Users);
  }

  return database;
}

async function stopDatabase() {
  if (mongo) {
    await mongo.stop();
  }
}

module.exports = {
  startDatabase,
  stopDatabase,
};
