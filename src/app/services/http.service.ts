import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, RequestOptions, ResponseOptions } from '@angular/http';
import * as _ from 'lodash';

@Injectable()
export class HttpService {

  constructor(private httpClient: HttpClient) { 
    if (window.location.href.substr(0, 16) === 'http://localhost') {
      this.host = 'http://localhost:3000'; 
    }
  }



  host = ''; 


  newProject() {
    return this.httpClient.get(`${this.host}/api/projects/new`, {headers: new HttpHeaders().set('musicoll-auth', localStorage.getItem('musicollAuth'))});
  }
  
  getProjectList() {
    return this.httpClient.get(`${this.host}/api/projects/list`, {headers: new HttpHeaders().set('musicoll-auth', localStorage.getItem('musicollAuth'))});
  } 

  getProjectById(projectId) {
    return this.httpClient.get(`${this.host}/api/projects/` + projectId, {headers: new HttpHeaders().set('musicoll-auth', localStorage.getItem('musicollAuth'))});
  }

  deleteProject(projectId, audioFiles) {
    return this.httpClient.patch(`${this.host}/api/projects/` + projectId, audioFiles, {headers: new HttpHeaders().set('musicoll-auth', localStorage.getItem('musicollAuth'))});
  }

  updateProject(projectId, dataToSave) {
    return this.httpClient.patch(`${this.host}/api/update/projects/` + projectId, dataToSave, {headers: new HttpHeaders().set('musicoll-auth', localStorage.getItem('musicollAuth'))});
  }

  addAudio(projectId, blob, trackInfo) {
    let formData = new FormData();
    formData.append('audio', blob);
    formData.append('body', JSON.stringify(trackInfo)); // Needs to be a string for Multer on backend
    console.log(formData);
    return this.httpClient.post(`${this.host}/api/projects/audio/` + projectId, formData, {headers: new HttpHeaders().set('musicoll-auth', localStorage.getItem('musicollAuth'))}); 
  }

  deleteAudio(projectId, audioId, audioKey) {

    return this.httpClient.patch(`${this.host}/api/projects/audio/` + projectId, {audioId: audioId, audioKey: audioKey}, {headers: new HttpHeaders().set('musicoll-auth', localStorage.getItem('musicollAuth'))})
  }

}
