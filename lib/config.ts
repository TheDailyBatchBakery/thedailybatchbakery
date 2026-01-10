import { BusinessConfig, BusinessHours } from '@/types';

// Business Hours Configuration
const businessHours: BusinessHours = {
  open: process.env.BUSINESS_HOURS_OPEN || '09:00',
  close: process.env.BUSINESS_HOURS_CLOSE || '17:00',
  time_slot_interval: parseInt(process.env.TIME_SLOT_INTERVAL || '60', 10),
  order_cutoff_minutes: parseInt(process.env.ORDER_CUTOFF_MINUTES || '30', 10),
};

// Las Vegas Zip Codes
const lasVegasZipCodes = [
  '89030', '89031', '89032', '89044', '89052', '89074', '89081', '89084', '89086',
  '89101', '89102', '89103', '89104', '89106', '89107', '89108', '89109', '89110',
  '89111', '89112', '89113', '89114', '89115', '89117', '89118', '89119', '89120',
  '89121', '89122', '89123', '89124', '89125', '89126', '89127', '89128', '89129',
  '89130', '89131', '89134', '89135', '89136', '89137', '89138', '89139', '89140',
  '89141', '89142', '89143', '89144', '89145', '89146', '89147', '89148', '89149',
  '89150', '89151', '89152', '89153', '89154', '89155', '89156', '89157', '89158',
  '89159', '89160', '89161', '89162', '89163', '89164', '89165', '89166', '89169',
  '89170', '89173', '89177', '89178', '89179', '89180', '89183', '89185', '89191',
  '89193', '89195', '89199'
];

// Business Configuration
export const config: BusinessConfig = {
  name: process.env.BUSINESS_NAME || 'The Daily Batch Bakery',
  email: process.env.BUSINESS_EMAIL || 'thedailybatchbakery@gmail.com',
  phone: process.env.BUSINESS_PHONE || '(702) 512-9594',
  venmo: process.env.BUSINESS_VENMO || '@Crosbie-Bohannon',
  hours: businessHours,
  delivery_fee: parseFloat(process.env.DELIVERY_FEE || '10.00'),
  free_delivery_threshold: parseFloat(process.env.FREE_DELIVERY_THRESHOLD || '100.00'),
  min_delivery_order: parseFloat(process.env.MIN_DELIVERY_ORDER || '40.00'),
  min_advance_days: parseInt(process.env.MIN_ADVANCE_DAYS || '2', 10),
  las_vegas_zip_codes: lasVegasZipCodes,
};

// Feature Flags
export const features = {
  emailNotifications: process.env.ENABLE_EMAIL_NOTIFICATIONS === 'true',
  smsNotifications: process.env.ENABLE_SMS_NOTIFICATIONS === 'true',
  adminDashboard: process.env.ENABLE_ADMIN_DASHBOARD === 'true',
};

// Service Configuration
export const services = {
  resend: {
    apiKey: process.env.RESEND_API_KEY || '',
    enabled: !!process.env.RESEND_API_KEY,
  },
  twilio: {
    accountSid: process.env.TWILIO_ACCOUNT_SID || '',
    authToken: process.env.TWILIO_AUTH_TOKEN || '',
    phoneNumber: process.env.TWILIO_PHONE_NUMBER || '',
    enabled: !!(process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN),
  },
};

