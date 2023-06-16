import {EventEmitter, Injectable} from '@angular/core';
import { Message } from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

   //messageChangedEvent = new EventEmitter<Message[]>();
    messageChangedEvent = new Subject<Message[]>();

   messages: Message[] =[];
   maxMessageId: number;
   constructor(private http: HttpClient) {
      //this.messages = MOCKMESSAGES;
      this.maxMessageId = this.getMaxId();
   }

  //  getMessages(): Message[]{
  //   return this.messages.slice();
  //  }


   getMessages(): Message[] {
      console.log('MADE IT');
      this.http
        .get<Message[]>(
          'https://cms-contacts-project-default-rtdb.firebaseio.com/messages.json'
        )
        .subscribe(
          // success method
          (messages: Message[]) => {
            this.messages =messages.sort();
            this.maxMessageId = this.getMaxId();
            this.messageChangedEvent.next(this.messages.slice());
          },
          (error: any) => {
            console.log(error.message);
          }
        );
  
      return this.messages.slice();
    }

  
    storeMessages(){
     let messageList = JSON.stringify(this.messages);
     this.http.put('https://cms-contacts-project-default-rtdb.firebaseio.com/messages.json', messageList,
     {
        headers: new HttpHeaders({
           "Content-Type": "application/json"
        })
     }).subscribe(
        () =>{
           this.messageChangedEvent.next(this.messages.slice());
        }
     )
    }
  




   // for(const message of this.messages){
    //     if(message.id == id)
    //     return message;
    // }
    // return null;



   getMessage(id: string): Message {
    return this.messages.find((message)=> message.id === id)
   } 

   addMessage(message: Message){
    this.messages.push(message);
    //this.messageChangedEvent.next(this.messages.slice());
    this.storeMessages();
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

}