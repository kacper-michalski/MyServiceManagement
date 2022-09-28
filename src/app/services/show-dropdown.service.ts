import { Injectable } from '@angular/core';
import { Address } from '../models/address.model';
import { ClientDetails } from '../models/client-details.model';
import { Company } from '../models/company.model';
import { DropDown } from '../models/dropDown.model';
import { ServicemanDetails } from '../models/serviceman-details.model';
@Injectable({
    providedIn: 'root'
})
export class ShowDropDownService {
    public dropDown: DropDown;
    selectedClient: string;
    selectedAddress: Address;
    selectedAddressString: string;
    selectedDevice: string;
    selectedServiceman: string;
    selectedStatus: string;
    selectedCompany: string;
    constructor() {
        this.dropDown = {
            client: false,
            address: false,
            device: false,
            serviceman: false,
            status: false,
            company: false
        }
    }

    public onClickDropDown(key: keyof DropDown) {
        this.dropDown[key] = !this.dropDown[key];
        this.hideDropDownItemsExcept(key);
    }
    private hideDropDownItemsExcept(exceptionKey: keyof DropDown) {
        let dropDownKey: keyof DropDown;
        for (dropDownKey in this.dropDown) {
            if (dropDownKey != exceptionKey) {
                this.dropDown[dropDownKey] = false;
            }
        }
    }
    public onSelectClient(client: ClientDetails) {
        this.onClickDropDown('client');
        this.selectedAddressString = "";
        return this.selectedClient = client.firstName + ' ' + client.lastName + '\n' + client.phoneNumber + '\n' + client.email;
    }
    public onSelectAddress(address: Address) {
        this.onClickDropDown('address');
        this.selectedAddress = address;
        this.selectedDevice = "";
        return this.selectedAddressString = address.street + '\n' + address.zipCode + '\n' + address.city;
    }
    public onSelectDevice(iDevice: number) {
        this.onClickDropDown('device');
        // return this.selectedDevice = this.selectedAddress.devices[iDevice];
    }
    public onSelectServiceman(serviceman: ServicemanDetails) {
        this.onClickDropDown('serviceman');
        return this.selectedServiceman = serviceman.name;
    }
    public onSelectStatus(status: string) {
        this.onClickDropDown('status');
        return this.selectedStatus = status;
    }
    public onSelectCompany(company: Company) {
        this.onClickDropDown('company');
        return this.selectedCompany = company.name + '\n' + company.tin + '\n' + company.street + '\n' + company.zipCode + '\n'+ company.city;
    }
}
