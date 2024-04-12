import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ItslTutorias';
  constructor(private api: ApiService) { }

  ngOnInit() {


  }

}
