export interface ServicemanDetails {
    name: string;
    phoneNumber: string;
    companyName: string;
    TIN: string;
    email: string;
    addresses: [
        address: [
            streetNumber: string,
            zip: string,
            town: string,
            devices: string[],
        ]
    ]
}