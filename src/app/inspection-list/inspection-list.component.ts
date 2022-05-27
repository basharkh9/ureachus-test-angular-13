import { Component, OnInit } from '@angular/core';
import { Inspection, Result } from '../models/inspection';
import { InspectionService } from '../services/inspection.service';
import { faSortUp } from '@fortawesome/free-solid-svg-icons';
import { faSortDown } from '@fortawesome/free-solid-svg-icons';
import { faBoltLightning } from '@fortawesome/free-solid-svg-icons';
import { faSquare } from '@fortawesome/free-solid-svg-icons';
import { dropdownItem } from '../shared/dropdown-component';

@Component({
  selector: 'app-inspection-list',
  templateUrl: './inspection-list.component.html',
  styleUrls: ['./inspection-list.component.css'],
})
export class InspectionListComponent implements OnInit {
  private readonly PAGE_SIZE = 4;
  faSortUp = faSortUp;
  faSortDown = faSortDown;
  faBoltLightning = faBoltLightning;
  faSquare = faSquare;
  inspections: Inspection[] = [];
  queryResult: Result = { totalitems: 0, inspections: [] };
  query: any = {
    pageSize: this.PAGE_SIZE,
  };
  certificateMap: any = {};
  citiesMap: any = {};
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
  placeHolders = [
    'Certificates',
    'Cities',
    'Inspection Results',
    'Industry Sector',
    'Inspection Date',
  ];

  constructor(private inspectionService: InspectionService) {}

  ngOnInit(): void {
    this.populateInspection();
  }

  private populateInspection() {
    this.inspectionService.getInspections(this.query).subscribe((result) => {
      this.queryResult = result as Result;
      this.inspections = this.queryResult.inspections;

      this.populateCert();
      this.populateCities();
    });
  }

  private populateCert() {
    this.certificateMap = this.queryResult.inspections.map(
      (element: Inspection, index: number) => {
        return {
          id: index,
          itemText: element.certificate.toString(),
        } as dropdownItem;
      }
    );
  }

  private populateCities() {
    this.citiesMap = this.queryResult.inspections.map(
      (element: Inspection, index: number) => {
        return {
          id: index,
          itemText: element.city.toString(),
        } as dropdownItem;
      }
    );
  }

  getPlaceHolder(p: string) {
    return p.toUpperCase();
  }

  sortBy(columnName: string) {
    if (this.query.sortBy === columnName) {
      this.query.isSortAscending = !this.query.isSortAscending;
    } else {
      this.query.sortBy = columnName;
      this.query.isSortAscending = true;
    }
    this.populateInspection();
  }
  resetFilter() {
    this.query = {
      page: 1,
      pageSize: this.PAGE_SIZE,
    };
    this.populateInspection();
  }

  onFilterChange() {
    this.query.page = 1;
    console.log(this.filter);
    this.populateInspection();
  }
  onPageChange(page: number) {
    this.query.page = page;
    this.populateInspection();
  }
  onSelectChange(select: any) {
    this.query.page = 1;
    console.log(this.query);
    this.populateInspection();
  }
}
