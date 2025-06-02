/**
 * Format date to Kurdish format
 */
export const formatDate = (date?: Date): string => {
  if (!date) return '';
  
  // Format as YYYY-MM-DD HH:MM
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  
  return `${year}-${month}-${day} ${hours}:${minutes}`;
};

/**
 * Get time elapsed since a date in Kurdish
 */
export const timeAgo = (date?: Date): string => {
  if (!date) return '';
  
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  
  if (days > 0) {
    return `${days} ڕۆژ پێش`;
  } else if (hours > 0) {
    return `${hours} کاتژمێر پێش`;
  } else if (minutes > 0) {
    return `${minutes} خولەک پێش`;
  } else {
    return 'ئێستا';
  }
};