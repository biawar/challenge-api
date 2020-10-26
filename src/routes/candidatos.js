const express = require ('express');
const router = express.Router();

// const candidato = {
//     nome_candidato: String,
//     cidade_candidato: String,
//     notas_candidato: Array,
// }

// var listaCandidatos = new candidato();
var listaCandidatos = [];
var listaNotas = [];
var i = 1;

//RETORNA TODOS OS CANDIDATOS
router.get('/', (req,res,next) => {
    res.status(200).send({
        mensagem: 'Candidatos',
        candidatos: listaCandidatos,
    });
});

//CADASTRAR CANDIDATOS
router.post('/', (req,res,next) => {
    const candidato = {
        id: i++,
        nome_candidato: req.body.nome,
        cidade_candidato: req.body.cidade
    }
    listaCandidatos.push(candidato);
    
    res.status(201).send({
        mensagem: 'Candidato cadastrado',
        candidatoCriado: candidato
    })
});

//ALTERAR CANDIDATO
router.put('/:id_candidato', (req, res, next)=>{
    const id_candidato = req.params.id;
    res.status(201).send({
        // id:id_candidato,
        notas: listaNotas,
        mensagem: 'Nota Cadastrada!',
        candidatoAlterado: candidato
    })
});

//RETORNA OS DADOS DE UM PRODUTO
router.get('/:id_produto', (req,res,next) => {
    const id = req.params.id_produto

    if (id=== 'especial'){
        res.status(200).send({
            mensagem: 'Você descobriu o id especial',
            id: id
        });
    }else{
        res.status(200).send({
            mensagem: 'Você passou um ID'
        });
    }    
});

//EXCLUI UM PRODUTO
router.delete('/', (req, res, next)=>{
    res.status(201).send({
        mensagem: 'Produto excluido'
    })
});


module.exports = router;