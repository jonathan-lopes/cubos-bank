const baseDeDados = require('../bancodedados');

const extrato = (req, res) => {
    const { numero_conta: numero, senha } = req.query;

    if (!numero || !senha)
        return res.status(400).json({ erro: 'Parâmetros insuficientes na URL da requisição' });

    const conta = baseDeDados.contas.find(conta => conta.numero === Number(numero));

    if (!conta)
        return res.status(404).json({ erro: `Conta número ${numero} não existe.` });
    if (conta.usuario.senha !== senha)
        return res.status(404).json({ erro: 'Senha não corresponde a conta.' });

    const extrato = {
        depositos: baseDeDados.depositos.filter(deposito => deposito.numero_conta === Number(numero)),
        saques: baseDeDados.saques.filter(saque => saque.numero_conta === Number(numero)),
        transferenciasEnviadas: baseDeDados.transferencias.filter(transferencia => transferencia.numero_conta_origem === Number(numero)),
        transferenciasRecebidas: baseDeDados.transferencias.filter(transferencia => transferencia.numero_conta_destino === Number(numero)),
    }
    return res.status(200).json(extrato);
}

module.exports = extrato;