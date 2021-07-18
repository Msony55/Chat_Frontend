import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import * as io from 'socket.io-client';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent {
  socket: any;
  userName = '';
  message = '';
  messageList: {message: string, userName: string, mine: boolean}[] = [];
  userId : any;
  userList: string[] = [];

  constructor(public dialog: MatDialog) {}

  openDialog() {
    this.dialog.open(DialogComponent);
  }

  // socket
  ngOnInit(): void {
    this.socket = io.io('https://web-chat-app55.herokuapp.com');    

  // add user in array
  this.socket.on('user-list', (userList: string[]) => {
    this.userList = userList; //push username in userList
  });

  // USER IS ONLINE
  this.socket.on("online", (userId: string[]) => {
    console.log(userId, "Is Online!"); // update online status
  });

  // message 
  this.socket.on("message-broadcast", (data: {message: string, userName: string})=> {
    console.log(data);
    if (data) {
      this.messageList.push({message: data.message, userName: data.userName, mine: false});
    }
  });

  // USER IS OFFLINE
  this.socket.on("offline", (userId: string) => {
    console.log(userId, "Is Offline!"); // update offline status
    }); 
  }

  sendMessage(): void {
    var userid:any = localStorage.getItem("userid");
    this.socket.emit("msguser", userid);
    this.socket.emit("message", this.message);
    console.log(userid);
    this.messageList.push({message: this.message, userName: userid, mine: true});
    this.message = '';
  }
}
