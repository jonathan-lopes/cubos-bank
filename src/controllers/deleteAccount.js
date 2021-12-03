const baseDeDados = require('../bancodedados');

const excluirConta = async(req, res) => {
    if (!Number(req.params.numeroConta) || Number(req.params.numeroConta) < 0)
        return res.status(400).json({ erro: `Parametro ${req.params.numeroConta} é Inválido.` });

    const conta = baseDeDados.contas.find(conta => conta.numero === Number(req.params.numeroConta));

    if (!conta)
        return res.status(400).json({ erro: `Conta número ${req.params.numeroConta} não existe.` });

    if (conta.saldo === 0) {
        const index = baseDeDados.contas.indexOf(conta);
        baseDeDados.contas.splice(index, 1);
        return res.status(200).json({ mensagem: 'Conta excluída com sucesso!' });
    } else {
        return res.status(400).json({ erro: `Você possui saldo de ${conta.saldo} saque antes de excluir a conta.` });
    }
}

module.exports = excluirConta;