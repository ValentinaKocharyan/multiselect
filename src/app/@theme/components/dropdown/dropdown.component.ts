import { Component, OnInit } from '@angular/core';
import { Licenses } from '../../../@core/services';
import { LicensesInfo } from '../../../@core/constants';
import { LicensesType } from '../../../@core/interfaces';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css'],
  providers: [
  Licenses
]
})
export class DropdownComponent implements OnInit {

  constructor(public licensesList: Licenses) {
  }

  public dropdownOpen: boolean = false;
  public items: LicensesType[] = [];
  private licensesOffset: number = 0;
  private licensesLimit = LicensesInfo.ITEMS_LIMIT_GET;
  private licensesTotal: number;
  private readyForGetData: boolean = true;

  ngOnInit() {
    this.getLicenses();
  }

  public dropdownToggle(): void {
    this.dropdownOpen = !this.dropdownOpen;
  }

  public getLicenses(): void {
    this.licensesList.getLicenses().subscribe(res => {
      this.licensesList.licensesServiceList = res;
      this.licensesTotal = this.licensesList.licensesServiceList.length;
      this.getLicensesData();

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
    this.licensesList.selectLicense(data).subscribe(res => {
      console.log(res);
    }, err => {
      console.log(err);
    });
  }

  public removeFromSelected(id: number, event): void {
    event.stopPropagation();
    const index: number = this.licensesList.licensesServiceList.findIndex(item => item.id === id);
    const data: object = {
      id
    };

    this.licensesList.licensesServiceList[index].selected = false;
    this.licensesList.removeFromSelected(data).subscribe(res => {
      console.log(res);
    }, err => {
      console.log(err);
    });
  }

  public selectAll(select: boolean): void {
    const licences = this.licensesList.licensesServiceList;

    for (const currentLicense of licences) {
      currentLicense.selected = select;
    }
    this.licensesList.selectAllLicenses(select).subscribe(res => {
      console.log(res);
    }, err => {
      console.log(err);
    });
  }

  public onScroll(event: any): void {
    const elem = event.target;

    if (elem.scrollHeight - elem.scrollTop <= elem.offsetHeight + 10 && this.licensesOffset < this.licensesTotal && this.readyForGetData) {
      this.licensesOffset += 10;
      this.readyForGetData = false;
      setTimeout(() => {
        this.getLicensesData();
      }, 200);
    }
  }

  private getLicensesData() {
    const newItemsArray = this.licensesList.licensesServiceList.slice(this.licensesOffset, this.licensesOffset + this.licensesLimit);
    this.items = this.items.concat(newItemsArray);
    this.readyForGetData = true;
  }
}
