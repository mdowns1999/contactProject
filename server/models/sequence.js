const mongoose = require('mongoose');

const sequenceSchema = mongoose.Schema({
    id: {type: String, required: true},
    maxDocumentId: {type: String, required: true},
    maxMessageId: {type: String, required: true},
    maxContactId: {type: String, required: true},
})

module.exports = mongoose.model('Sequence', sequenceSchema)



// {
//     "_id": {
//       "$oid": "649b0e9867ffb17ec29e7f00"
//     },
//     "maxDocumentId": 100,
//     "maxMessageId": 101,
//     "maxContactId": 101
//   }