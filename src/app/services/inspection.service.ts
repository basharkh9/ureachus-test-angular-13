import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class InspectionService {
  private readonly inspectionsEndpoint =
    'http://localhost:3000/api/inspections/';
  constructor(private http: HttpClient) {}

  getInspections(filter: any) {
    console.log(this.toQueryString(filter));
    return this.http.get(
      this.inspectionsEndpoint + '?' + this.toQueryString(filter)
    );
  }

  getInspection(id: string) {
    return this.http.get(this.inspectionsEndpoint + id);
  }

  createInspection(inspection: any) {
    return this.http.post(this.inspectionsEndpoint, inspection);
  }
  update(inspection: any) {
    let id = inspection._id;
    delete inspection.__v;
    delete inspection._id;
    return this.http.put(this.inspectionsEndpoint + id, inspection);
  }

  toQueryString(obj: any) {
    var parts = [];
    for (var property in obj) {
      var value = obj[property];
      if (value != null && value != undefined)
        parts.push(
          encodeURIComponent(property) + '=' + encodeURIComponent(value)
        );
    }

    return parts.join('&');
  }
}
