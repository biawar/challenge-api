const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const app = express();
const bodyParser = require('body-parser');

const rotaCandidatos = require('./routes/candidatos');
const rotaVagas = require('./routes/vagas');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false})); //apenas dados simples
app.use(bodyParser.json()); //json de entrada no body

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Header', 'Content-Type, X-Requested-With, Origin, Accept, Authorization');
    
    if(req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT , POST, PATCH, DELETE, GET');
        return res.status(200).send({});
    }

    next();
})

app.use('/candidatos', rotaCandidatos);
app.use('/vagas', rotaVagas);

//Quando não encontra a rota
app.use((req, res, next) => {
    const erro = new Error('Não encontrado');
    erro.status = 404;
    next(erro);
})

app.use((error, req, res, next) =>{
    res.status(error.status || 500);
    return res.send({
        erro: {
            mensagem: erro.message
        }
    });
});

module.exports = app;
