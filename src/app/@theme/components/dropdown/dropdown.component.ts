import { Component, OnInit } from '@angular/core';
import { Licenses } from '../../../@core/services';
import { ElementScroll } from '../../../@core/services';
import { LicensesInfo } from '../../../@core/constants';
import { LicensesType } from '../../../@core/interfaces';
import * as _ from 'lodash';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css'],
  providers: [
    Licenses,
    ElementScroll
  ]
})
export class DropdownComponent implements OnInit {

  constructor(public licensesList: Licenses, public elementScroll: ElementScroll) {
  }

  public dropdownOpen: boolean = false;
  public items: LicensesType[] = [];
  private offset: number = 0;
  private limit: number = LicensesInfo.ITEMS_LIMIT_GET;
  private total: number;
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
    for (const currentLicense of this.licensesServiceList) {
      currentLicense.selected = select;
    }
    _.each(this.licensesServiceList, (currentLicense) => {
      currentLicense.selected = select;
    });

    this.licensesList.selectAllLicenses(select).subscribe(res => {
      console.log(res);
    });
  }

  public onScroll(event: any): void {
    this.elementScroll.isScrollInBottom(event, this.offset, this.total).subscribe(() => {
      this.getLicensesData();
      this.offset += 10;
    }, (error) => {
      console.log(error);
    });
  }

  private getLicensesData(): void {
    const newItemsArray = this.licensesServiceList.slice(this.offset, this.offset + this.limit);
    this.items = this.items.concat(newItemsArray);
  }
}
