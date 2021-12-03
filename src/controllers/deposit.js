const { format } = require('date-fns');
const baseDeDados = require('../bancodedados');

const depositar = async(req, res) => {
    const { numero, valor } = req.body;

    if (numero === null || numero === undefined || valor === null || valor === undefined)
        return res.status(400).json({ erro: 'Todos os campos são obrigatórios.' });

    if (typeof numero === 'string' || typeof numero === 'boolean' || typeof valor === 'string' || typeof valor === 'boolean')
        return res.status(400).json({ erro: 'Todos os campos devem ser numéricos.' });

    const conta = baseDeDados.contas.find(conta => conta.numero === Number(numero));

    if (!conta)
        return res.status(404).json({ erro: `Conta número ${numero} não existe.` });

    if (Number(valor) <= 0)
        return res.status(400).json({ erro: 'Valor do deposito deve ser um número positivo maior que 0' });

    conta.saldo += valor;
    const registroDeposito = {
        data: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
        numero_conta: numero,
        valor: valor
    }
    baseDeDados.depositos.push(registroDeposito);
    return res.status(200).json({ mensagem: 'Depósito realizado com sucesso!' });
}

module.exports = depositar;