import { Component, OnInit, HostListener } from '@angular/core';
import { map } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  @HostListener('window:resize', ['$event'])
  onResize() {
  }

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    
  }

  ngAfterViewInit() {
    
  }

  ngOnDestroy() {
    
  }


}
