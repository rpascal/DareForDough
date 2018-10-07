import { Component, OnInit } from '@angular/core';
import { IDareOpts } from '../../entities';
import { NavService } from '../../core';

@Component({
  selector: 'app-dare',
  templateUrl: './dare.page.html',
  styleUrls: ['./dare.page.scss'],
})
export class DarePage implements OnInit {

  dare: IDareOpts;

  constructor(private navService: NavService<IDareOpts>) { }

  ngOnInit() {
    this.dare = this.navService.data;
    console.log(this.navService.data);
  }

}
