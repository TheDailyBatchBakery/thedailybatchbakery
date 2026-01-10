// Utility Functions

/**
 * Generate a unique order number
 * Format: PREFIX-TIMESTAMP-RANDOM
 */
export function generateOrderNumber(prefix: string = 'TDB'): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `${prefix}-${timestamp}-${random}`;
}

/**
 * Normalize phone number (remove all non-digits)
 */
export function normalizePhone(phone: string): string {
  return phone.replace(/\D/g, '');
}

/**
 * Format phone number for display
 */
export function formatPhone(phone: string): string {
  const cleaned = normalizePhone(phone);
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  }
  return phone;
}

/**
 * Validate email address
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate Las Vegas zip code
 */
export function isValidLasVegasZip(zip: string, validZips: string[]): boolean {
  return validZips.includes(zip);
}

/**
 * Calculate delivery fee based on subtotal
 */
export function calculateDeliveryFee(
  subtotal: number,
  deliveryFee: number,
  freeDeliveryThreshold: number
): number {
  if (subtotal >= freeDeliveryThreshold) {
    return 0;
  }
  return deliveryFee;
}

/**
 * Check if date is at least N days in advance
 */
export function isValidDate(dateStr: string, minDays: number): boolean {
  const selectedDate = new Date(dateStr);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  selectedDate.setHours(0, 0, 0, 0);

  const diffTime = selectedDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return diffDays >= minDays;
}

/**
 * Generate time slots based on business hours
 */
export function generateTimeSlots(
  openTime: string,
  closeTime: string,
  intervalMinutes: number
): Array<{ value: string; label: string }> {
  const slots: Array<{ value: string; label: string }> = [];
  
  const [openHour, openMin] = openTime.split(':').map(Number);
  const [closeHour, closeMin] = closeTime.split(':').map(Number);
  
  let currentHour = openHour;
  let currentMin = openMin;
  
  while (
    currentHour < closeHour ||
    (currentHour === closeHour && currentMin < closeMin)
  ) {
    const hour12 = currentHour > 12 ? currentHour - 12 : currentHour === 0 ? 12 : currentHour;
    const ampm = currentHour >= 12 ? 'PM' : 'AM';
    const minStr = currentMin.toString().padStart(2, '0');
    
    slots.push({
      value: `${currentHour.toString().padStart(2, '0')}:${minStr}`,
      label: `${hour12}:${minStr} ${ampm}`,
    });
    
    currentMin += intervalMinutes;
    if (currentMin >= 60) {
      currentHour += Math.floor(currentMin / 60);
      currentMin = currentMin % 60;
    }
  }
  
  return slots;
}

/**
 * Format currency
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

