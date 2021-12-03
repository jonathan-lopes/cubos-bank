const { format } = require('date-fns');
const baseDeDados = require('../bancodedados');

const sacar = (req, res) => {
    const { numero, valor, senha } = req.body;

    if (numero === null || numero === undefined || valor === null || valor === undefined || senha === null || senha === undefined)
        return res.status(400).json({ erro: 'Todos os campos são obrigatórios.' });

    if (typeof numero === 'string' || typeof numero === 'boolean' || typeof valor === 'string' || typeof valor === 'boolean')
        return res.status(400).json({ erro: 'Os campos numero e valor devem ser numéricos.' });

    if (typeof senha !== "string")
        return res.status(400).json({ erro: 'O campo deve ser texto' });

    const conta = baseDeDados.contas.find(conta => conta.numero === Number(numero));

    if (!conta)
        return res.status(404).json({ erro: `Conta número ${numero} não existe.` });
    if (conta.usuario.senha !== senha)
        return res.status(404).json({ erro: 'Senha não corresponde a conta.' });
    if (conta.saldo < valor)
        return res.status(400).json({ erro: 'Saldo insuficiente.' });

    conta.saldo -= valor;
    const registroSaque = {
        data: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
        numero_conta: numero,
        valor: valor
    }
    baseDeDados.saques.push(registroSaque);
    return res.status(200).json({ mensagem: 'Saque realizado com sucesso!' });
}

module.exports = sacar;