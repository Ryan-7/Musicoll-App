import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, RequestOptions, ResponseOptions } from '@angular/http';
import * as _ from 'lodash';

@Injectable()
export class HttpService {

  constructor(private httpClient: HttpClient) { }


  // Each project will consist of the following model: 
  

  newProject() {
    return this.httpClient.get('/api/projects/new', {headers: new HttpHeaders().set('musicoll-auth', localStorage.getItem('musicollAuth')), responseType: 'text'});
  }
  
  getProjectList() {
    return this.httpClient.get('/api/projects/list', {headers: new HttpHeaders().set('musicoll-auth', localStorage.getItem('musicollAuth'))});
  } 

  getProjectById(projectId) {
    return this.httpClient.get('/api/projects/' + projectId, {headers: new HttpHeaders().set('musicoll-auth', localStorage.getItem('musicollAuth'))});
  }

  deleteProject(projectId, audioFiles) {
    return this.httpClient.patch('/api/projects/' + projectId, audioFiles, {headers: new HttpHeaders().set('musicoll-auth', localStorage.getItem('musicollAuth'))});
  }

  updateProject(projectId, dataToSave) {
    return this.httpClient.patch('/api/update/projects/' + projectId, dataToSave, {headers: new HttpHeaders().set('musicoll-auth', localStorage.getItem('musicollAuth'))});
  }

  addAudio(projectId, blob, trackInfo) {
    let formData = new FormData();
    formData.append('audio', blob);
    formData.append('body', JSON.stringify(trackInfo)); // Needs to be a string for Multer on backend
    console.log(formData);
    return this.httpClient.post('/api/projects/audio/' + projectId, formData, {headers: new HttpHeaders().set('musicoll-auth', localStorage.getItem('musicollAuth'))}); 
  }

  deleteAudio(projectId, audioId, audioKey) {

    return this.httpClient.patch('/api/projects/audio/' + projectId, {audioId: audioId, audioKey: audioKey}, {headers: new HttpHeaders().set('musicoll-auth', localStorage.getItem('musicollAuth'))})
  }

}
