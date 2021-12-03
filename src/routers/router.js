const express = require('express');
const criarConta = require('../controllers/createAccount');
const listaContas = require('../controllers/listAccounts');
const atualizarUsuarioConta = require('../controllers/updateAccount');
const excluirConta = require('../controllers/deleteAccount');
const depositar = require('../controllers/deposit');
const sacar = require('../controllers/withdraw');
const transferir = require('../controllers/transfer');
const saldo = require('../controllers/balance');
const extrato = require('../controllers/extract');

const roteador = express();

roteador.get('/contas', listaContas);
roteador.post('/contas', criarConta);
roteador.put('/contas/:numeroConta/usuario', atualizarUsuarioConta);
roteador.delete('/contas/:numeroConta', excluirConta);

roteador.post('/transacoes/depositar', depositar);
roteador.post('/transacoes/sacar', sacar);
roteador.post('/transacoes/transferir', transferir);
roteador.get('/contas/saldo', saldo);

roteador.get('/contas/extrato', extrato);

module.exports = roteador;