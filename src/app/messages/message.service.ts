import {EventEmitter, Injectable} from '@angular/core';
import { Message } from './message.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
 ///////////////////////MONGODB//////////////////////////////////////////////////////
 export class MessageService {

   messageChangedEvent = new Subject<Message[]>();

  messages: Message[] =[];
  maxMessageId: number;
  constructor(private http: HttpClient) {
     this.maxMessageId = this.getMaxId();
  }



  getMessages(): Message[] {
    console.log('MONGO GET MESSAGES');
     this.http
     .get<{message: string, messages: Message[]}>(
              'http://localhost:3000/messages'
            )
       .subscribe(
         // success method
         (response) => {
          this.messages = response.messages.sort();
           this.maxMessageId = this.getMaxId();
           this.messageChangedEvent.next(this.messages.slice());
         },
         (error: any) => {
           console.log(error.message);
         }
       );
 
     return this.messages.slice();
   }


  getMessage(id: string): Message {
   return this.messages.find((message)=> message.id === id)
  } 

    addMessage(message: Message) {
    console.log('MONGO ADD MESSAGE');
    if (!message) {
      return;
    }

    // make sure id of the new Document is empty
    message.id = '';

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    // add to database
    this.http.post<{ message: string, newMessage: Message }>('http://localhost:3000/messages',
      message,
      { headers: headers })
      .subscribe(
        (responseData) => {
          // add new document to documents
          this.messages.push(responseData.newMessage);
          this.sortAndSend();
        }
      );
  }


  getMaxId(): number {
     let maxId = 0;
 
     this.messages.forEach((message) => {
       let currentId = parseInt(message.id);
       if (currentId > maxId) {
         maxId = currentId;
       }
     });
 
     return maxId;
   }

     sortAndSend() {
    this.messageChangedEvent.next(this.messages.slice());
  }
}


// export class MessageService {

//    //messageChangedEvent = new EventEmitter<Message[]>();
//     messageChangedEvent = new Subject<Message[]>();

//    messages: Message[] =[];
//    maxMessageId: number;
//    constructor(private http: HttpClient) {
//       //this.messages = MOCKMESSAGES;
//       this.maxMessageId = this.getMaxId();
//    }

//   //  getMessages(): Message[]{
//   //   return this.messages.slice();
//   //  }


//    getMessages(): Message[] {
//     console.log('FIREBASE MESSAGES')
//       this.http
//         .get<Message[]>(
//           'https://cms-contacts-project-default-rtdb.firebaseio.com/messages.json'
//         )
//         .subscribe(
//           // success method
//           (messages: Message[]) => {
//             this.messages =messages.sort();
//             this.maxMessageId = this.getMaxId();
//             this.messageChangedEvent.next(this.messages.slice());
//           },
//           (error: any) => {
//             console.log(error.message);
//           }
//         );
  
//       return this.messages.slice();
//     }

  
//     storeMessages(){
//      let messageList = JSON.stringify(this.messages);
//      this.http.put('https://cms-contacts-project-default-rtdb.firebaseio.com/messages.json', messageList,
//      {
//         headers: new HttpHeaders({
//            "Content-Type": "application/json"
//         })
//      }).subscribe(
//         () =>{
//            this.messageChangedEvent.next(this.messages.slice());
//         }
//      )
//     }
  




//    // for(const message of this.messages){
//     //     if(message.id == id)
//     //     return message;
//     // }
//     // return null;



//    getMessage(id: string): Message {
//     return this.messages.find((message)=> message.id === id)
//    } 

//    addMessage(message: Message){
//     this.messages.push(message);
//     //this.messageChangedEvent.next(this.messages.slice());
//     this.storeMessages();
//    }

//    getMaxId(): number {
//       let maxId = 0;
  
//       this.messages.forEach((message) => {
//         let currentId = parseInt(message.id);
//         if (currentId > maxId) {
//           maxId = currentId;
//         }
//       });
  
//       return maxId;
//     }

// }




