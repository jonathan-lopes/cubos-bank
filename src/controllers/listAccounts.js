const baseDeDados = require('../bancodedados');

const listaContas = (req, res) => {
    if (!req.query.senha)
        return res.status(400).json({ Erro: 'Senha não foi passada na URL da requisição' });

    if (req.query.senha !== baseDeDados.banco.senha)
        return res.status(400).json({ Erro: 'Senha Inválida' });
    else
        return res.status(200).json(baseDeDados.contas);
}

module.exports = listaContas;