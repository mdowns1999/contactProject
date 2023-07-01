const mongoose = require('mongoose');

const documentSchema = mongoose.Schema({
    id: {type: String, required: true},
    name: {type: String, required: true},
    url: {type: String, required: true},
    children: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Document' }]
})

module.exports = mongoose.model('Document', documentSchema)



// _id
// 58cb2ab6a187c5aa1124e310
// id
// "10"
// name
// "CIT 460 - Enterprise Development"
// url
// "https://rkjackson.wordpress.com/"

// children
// Array
// description
// null