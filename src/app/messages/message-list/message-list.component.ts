import { Component } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent {

  messages: Message[] = [
    new Message("1","Hello Friend!", "I just wanted to say Hello!", "Collin"),
    new Message("2","Assignment Grade", "Is the assignment graded yet?", "Jada"),
    new Message("3","Absent", "I will be absent from class.  Just wanted to let you know!", "Blue")


  ]

  onAddMessage(message: Message){
    this.messages.push(message);
  }
}
