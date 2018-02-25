import { HttpService } from './../services/http.service';
import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  projects: any;
  filteredProject: String = "";

 
  constructor(private httpService: HttpService, private activatedRoute: ActivatedRoute, private router: Router) { 
  }


  newProject() {
    this.httpService.newProject().subscribe((res) => {
      // parse
      console.log(res)
      let projectId = res;
      this.router.navigate(['projects/'+ projectId]); // Route after New project created 
     // this.getProjectList(); // Update Project List
    });
  }

  getProjectList() {
    this.httpService.getProjectList().subscribe((res1) => {
     console.log('get list res:')
      console.log(res1)
      //parse 
    //  this.projects = res;
    }, (err) => {
      console.log(err);
    })
  }

  ngOnInit() {
    this.getProjectList();
  }

}
