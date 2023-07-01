var express = require('express');
var router = express.Router();

const sequenceGenerator = require('./sequenceGenerator');
const Message = require('../models/message');

//Get Messages
router.get('/', (req, res, next) => {
      Message.find().then(messages => {
          res.status(200).json({
              message: "Got Messages Successfully!",
              messages: messages
          })
      }).catch(error => {
          res.status(500).json({
             message: 'An error occurred',
             error: error
           });
       });
  
   });
  
   //Post a Message
   router.post('/', (req, res, next) => {
      const maxMessageId = sequenceGenerator.nextId("messages");
    
    
      const message = new Message({
        id: maxMessageId,
        subject: req.body.subject,
        msgText: req.body.msgText,
        sender: req.body.sender
      });
    
      message.save().then(async createdMessage => {const newMessage 
        = await createdMessage.populate("sender");
        res.status(201).json({
            message: 'Document added successfully',
            document: createdMessage
          }) 
        }).catch(error => {
            res.status(500).json({
               message: 'An error occurred',
               error: error
             });
         });

    //   message.save()
    //     .then(createdMessage => {
    //       res.status(201).json({
    //         message: 'Document added successfully',
    //         document: createdMessage
    //       });
    //     })
    //     .catch(error => {
    //        res.status(500).json({
    //           message: 'An error occurred',
    //           error: error
    //         });
    //     });
    });
  
  
    // //Update a Document
    // router.put('/:id', (req, res, next) => {
    //   Message.findOne({ id: req.params.id })
    //     .then(message => {
    //         message.subject = req.body.subject;
    //         message.msgText = req.body.msgText;
    //         message.sender = req.body.sender;
    
    //       Message.updateOne({ id: req.params.id }, message)
    //         .then(result => {
    //           res.status(204).json({
    //             message: 'Message updated successfully'
    //           })
    //         })
    //         .catch(error => {
    //            res.status(500).json({
    //            message: 'An error occurred',
    //            error: error
    //          });
    //         });
    //     })
    //     .catch(error => {
    //       res.status(500).json({
    //         message: 'Message not found.',
    //         error: { document: 'Message not found'}
    //       });
    //     });
    // });
  
    // //Delete a Document
    // router.delete("/:id", (req, res, next) => {
    //   Message.findOne({ id: req.params.id })
    //     .then(message => {
    //       Message.deleteOne({ id: req.params.id })
    //         .then(result => {
    //           res.status(204).json({
    //             message: "Document deleted successfully"
    //           });
    //         })
    //         .catch(error => {
    //            res.status(500).json({
    //            message: 'An error occurred',
    //            error: error
    //          });
    //         })
    //     })
    //     .catch(error => {
    //       res.status(500).json({
    //         message: 'Message not found.',
    //         error: { document: 'Message not found'}
    //       });
    //     });
    // });


module.exports = router; 