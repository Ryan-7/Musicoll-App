import { ProjectsComponent } from './../projects.component';
import { HttpService } from './../../services/http.service';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import moment from 'moment';

declare var jsPDF; // For use of jsPDF Library. 

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent implements OnInit, OnDestroy {

  @ViewChild('title') title;
  @ViewChild('lyrics') lyrics;
  @ViewChild('notes') notes;
 
  @ViewChild('audioTracks') audioTracks;
  
  

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private httpService: HttpService, private projectsComponent: ProjectsComponent) { 
  } 

  audio: HTMLAudioElement = new Audio();
  audioPlaying = false;

  project; // need to add model 
  projectAudio;
  projectId; // need to add model 
  loading: boolean = true;
  
  editingTitle: boolean = false;
  editingLyrics: boolean = false;
  editingNotes: boolean = false;

  savingTitle: boolean = false;
  savingLyrics: boolean = false;
  savingNotes: boolean = false;

  deletingProject: boolean = false;
  toPdf: boolean = false;
  audioHelp: boolean = false;


  audioHelpModal() {
    this.audioHelp = true;
    window.scrollTo(0, 0);
  }

  closeAudioHelpModal() {
    this.audioHelp = false;
  }

  pdfModal() {
    this.toPdf = true;
    window.scrollTo(0, 0);
  }

  cancelPdf() {
    this.toPdf = false;
  }

  createPdf() {
    this.loading = true;

    let textArray: String[] = this.project.lyrics.split('\n');
    var doc = jsPDF();
    doc.writeText(0, 25, this.project.name, { align: 'center' });

    for (var i = 0; i < textArray.length; i++) {
      let text = textArray[i];
      doc.writeText(0, (30 + (i * 5)), text, { align: 'center' });
    }
    
    doc.save(this.project._id + '.pdf');

    this.loading = false;
    this.toPdf = false;
  }

  deleteModal() {
    this.deletingProject = true;
    window.scrollTo(0, 0);
  }

  cancelDelete() {
    this.deletingProject = false;
  }

  deleteProject() {
    this.loading = true;
    this.httpService.deleteProject(this.projectId, this.project.audio).subscribe((res) => {

      setTimeout(() => { // only used to simulate http request time 
        this.projectsComponent.getProjectList(); 
        this.loading = false;
        this.router.navigate(['projects']);
        this.deletingProject = false;
      }, 500)
    })
  }



  play(file) {
    this.audio.src = file;
    this.audio.play();
    this.audioPlaying = true;
    
  }

  pause() {
    this.audio.pause();
    this.audioPlaying = false;
    this.audio.loop = false;
  }

  loop(file) {
    this.audio.src = file;
    this.audio.loop = true;
    this.audio.play();
    this.audioPlaying = true;

  }


  deleteAudioFile(audioId, audioKey) {
    this.httpService.deleteAudio(this.projectId, audioId, audioKey).subscribe((res) => {
      this.project = res;
    })
  }


  edit(inputArea) {
    console.log(inputArea)
    switch(inputArea) {
      case 'title':
          this.editingTitle = true;
          setTimeout(() => { this.title.nativeElement.focus(); }); // setTimeout to allow time for ViewChild to bind to element.
          break;
      case 'lyrics':
          this.editingLyrics = true;
          setTimeout(() => { this.lyrics.nativeElement.focus(); });
          break;
      case 'notes':
          this.editingNotes = true;
          setTimeout(() => { this.notes.nativeElement.focus(); });
          break;
    }    
  }

  save(inputArea) {
    let dataToSave;
    switch(inputArea) {
      case 'title':
          this.savingTitle = true;
          this.project.name = this.title.nativeElement.value;
          break;
      case 'lyrics':
          this.savingLyrics = true;
          this.project.lyrics = this.lyrics.nativeElement.value;
          break;
      case 'notes':
          this.savingNotes = true;
          this.project.notes = this.notes.nativeElement.value;
          break;
    }

    this.update(this.project);
  }


  cancel(inputArea) {
    if (inputArea === 'title') {
      this.editingTitle  = false;
    } else if (inputArea === 'lyrics') {
      this.editingLyrics = false;
    } else if (inputArea === 'notes') {
      this.editingNotes = false;
    }
  }

  update(dataToSave) {
    this.httpService.updateProject(this.projectId, dataToSave).subscribe((res) => {
      
      setTimeout(() => {
        this.project = res; // if a song is playing, this will cause a bug since it updates the audio view as well.
        this.editingTitle = false;
        this.savingTitle = false;

        this.editingLyrics = false;
        this.savingLyrics = false;


        this.editingNotes = false;
        this.savingNotes = false;
        
        this.projectsComponent.getProjectList();
      }, 1000)

    })
  }

  updateAudioListing(updatedAudio) { 
     this.project = updatedAudio;
  }

  ngOnInit() {

    this.activatedRoute.paramMap.subscribe((params: Params) => {

      this.pause(); // Stop audio if route changes.
      this.loading = true;
      this.projectId = params.get('id');
      
      // everytime the params change, we will query the API for that project id's data.

      this.httpService.getProjectById(this.projectId).subscribe((res) => {
        this.project = res;
        this.projectAudio = res['audio'];
        console.log(this.project);
        // In real world, set loading back to false here. 
      })

      // if error trying to get id, show a "project not found"
      // could re-direct to error page... ?


      setTimeout(() => { // Simulate HTTP request time 
        this.loading = false;
      }, 500)
      
    })

  }

  ngOnDestroy() {}
}
