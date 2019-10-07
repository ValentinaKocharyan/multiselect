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
  private offset: number = 0;
  private limit: number = LicensesInfo.ITEMS_LIMIT_GET;
  private total: number;
  private readyForGetData: boolean = true;
  public licensesServiceList: LicensesType[] = [];

  ngOnInit() {
    this.getLicenses();
  }

  public dropdownToggle(): void {
    this.dropdownOpen = !this.dropdownOpen;
  }

  public getLicenses(): void {
    this.licensesList.getLicenses().subscribe(res => {
      this.licensesServiceList = res;
      this.total = this.licensesServiceList.length;
      this.getLicensesData();
    });
  }

  public selectLicense(id: number, selected: boolean): void {
    const index: number = this.licensesServiceList.findIndex(item => item.id === id);
    const data: object = {
      id,
      selected
    };

    this.licensesServiceList[index].selected = !this.licensesServiceList[index].selected;
    this.licensesList.selectLicense(data).subscribe(res => {
      console.log(res);
    });
  }

  public removeFromSelected(id: number, event): void {
    event.stopPropagation();
    const index: number = this.licensesServiceList.findIndex(item => item.id === id);
    const data: object = {
      id
    };

    this.licensesServiceList[index].selected = false;
    this.licensesList.removeFromSelected(data).subscribe(res => {
      console.log(res);
    });
  }

  public selectAll(select: boolean): void {
    const licences = this.licensesServiceList;

    for (const currentLicense of licences) {
      currentLicense.selected = select;
    }
    this.licensesList.selectAllLicenses(select).subscribe(res => {
      console.log(res);
    });
  }

  public onScroll(event: any): void {
    const elem = event.target;

    if (elem.scrollHeight - elem.scrollTop <= elem.offsetHeight + 10 && this.offset < this.total && this.readyForGetData) {
      this.offset += 10;
      this.readyForGetData = false;
      setTimeout(() => {
        this.getLicensesData();
      }, 200);
    }
  }

  private getLicensesData(): void {
    const newItemsArray = this.licensesServiceList.slice(this.offset, this.offset + this.limit);
    this.items = this.items.concat(newItemsArray);
    this.readyForGetData = true;
  }
}
