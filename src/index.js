const express = require('express');
const morgan= require('morgan');
const path= require('path');

const {mongoose} =require('./database');
const app = express();
// configuración Swagger
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Customer API",
      description: "Customer API Information",
      contact: {
        name: "Davis"
      }
    }
  },
  apis: ["src/routes/*.js"]
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);
// agrega Swagger a express  en la ruta /api-docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));


//configuración proxy para api externa en localhost
const request = require('request-promise');
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
  });

app.get('/last', async (req, res) => {
    await request(
    { url: 'https://www.indecon.online/last' },
    (error, response, body) => {
    if (error || response.statusCode !== 200) {
        return res.status(500).json({ type: 'error', message: err.message });
    }
        res.json(JSON.parse(body));
    }
)
});

app.get('/base', async (req, res) => {
    await request(
    { url: 'https://www.indecon.online/' },
    (error, response, body) => {
    if (error || response.statusCode !== 200) {
        return res.status(500).json({ type: 'error', message: err.message });
    }
        res.json(JSON.parse(body));
    }
)
});
app.get('/indicador/:id', async (req, res) => {
    await request(
    { url: 'https://www.indecon.online/values/'+req.params.id },
    (error, response, body) => {
    if (error || response.statusCode !== 200) {
        return res.status(500).json({ type: 'error', message: err.message });
    }
        res.json(JSON.parse(body));
    }
)
});

//Configuracion puerto
app.set('port', process.env.PORT || 3000);
//Middlewares
app.use(morgan('dev'));
app.use(express.json());
//Routes
app.use('/api/',require('./routes/task.routes'));
//static files
app.use(express.static(path.join(__dirname, 'public')));
//Starting server
app.listen(app.get('port'), ()=>{
 console.log(`server inicializado puerto ${app.get('port')}`);
});