module.exports = (req, res, next) => {
  res.locals.user = {
    name: 'Admin User',
    role: 'admin'
  };
  console.log(res);
  res.locals.year = new Date().getFullYear();
  next();
};
