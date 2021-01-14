// const { v4: uuid } = require("uuid");
const mongodb = require("mongodb");
const database = require("../util/database");

let members = [
  {
    id: "1",
    name: "JC",
    email: "jc@mail.com",
    status: "active",
  },
  {
    id: "2",
    name: "ABC",
    email: "abc@mail.com",
    status: "active",
  },
  {
    id: "3",
    name: "Mart",
    email: "mart@mail.com",
    status: "active",
  },
];

class Member {
  constructor(name, email) {
    // this.id = uuid();
    this.name = name;
    this.email = email;
    this.status = "active";
  }

  saveMember(callback) {
    let db = database.getDB();
    db.collection("members")
      .insertOne(this)
      .then((result) => {
        console.log("Insert: ", result);
      })
      .catch((err) => console.error(err));
    // members.push(this);
    callback(this);
  }

  static getAllMembers(callback) {
    let db = database.getDB();
    db.collection("members")
      .find({})
      .toArray((err, result) => {
        if (err) throw err;
        callback(result);
      });
    // callback(members);
  }

  static getOneMember(id, callback) {
    let db = database.getDB();
    db.collection("members")
      .findOne({ _id: new mongodb.ObjectID(id) })
      .then((result) => {
        callback(result);
      })
      .catch(err => {
        callback(err);
      })
    // const found = members.some((member) => member.id === id);

    // if (found) {
    //   callback(members.filter((member) => member.id === id));
    // } else {
    //   callback([]);
    // }
  }

  static updateMember(id, body, callback) {
    let db = database.getDB();
    db.collection("members").updateOne(
      { _id: new mongodb.ObjectID(id) },
      { $set: { ...body } },
      (err, response) => {
        callback(!!response.modifiedCount);
      }
    );
    // const found = members.some((member) => member.id === id);

    // if (found) {
    //     const memberToUpdate = members.find(member => member.id === id);
    //     const updatedMember = {
    //         ...memberToUpdate,
    //         ...body
    //     }
    //     callback([updatedMember]);
    // } else {
    //     callback([]);
    // }
  }

  static deleteMember(id, callback) {
    let db = database.getDB();
    db.collection("members").deleteOne(
      { _id: new mongodb.ObjectID(id) },
      (err, response) => {
        callback(!!response.deletedCount);
      }
    );
    // const found = members.some((member) => member.id === id);

    // if (found) {
    //     callback(members.filter(member => member.id !== id));
    // } else {
    //     callback([]);
    // }
  }
}

module.exports = Member;
