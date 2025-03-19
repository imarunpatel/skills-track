export function formateDate(value: Date | string) {
    const date = new Date(value);

    const formattedDate = date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    });
    return formattedDate
}


export function formatTimeAgo(date: Date | string | number): string {
    // Convert input to Date object if needed
    const inputDate = date instanceof Date ? date : new Date(date);
    
    // Get current time
    const now = new Date();
    
    // Calculate time difference in milliseconds
    const diffMs = now.getTime() - inputDate.getTime();
    
    // Convert to seconds
    const diffSec = Math.floor(diffMs / 1000);
    
    // Less than a minute
    if (diffSec < 60) {
      return `${diffSec} sec ago`;
    }
    
    // Less than an hour
    const diffMin = Math.floor(diffSec / 60);
    if (diffMin < 60) {
      return `${diffMin} min${diffMin === 1 ? '' : 's'} ago`;
    }
    
    // Less than a day
    const diffHours = Math.floor(diffMin / 60);
    if (diffHours < 24) {
      return `${diffHours} hour${diffHours === 1 ? '' : 's'} ago`;
    }
    
    // Less than a week
    const diffDays = Math.floor(diffHours / 24);
    if (diffDays < 7) {
      return `${diffDays} day${diffDays === 1 ? '' : 's'} ago`;
    }
    
    // More than a week, return the date
    return inputDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }
  
  // 