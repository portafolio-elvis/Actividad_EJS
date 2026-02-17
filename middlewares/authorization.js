module.exports = (req, res, next) => {
  if (res.locals.user.role === 'admin') {
    next();
  } else {
    res.render('no-autorizado', { title: 'Acceso Denegado' });
  }
};
