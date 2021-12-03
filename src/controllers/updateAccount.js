const baseDeDados = require('../bancodedados');
const { isValid } = require('date-fns');

function isEmptyObj(obj) {
    return Object.keys(obj).length === 0;
}

const atualizarUsuarioConta = (req, res) => {
    if (!Number(req.params.numeroConta) || Number(req.params.numeroConta) < 0)
        return res.status(400).json({ erro: `Parametro ${req.params.numeroConta} é Inválido.` });

    if (isEmptyObj(req.body))
        return res.status(400).json({ erro: "É necessário passar pelo menos um campo no body da requisição." });

    const buscarCPF = baseDeDados.contas.find(conta => conta.usuario.cpf === req.body.cpf);
    const buscarEmail = baseDeDados.contas.find(conta => conta.usuario.email === req.body.email);
    const conta = baseDeDados.contas.find(conta => conta.numero === Number(req.params.numeroConta));

    if (!conta)
        return res.status(404).json({ erro: `Conta número ${req.params.numeroConta} não existe.` });
    if (buscarEmail)
        return res.status(400).json({ erro: 'E-mail já cadastrado.' });
    if (buscarCPF)
        return res.status(400).json({ erro: 'CPF já cadastrado.' });
    if (!isValid(new Date(req.body.data_nascimento)) || req.body.data_nascimento.includes('/'))
        return res.status(400).json({ erro: 'Campo data_nascimento inválido' });

    conta.usuario.nome = req.body.nome || conta.usuario.nome;
    conta.usuario.cpf = req.body.cpf || conta.usuario.cpf;
    conta.usuario.data_nascimento = req.body.data_nascimento || conta.usuario.data_nascimento;
    conta.usuario.telefone = req.body.telefone || conta.usuario.telefone;
    conta.usuario.email = req.body.email || conta.usuario.email;
    conta.usuario.senha = req.body.senha || conta.usuario.senha;

    return res.status(200).json({ mensagem: "Conta atualizada com sucesso!" });
}

module.exports = atualizarUsuarioConta;