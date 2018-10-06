import { Component, OnInit } from '@angular/core';
import { BaseFireStoreService } from '../../core';
import {  IDareOpts } from '../../entities';

@Component({
  selector: 'app-add-dare',
  templateUrl: './add-dare.page.html',
  styleUrls: ['./add-dare.page.scss'],
})
export class AddDarePage implements OnInit {

  constructor(private baseFireStore: BaseFireStoreService) { }

  ngOnInit() {
  }

  addDare() {
    const dare: IDareOpts = {
      name: 'Hi',
      desc: 'This is a test',
      creator: 'Ryan'
    };
    this.baseFireStore.getCollection('dares').add({ ...dare });
  }

}
