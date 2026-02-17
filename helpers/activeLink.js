module.exports = (currentPath, route) => {
  return currentPath === route ? 'active' : '';
};
