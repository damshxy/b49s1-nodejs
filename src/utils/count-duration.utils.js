function distanceTime(startDate, endDate) {
    let distance = new Date(endDate) - new Date(startDate);
    let days = Math.floor(distance / (1000 * 3600 * 24));
    let weeks = Math.floor(distance / (1000 * 3600 * 24 * 7));
    let months = Math.floor(distance / (1000 * 3600 * 24 * 30));
    let years = Math.floor(distance / (1000 * 3600 * 24 * 30 * 12));
  
    if (years == 1) {
      return `${years} year`;
    } else if (years > 0) {
      return `${years} years`;
    } else if (months == 1) {
      return `${months} month`;
    } else if (months > 0) {
      return `${months} months`;
    } else if (weeks == 1) {
      return `${weeks} week`;
    } else if (weeks > 0) {
      return `${weeks} weeks`;
    } else if (days == 1) {
      return `${days} day`;
    } else if (days > 0) {
      return `${days} days`;
    }
  }

  module.exports = distanceTime