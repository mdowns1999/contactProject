import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Message } from './message.model';
import { MessageService } from './message.service';
import { ContactService } from '../contacts/contact.service';


@Injectable({ providedIn: 'root' })
export class MessageResolverService implements Resolve<Message[]> {
  constructor(
    private messageService: MessageService,
    private contacts: ContactService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    //console.log(this.contacts.getContacts())
    console.log(this.contacts.getContacts());

    return this.messageService.getMessages();
  }
}