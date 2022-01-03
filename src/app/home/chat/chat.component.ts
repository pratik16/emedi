import { Component, OnInit, HostListener } from '@angular/core';
import { map } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { ChatService } from 'src/app/services/chat.service';
import { UserService } from 'src/app/services/users/user.service';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  receiver_contact_id : number = 0;
  msg : string = "";
  msgList : any = [];
  chatReciverId : any;
  emediChatContactName: any;

  @HostListener('window:resize', ['$event'])
  onResize() {
  }

  constructor(
    private router: Router, 
    private route: ActivatedRoute, 
    private chatService : ChatService,
    private userService: UserService) { }

  ngOnInit(): void {
    this. chatReciverId =  localStorage.getItem("emedi_chat_contact_id");
    this.emediChatContactName = localStorage.getItem("emedi_chat_contact_name");
    setInterval(()=>{

      this.chatService.getChatMessage(this.chatReciverId).subscribe((data:any) => {
        if(data && data.data && data.data.data){
          this.msgList = data.data.data.reverse();
          this.msgList.forEach((element : any) => {
            var indianTimeZoneVal = new Date(element.created_at).toLocaleString('en-US', {timeZone: 'Asia/Kolkata'});
            var indainDateObj = new Date(indianTimeZoneVal);
            indainDateObj.setHours(indainDateObj.getHours() + 5);
            indainDateObj.setMinutes(indainDateObj.getMinutes() + 30);
            element.created_at = indainDateObj.toLocaleTimeString();
          });
        }      
      });
    },5000)
  }

  ngAfterViewInit() {
    
  }

  ngOnDestroy() {
    
  }
  onEnter() {
    this.sendMessage();
  }

  sendMessage(){
    if(this.msg !== undefined && this.msg !== "" && this.msg !== null){    
    let obj = {
      msgId: Math.floor(Math.random() * 1000000000),
      device_key: null,
      position: 1,
      body: this.msg,
      contact_id: this.chatReciverId
    }
    this.chatService.sendMessage(obj).subscribe((data:any) => {
      this.msg = "";
		  this.receiver_contact_id = data?.data[0]?.reciver_contact_id;
  	});
  }else{
   return;   
  }
  }
}
