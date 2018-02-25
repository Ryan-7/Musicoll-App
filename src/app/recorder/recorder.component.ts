import { Component, OnInit, ViewChild, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { HttpService } from './../services/http.service';
import * as RecordRTC from 'recordrtc';

declare const navigator: any;
declare const MediaRecorder: any;

@Component({
  selector: 'app-recorder',
  templateUrl: './recorder.component.html',
  styleUrls: ['./recorder.component.scss']
})
export class RecorderComponent implements OnInit, OnDestroy {

  @ViewChild('audioPlayback') audioPlayback;
  @Input() currentProjectId;
  @Output() onAudioTrackAdded: EventEmitter<any> = new EventEmitter<any>(); 

  private chunks: any = [];
  private mediaRecorder: any;
  private blob: Blob;


  savingRecording = false;

  recording: boolean = false;
  recorderHasTrack: boolean = false;
  errorRecording: boolean = false;
  
  trackName: string;
  trackDescription: string;
  
  constructor(private httpService: HttpService) { }
 
  startRecording() {
    this.recording = true;
    this.mediaRecorder.start();
  }

  stopRecording() {
    this.recording = false;
    this.mediaRecorder.stop();

    this.mediaRecorder.onstop = (e) => {
      const audio = new Audio();
      this.blob = new Blob(this.chunks, { 'type': 'audio/ogg; codecs=opus' });
      this.chunks.length = 0;
      var url = (window.URL).createObjectURL(this.blob)
      this.audioPlayback.nativeElement.src = url;
    };

    this.recorderHasTrack = true;

  }

  deleteRecording() {
    this.audioPlayback.nativeElement.src = "";
    this.recorderHasTrack = false;
  }

  saveRecording(){

    // Start animation
    this.savingRecording = true;

    let trackInfo = {
      trackName: this.trackName,
      trackDescription: this.trackDescription
    } 
    this.httpService.addAudio(this.currentProjectId, this.blob, trackInfo).subscribe((res) => {
      
      console.log('song:')
      console.log(res);

      this.onAudioTrackAdded.emit(res); // Send updated project to parent component.
      this.audioPlayback.nativeElement.src = ""
      this.recorderHasTrack = false;
      this.savingRecording = false;
    });
  }



  streamSuccess(stream: MediaStream) {
    this.mediaRecorder = new MediaRecorder(stream);
    
    this.mediaRecorder.ondataavailable = (e) => {
      this.chunks.push(e.data);
    }
    
    //this.mediaRecorder.ondataavailable = e => this.chunks.push(e.data); 

    //this.mediaRecorder.ondataavailable(e); 
  }


  ngOnInit() {
    

    let mediaConstraints = {
      audio: {
        echoCancellation: false,
        echoCancelation: false, // TypeScript / IE Edge has a spelling error. 
        noiseSuppression: false // FireFox, sounds terrible with this set to true while recording instruments.
      } as any
    }

    navigator.mediaDevices.getUserMedia(mediaConstraints).then((stream) => {
      this.streamSuccess(stream);
    }).catch((e) => {
      console.log(e);
      this.errorRecording = true;
    })

  }

  ngOnDestroy() {
     this.recording = false; 
  }
 
}
