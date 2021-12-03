const baseDeDados = require('../bancodedados');

const saldo = (req, res) => {
    const { numero_conta: numero, senha } = req.query;

    if (!numero || !senha)
        return res.status(400).json({ erro: 'Parâmetros insuficientes na URL da requisição' });

    const conta = baseDeDados.contas.find(conta => conta.numero === Number(numero));

    if (!conta)
        return res.status(404).json({ erro: `Conta número ${numero} não existe.` });
    if (conta.usuario.senha !== senha)
        return res.status(404).json({ erro: 'Senha não corresponde a conta.' });

    return res.status(200).json({ saldo: conta.saldo });
}

module.exports = saldo;