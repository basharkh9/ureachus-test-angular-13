import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InspectionService } from '../services/inspection.service';

@Component({
  selector: 'app-inspection-form',
  templateUrl: './inspection-form.component.html',
  styleUrls: ['./inspection-form.component.css'],
})
export class InspectionFormComponent implements OnInit {
  inspection: any = {};
  constructor(
    private inspectionService: InspectionService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    route.paramMap.subscribe((p) => {
      this.inspection._id = p.get('id');
    });
  }

  ngOnInit(): void {
    // this.inspectionService.getInspection(this.inspection._id).subscribe(
    //   (i) => (this.inspection = i),
    //   (err) => {
    //     if (err.status == 404) this.router.navigate(['/not-found']);
    //   }
    // );
    this.inspectionService.getInspection(this.inspection._id).subscribe({
      next: (v) => {
        this.inspection = v;
      },
      error: (e) => {
        console.log(e);
        if (e.status == 404) this.router.navigate(['/not-found']);
      },
      complete: () => {},
    });
  }
  submit() {
    if (this.inspection._id) {
      this.inspectionService.update(this.inspection).subscribe((x) => {
        console.log(x);
      });
    }
    this.inspectionService
      .createInspection(this.inspection)
      .subscribe((x) => console.log(x));
  }
}
