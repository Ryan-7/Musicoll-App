import { Component, OnInit, ViewChild } from '@angular/core';

declare function startRecording();
declare function stopRecording();
declare function saveAudio();

  


@Component({
  selector: 'app-project-landing',
  templateUrl: './project-landing.component.html',
  styleUrls: ['./project-landing.component.scss']
})
export class ProjectLandingComponent implements OnInit {

  constructor() { }

  ngOnInit() {

  }

}
