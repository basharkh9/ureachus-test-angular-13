import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class InspectionService {
  private readonly inspectionsEndpoint =
    'http://localhost:3000/api/inspections';
  constructor(private http: HttpClient) {}

  getInspections(filter: any) {
    console.log(this.toQueryString(filter));
    return this.http.get(
      this.inspectionsEndpoint + '?' + this.toQueryString(filter)
    );
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
