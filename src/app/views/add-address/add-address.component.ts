import { Component, OnInit } from '@angular/core';
import { ClientDetails } from 'src/app/models/client-details.model';
import { AddClientService } from 'src/app/services/add-client.service';

@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.component.html',
  styleUrls: ['./add-address.component.scss'],
  providers: [AddClientService]
})


export class AddAddressComponent implements OnInit {
  clients: ClientDetails[];
  selectedClient: ClientDetails[];

  constructor(private addClientService: AddClientService) {

    this.clients = [
      { name: 'Stachu Johnes', phoneNumber: '997 997 997', companyName: 'FIRMA INKO', TIN: '429 111 59 09', email: 'staszek@wp.pl' },
      { name: 'Zdzichu Ogórek', phoneNumber: '123 997 997', companyName: 'FIRMA WINKO', TIN: '659 111 59 09', email: 'zdzisiu@wp.pl' },
      { name: 'Krzysztof Kononowicz', phoneNumber: '153 997 997', companyName: 'FIRMA PIWKO', TIN: '559 111 59 09', email: 'krzysiu@wp.pl' },
      { name: 'Wojciech Suchodolski', phoneNumber: '544 997 997', companyName: 'RUSZTOWANIE&SZKLANA', TIN: '129 111 59 09', email: 'wojtuś@wp.pl' },
    ]
  }

  ngOnInit(): void {
  }

  private getClientDetails() {
    return this.addClientService.clientDetails;
  }
}

