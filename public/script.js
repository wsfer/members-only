Array.from(document.querySelectorAll('.js-date')).forEach((node) => {
  const postDate = new Date(node.dataset.timestamp);
  const userDate = new Date();
  const timeDiff = new Date(userDate - postDate);

  if (timeDiff.getUTCFullYear() - 1970 > 0) {
    node.textContent = `${timeDiff.getUTCFullYear() - 1970} year${timeDiff.getUTCFullYear() - 1970 > 1 ? 's' : ''} ago`;
  } else if (timeDiff.getUTCMonth() > 0) {
    node.textContent = `${timeDiff.getUTCMonth()} month${timeDiff.getUTCMonth() > 1 ? 's' : ''} ago`;
  } else if (timeDiff.getUTCDate() > 1) {
    node.textContent = `${timeDiff.getUTCDate()} day${timeDiff.getUTCDate() > 2 ? 's' : ''} ago`;
  } else if (timeDiff.getUTCHours() > 0) {
    node.textContent = `${timeDiff.getUTCHours()} hour${timeDiff.getUTCHours() > 1 ? 's' : ''} ago`;
  } else if (timeDiff.getUTCMinutes() > 0) {
    node.textContent = `${timeDiff.getUTCMinutes()} min${timeDiff.getUTCMinutes() > 1 ? 's' : ''} ago`;
  } else {
    node.textContent = `< 1 min ago`;
  }

  delete node.dataset.timestamp;
});
