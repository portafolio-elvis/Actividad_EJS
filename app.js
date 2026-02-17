const express = require('express');
const path = require('path');

const logger = require('./middlewares/logger');
const globals = require('./middlewares/globals');
const authorization = require('./middlewares/authorization');

const activeLink = require('./helpers/activeLink');
const roleBadge = require('./helpers/roleBadge');

//Middleware y helpers ayudan a al aplicacion 
//Helpers hacen tareas especificas , ayudan a las vistas
//Middleware interceptan las peticiones y se inyectan en las request y responses
//Verlos como filtros.

const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use("/bootstrap", express.static(path.join(__dirname, "node_modules/bootstrap/dist")));
app.use("/charts-js", express.static(path.join(__dirname, "node_modules/chart.js/dist")));


//Importando los Middleware de manera global
//Todas las peticiones serán interceptadas por estos
app.use(logger);
app.use(globals);
//app.use(authorization);

app.use((req, res, next) => {
  res.locals.currentPath = req.path;
  res.locals.activeLink = activeLink;
  res.locals.roleBadge = roleBadge;
  next();
});

app.get('/', (req, res) => {
  res.render('index', { title: 'Inicio' });
});

app.get('/dashboard',authorization ,(req, res) => {

  const metrics = {
    ventas: 15000,
    pedidos: 320,
    tareasPendientes: 12
  };

  const ventasMensuales = [5000, 7000, 8000, 6500, 9000, 12000];
  const meses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'];

  res.render('dashboard', {
    title: 'Dashboard Administrativo',
    metrics,
    ventasMensuales,
    meses
  });

});

app.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`);
});
