type Country =
  | 'India'
  | 'United States'
  | 'Canada'
  | 'Australia'
  | 'Israel'
  | 'New Zealand'
  | 'Singapore';

type Month =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December';

export type SignupFormData = {
  title?: 'Mr' | 'Mrs';
  name?: string;
  password: string;
  day?: string;
  month?: Month;
  year?: string;
  newsletter?: boolean;
  specialOffers?: boolean;
  firstName: string;
  lastName: string;
  company?: string;
  address: string;
  address2?: string;
  country: Country;
  state: string;
  city: string;
  zipcode: string;
  mobileNumber: string;
};
