// var Sequence = require('../models/sequence');

// var maxDocumentId;
// var maxMessageId;
// var maxContactId;
// var sequenceId = null;

// function SequenceGenerator() {

//   Sequence.findOne()
//     .exec(function(err, sequence) {
//       if (err) {
//         return res.status(500).json({
//           title: 'An error occurred',
//           error: err
//         });
//       }

//       sequenceId = sequence._id;
//       maxDocumentId = sequence.maxDocumentId;
//       maxMessageId = sequence.maxMessageId;
//       maxContactId = sequence.maxContactId;
//     });
// }

// SequenceGenerator.prototype.nextId = function(collectionType) {

//   var updateObject = {};
//   var nextId;

//   switch (collectionType) {
//     case 'documents':
//       maxDocumentId++;
//       updateObject = {maxDocumentId: maxDocumentId};
//       nextId = maxDocumentId;
//       break;
//     case 'messages':
//       maxMessageId++;
//       updateObject = {maxMessageId: maxMessageId};
//       nextId = maxMessageId;
//       break;
//     case 'contacts':
//       maxContactId++;
//       updateObject = {maxContactId: maxContactId};
//       nextId = maxContactId;
//       break;
//     default:
//       return -1;
//   }

//   Sequence.update({_id: sequenceId}, {$set: updateObject},
//     function(err) {
//       if (err) {
//         console.log("nextId error = " + err);
//         return null
//       }
//     });

//   return nextId;
// }

// module.exports = new SequenceGenerator();

// const Sequence = require("../models/sequence");

// async function SequenceGenerator(collectionType) {
// 	const sequenceList = await Sequence.find();
// 	let sequence = sequenceList[0];

// 	let nextId;

// 	switch (collectionType) {
// 		case "documents":
// 			sequence.maxDocumentId++;
// 			nextId = sequence.maxDocumentId;
// 			break;
// 		case "messages":
// 			sequence.maxMessageId++;
// 			nextId = sequence.maxMessageId;
// 			break;
// 		case "contacts":
// 			sequence.maxContactId++;
// 			nextId = sequence.maxContactId;
// 			break;
// 		default:
// 			return -1;
// 		}

// 	Sequence.updateOne({ _id: sequence._id }, sequence)
// 		.then((response, error) => {
// 			if (error) {
// 				console.log("Error: " + error);
// 				return null
// 			}
// 		});
// 		console.log(nextId)
// 		console.log(typeof(nextId))
// 	return nextId;
// }

// module.exports = SequenceGenerator;

///////////////////////////////////TEST///////////////////////////////////////////////
var Sequence = require("../models/sequence");

var maxDocumentId;
var maxMessageId;
var maxContactId;
var sequenceId = null;

function SequenceGenerator() {
  Sequence.findOne()
    .exec()
    .then((sequence) => {
      sequenceId = sequence._id;
      maxDocumentId = sequence.maxDocumentId;
      maxMessageId = sequence.maxMessageId;
      maxContactId = sequence.maxContactId;
    })
    .catch((err) => {
      return res.status(500).json({
        title: "An error occurred",
        error: err,
      });
    });
}
SequenceGenerator.prototype.nextId =  function (collectionType) {
  var updateObject = {};
  var nextId;
  switch (collectionType) {
    case "documents":
      maxDocumentId++;
      updateObject = { maxDocumentId: maxDocumentId };
      nextId = maxDocumentId;
      break;
    case "messages":
      maxMessageId++;
      updateObject = { maxMessageId: maxMessageId };
      nextId = maxMessageId;
      break;
    case "contacts":
      maxContactId++;
      updateObject = { maxContactId: maxContactId };
      nextId = maxContactId;
      break;
    default:
      return -1;
  }
  Sequence.updateOne({ _id: sequenceId }, { $set: updateObject })
  .then(result => console.log(result))
  .catch((err) => {
        console.log("nextId error = ", err);
        return null;
  });
  return nextId;
};
module.exports = new SequenceGenerator();