import { Component, OnInit } from '@angular/core';
import { Licenses } from '../../../@core/services';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css'],
  providers: [
  Licenses
]
})
export class DropdownComponent implements OnInit {

  constructor(public licenses: Licenses) { }
  public dropdownOpen: boolean = false;


  ngOnInit() {
    this.getLicenses();
  }

  public dropdownToggle(): void {
   this.dropdownOpen = !this.dropdownOpen;
  }

  public getLicenses(): void {
    this.licenses.getLicenses().subscribe( res => {
      this.licenses.licenses = res;
    }, err => {
      console.log(err);
    });
  }

  public selectLicense(id: number, selected: boolean): void {
    const index: number = this.licenses.licenses.findIndex(item => item.id === id);
    const data: object = {
            id,
            selected
          };

    this.licenses.licenses[index].selected = !this.licenses.licenses[index].selected;
    this.licenses.selectLicense(data).subscribe( res => {
      console.log(res);
    }, err => {
      console.log(err);
    });
  }

  public removeFromSelected(id: number): void {
    const index: number = this.licenses.licenses.findIndex(item => item.id === id);
    const data: object = {
      id
    };

    this.licenses.licenses[index].selected = false;
    this.licenses.removeFromSelected(data).subscribe( res => {
      console.log(res);
    }, err => {
      console.log(err);
    });
  }

  public selectAll(select: boolean): void {
    const licences = this.licenses.licenses;

    for ( const currentLicense of licences ) {
      currentLicense.selected = select;
    }
    this.licenses.selectAllLicenses(select).subscribe( res => {
      console.log(res);
    }, err => {
      console.log(err);
    });
  }
}
