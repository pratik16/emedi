import { Component, OnInit, HostListener } from '@angular/core';
import { map } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { ChatService } from 'src/app/services/chat.service';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  receiver_contact_id : number = 0;
  msg : string = "";
  msgList : any = [];
  @HostListener('window:resize', ['$event'])
  onResize() {
  }

  constructor(private router: Router, private route: ActivatedRoute, private chatService : ChatService) { }

  ngOnInit(): void {
    setInterval(()=>{
      this.chatService.config().subscribe((data:any) => {
        console.log("data  ==?", data);
        if(data && data.data && data.data.data){
          this.receiver_contact_id = data.data.data[0].sender_contact_id;
          this.msgList = data.data.data.reverse();
          this.msgList.forEach((element : any) => {
            var indianTimeZoneVal = new Date(element.created_at).toLocaleString('en-US', {timeZone: 'Asia/Kolkata'});
            var indainDateObj = new Date(indianTimeZoneVal);
            indainDateObj.setHours(indainDateObj.getHours() + 5);
            indainDateObj.setMinutes(indainDateObj.getMinutes() + 30);
            element.created_at = indainDateObj.toLocaleTimeString();
            console.log(indainDateObj);
            
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
      contact_id: this.receiver_contact_id
    }

    this.chatService.sendMessage(obj).subscribe((data:any) => {
      this.msg = "";
			console.log("data  ==?", data);
      this.receiver_contact_id = data.data[0].reciver_contact_id;

      console.log("this.receiver_contact_id  ==?", this.receiver_contact_id);
		});
  }else{
   return;   
  }
  }


}
