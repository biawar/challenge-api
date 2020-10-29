const express = require ('express');
const router = express.Router();

// var listaCandidatos = new candidato();
var listaVagas = [];
var i = 1;

//CADASTRAR VAGAS CIDADES
router.post('/', (req,res,next) => {
    const vagas = {
        cidade: req.body.cidade,
        vagas: req.body.vagas
    }
    listaVagas.push(vagas);
    
    res.status(201).send({
        mensagem: 'Vaga cadastrada!',
        vagaCadastrada: vagas
    })
});

//RETORNA TODAS AS VAGAS
router.get('/', (req,res,next) => {
    res.status(200).send({
        mensagem: 'Vagas',
        vagas: listaVagas,
    });
});




module.exports = router;