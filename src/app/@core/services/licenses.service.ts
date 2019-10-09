import { Observable } from 'rxjs';
import { LicensesType } from '../interfaces';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../../environments/environment';

export class Licenses {
  constructor(public http: HttpClient) {}

  public url: string = `${environment.baseUrl}assets/licenses.json`;

  public getLicenses(): Observable<LicensesType[]> {
    return this.http.get<LicensesType[]>(this.url);
  }

  public selectLicense(data: object): Observable<LicensesType> {
    return this.http.post<LicensesType>(this.url, data);
  }

  public removeFromSelected(data: object): Observable<LicensesType> {
    return this.http.delete<LicensesType>(this.url, data);
  }

  public selectAllLicenses(select: boolean): Observable<LicensesType> {
    return this.http.post<LicensesType>(this.url, select);
  }
}
