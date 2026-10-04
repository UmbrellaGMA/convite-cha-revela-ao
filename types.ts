
export interface GuestInfo {
  name: string;
  confirmed: boolean;
  message?: string;
  title?: string;
  guess?: 'Zoe' | 'Heitor' | string;
  giftChoice?: string;
}

export interface EventDetails {
  title: string;
  subtitle: string;
  date: string;
  time: string;
  location: string;
  address: string;
  description: string;
  mapUrl: string;
  shareMapUrl: string;
  phone: string;
  phoneDisplay: string;
}

export enum InvitationState {
  IDLE,
  OPENING,
  OPENED,
  RSVP_SUBMITTED
}

