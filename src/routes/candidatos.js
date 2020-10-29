const express = require ('express');
const { uuid } = require('uuidv4');
const router = express.Router();

// const candidato = {
//     id_candidato: string,
//     nome_candidato: string,
//     cidade_candidato: string,
//     notas_candidato: number,
// }

function create_UUID(){
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    return uuid;
}
console.log(create_UUID());

var listaCandidatos = [];
var listaNotas = [];
var i = 1;
var listaAprovados = [];

//RETORNA TODOS OS CANDIDATOS
router.get('/', (req,res,next) => {
    res.status(200).send({
        mensagem: 'Candidatos',
        candidatos: listaCandidatos,
    });
});

//RETORNA CANDIDATOS APROVADOS
router.get('/aprovados', (req, res, next)=>{
    listaCandidatos.map(function(candidato){
        let sum = 0
        for(i=0;i<=2;i++){
            sum = sum + Number(candidato.notas[i]);
            console.log("nota: " + candidato.notas[i]);
        }
        if(sum > 20){
            candidato["aprovado"]= true;
        }else {
            candidato["aprovado"]= false;
        }
        // console.log("aprovado: " + sum);
        // return sum;
    });
    let aprovados = listaCandidatos.filter(function(candidato){
        return candidato.aprovado === true;
    });
    listaAprovados = aprovados;
        res.status(201).send({
            mensagem: 'Candidatos Aprovados!',
            candidatos: aprovados
        });  
});

//RETORNA % DE CANDIDATOS APROVADOS POR CIDADE
router.get('/aprovados/porcentagem', (req, res, next)=>{
    const porcentagem = {
        cidade: req.body.cidade,
        vagas: req.body.vagas
    };
    let sum;
    let i;
    let listaProcentagemAprovadosCidades = [];

    for(i =0; i<listaAprovados.length;i++){
        sum = 0;
        for(let j = 0;j<listaAprovados.length;j++){
            if(listaAprovados[i].cidade_candidato === listaAprovados[j].cidade_candidato){
                sum++;
            }
        }
        listaProcentagemAprovadosCidades[i] = {
            "cidade":listaAprovados[i].cidade_candidato,
            "porcentagem":parseFloat(sum/listaAprovados.length) 
        }
    }
    //var listaqtdCidade = listaAprovados.filter(item => item.cidade === item[i].cidade).map(function(candidato){
      //  i++;
       // sum = sum + Number(candidato.notas[i]);
       // console.log("Qtd de cidades: " + listaqtdCidade);
    //});
        res.status(201).send({
            mensagem: 'Lista Porcentagem Aprovados por Cidade!',
            candidatos: listaProcentagemAprovadosCidades
        });  
});



//CADASTRAR CANDIDATOS
router.post('/', (req,res,next) => {
    var candidato = {
        id: create_UUID(),
        nome_candidato: req.body.nome,
        cidade_candidato: req.body.cidade,
    }
    listaCandidatos.push(candidato);
    
    res.status(201).send({
        mensagem: 'Candidato cadastrado',
        candidatoCriado: candidato
    })
});

//ALTERAR NOTA CANDIDATO
router.patch('/:id_candidato/notas', (req, res, next)=>{
    const id_candidato = req.params.id_candidato;
    listaNotas = req.body.notas;
    let candidato = listaCandidatos.find(item => item.id === id_candidato);
    const index = listaCandidatos.findIndex(item => item.id === id_candidato);
    candidato["notas"] = listaNotas;
        res.status(201).send({
            mensagem: 'Nota Cadastrada!',
            candidatos: listaCandidatos
        });  
});


//EXCLUI UM CANDIDATO
router.delete('/:id_candidato', (req, res, next)=>{
    const id_candidato = req.params.id_candidato;
    if(listaCandidatos[id_candidato] !== null){
        listaCandidatos.pop(candidato);
        res.status(201).send({
        mensagem: 'Candidato excluido',
        candidatos: listaCandidatos
    });
    }
});


module.exports = router;