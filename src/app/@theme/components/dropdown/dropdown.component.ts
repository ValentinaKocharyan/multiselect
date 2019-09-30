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

  constructor(public licensesList: Licenses) { }
  public dropdownOpen: boolean = false;


  ngOnInit() {
    this.getLicenses();
  }

  public dropdownToggle(): void {
   this.dropdownOpen = !this.dropdownOpen;
  }

  public getLicenses(): void {
    this.licensesList.getLicenses().subscribe( res => {
      this.licensesList.licensesServiceList = res;
    }, err => {
      console.log(err);
    });
  }

  public selectLicense(id: number, selected: boolean): void {
    const index: number = this.licensesList.licensesServiceList.findIndex(item => item.id === id);
    const data: object = {
            id,
            selected
          };

    this.licensesList.licensesServiceList[index].selected = !this.licensesList.licensesServiceList[index].selected;
    this.licensesList.selectLicense(data).subscribe( res => {
      console.log(res);
    }, err => {
      console.log(err);
    });
  }

  public removeFromSelected(id: number): void {
    const index: number = this.licensesList.licensesServiceList.findIndex(item => item.id === id);
    const data: object = {
      id
    };

    this.licensesList.licensesServiceList[index].selected = false;
    this.licensesList.removeFromSelected(data).subscribe( res => {
      console.log(res);
    }, err => {
      console.log(err);
    });
  }

  public selectAll(select: boolean): void {
    const licences = this.licensesList.licensesServiceList;

    for ( const currentLicense of licences ) {
      currentLicense.selected = select;
    }
    this.licensesList.selectAllLicenses(select).subscribe( res => {
      console.log(res);
    }, err => {
      console.log(err);
    });
  }
}
