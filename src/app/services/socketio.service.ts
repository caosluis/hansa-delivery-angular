import { Injectable } from '@angular/core';
import * as GlobalConstants from 'src/assets/common/global-constants';
import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketioService {
  socket;
  constructor() { }
  setupSocketConnection() {
    this.socket = io(GlobalConstants.GlobalConstants.Loopback +
      ':' +
      GlobalConstants.GlobalConstants.SocketPort);
      
    this.socket.emit('my message', 'Hello there from Angular.');
  }
  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}
