import { Observable } from 'rxjs';

export class ElementScroll {
  constructor() {}

  private readyForGetData: boolean = true;

  public isScrollInBottom(event: any, offset: number, total: number): Observable<boolean> {
    return new Observable<any>((subscriber: any) => {
      const elem = event.target;

      if (elem.scrollHeight - elem.scrollTop <= elem.offsetHeight + 10 && offset < total && this.readyForGetData) {
        this.readyForGetData = false;
        setTimeout(() => {
          subscriber.next();
          subscriber.complete();
          this.readyForGetData = true;
        }, 200);
      }
    });
  }
}
