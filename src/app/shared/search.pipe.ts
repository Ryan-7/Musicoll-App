import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(projects: any, filteredProject: string): any {
    if(!projects) {
      return;
    }
    else if (projects.length === 0 || filteredProject === '') {
      return projects; 
    }

    else {
      const resultArray = [];
      for (const project of projects) {
          if (project['name'].toLowerCase().indexOf(filteredProject.toLowerCase()) != -1) {
              resultArray.push(project);
          }
      }
      return resultArray; 
    }
 }    
}
 