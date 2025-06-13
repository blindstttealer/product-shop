export interface PersonalInfo {
  firstName: string;
  lastName: string;
  middleName?: string;
  dateOfBirth: string;
  gender: string;
  phone: string;
  email: string;
}

export interface AddressInfo {
  country: string;
  city: string;
  address: string;
  citizenship: string;
  workPermit: string;
}

export interface ApplicationFormData {
  personalInfo: PersonalInfo;
  addressInfo: AddressInfo;
}
