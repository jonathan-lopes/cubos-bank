const { format } = require('date-fns');
const baseDeDados = require('../bancodedados');

const tranferir = (req, res) => {
    const {
        numero_da_conta_origem: numeroOrigem,
        senha,
        valor,
        numero_da_conta_destino: numeroDestino
    } = req.body;

    if (numeroOrigem === null || numeroOrigem === undefined || valor === null || valor === undefined || senha === null || senha === undefined || numeroDestino === null || numeroDestino === undefined)
        return res.status(400).json({ erro: 'Todos os campos são obrigatórios.' });

    const contaOrigem = baseDeDados.contas.find(conta => conta.numero === Number(numeroOrigem));
    const contaDestino = baseDeDados.contas.find(conta => conta.numero === Number(numeroDestino));

    if (!contaOrigem)
        return res.status(404).json({ erro: 'Conta de origem não existe.' });
    if (!contaDestino)
        return res.status(404).json({ erro: 'Conta de destino não existe.' });
    if (numeroOrigem === numeroDestino)
        return res.status(400).json({ erro: 'Você não pode tranferir para você mesmo.' });
    if (contaOrigem.usuario.senha !== senha)
        return res.status(404).json({ erro: 'Senha não corresponde a conta.' });
    if (contaOrigem.saldo < valor)
        return res.status(400).json({ erro: 'Saldo insuficiente.' });

    contaOrigem.saldo -= valor;
    contaDestino.saldo += valor;

    const registroTransferencia = {
        data: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
        numero_conta_origem: numeroOrigem,
        numero_conta_destino: numeroDestino,
        valor: valor
    }
    baseDeDados.transferencias.push(registroTransferencia);
    return res.status(200).json({ mensagem: "Transferência realizada com sucesso!" });
}

module.exports = tranferir;