import { Component, OnInit } from '@angular/core';
import { Inspection, Result } from '../models/inspection';
import { InspectionService } from '../services/inspection.service';
import { faSortUp } from '@fortawesome/free-solid-svg-icons';
import { faSortDown } from '@fortawesome/free-solid-svg-icons';
import { faBoltLightning } from '@fortawesome/free-solid-svg-icons';
import { faSquare } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-inspection-list',
  templateUrl: './inspection-list.component.html',
  styleUrls: ['./inspection-list.component.css']
})

export class InspectionListComponent implements OnInit {
  private readonly PAGE_SIZE = 4;
  faSortUp = faSortUp;
  faSortDown = faSortDown;
  faBoltLightning = faBoltLightning;
  faSquare = faSquare;
  inspections: Inspection[] = [] ;
  queryResult: Result={totalitems:0,inspections:[]};
  query: any = {
    pageSize: this.PAGE_SIZE
  };
  filter: any = {};

  columns = [
    { title: 'N' },
    { title: 'InspectionId', key: 'inspectionId', isSortable: true },
    { title: 'Certificate', key: 'certificate', isSortable: true },
    { title: 'Business Name', key: 'businessName', isSortable: true },
    { title: 'Industry Sector', key: 'industrySector', isSortable: true },
    { title: 'City', key: 'city', isSortable: true },
    { title: 'Inspection Date', key: 'inspectionDate', isSortable: true },
    { title: 'Inspection Result', key: 'inspectionResult', isSortable: true },
  ];

  constructor(private inspectionService: InspectionService) { }

  ngOnInit(): void {
    this.populateInspection();
  }

  private populateInspection(){
    this.inspectionService.getInspections(this.query)
    .subscribe(result => {this.queryResult = result as Result;this.inspections = this.queryResult.inspections});
    console.log(this.queryResult)
  }

  sortBy(columnName:string) {
    if (this.query.sortBy === columnName) {
      this.query.isSortAscending = !this.query.isSortAscending; 
    } else {
      this.query.sortBy = columnName;
      this.query.isSortAscending = true;
    }
    this.populateInspection();
  }
}
