const express = require('express');
const cors = require('cors');

const app = express();


app.use((req, res, next) => {
    res.status(200).send({
        mensagem: 'Ok, Deu certo'
    });
});

module.exports = app;
