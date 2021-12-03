const baseDeDados = require('../bancodedados');
const { isValid } = require('date-fns');

let numero = 1;

const criarConta = async(req, res) => {
    if (!req.body.nome || !req.body.cpf || !req.body.data_nascimento || !req.body.telefone || !req.body.email || !req.body.senha)
        return res.status(400).json({ erro: 'Todos os campos são obrigatórios' });

    const buscarCPF = baseDeDados.contas.find(conta => conta.usuario.cpf === req.body.cpf);
    const buscarEmail = baseDeDados.contas.find(conta => conta.usuario.email === req.body.email);

    if (buscarEmail)
        return res.status(400).json({ erro: 'E-mail já cadastrado' });

    if (buscarCPF)
        return res.status(400).json({ erro: 'CPF já cadastrado' });

    if (typeof req.body.nome !== 'string' || typeof req.body.cpf !== 'string' || typeof req.body.email !== 'string' || typeof req.body.senha !== 'string')
        return res.status(400).json({ erro: "Todos campos devem ser texto." });

    if (!isValid(new Date(req.body.data_nascimento)) || req.body.data_nascimento.includes('/'))
        return res.status(400).json({ erro: 'Campo data_nascimento inválido' });

    const novaConta = {
        numero: numero,
        saldo: 0,
        usuario: {
            nome: req.body.nome,
            cpf: req.body.cpf,
            data_nascimento: req.body.data_nascimento,
            telefone: req.body.telefone,
            email: req.body.email,
            senha: req.body.senha
        }
    }

    baseDeDados.contas.push(novaConta);
    numero++;
    return res.status(201).json(novaConta);
}

module.exports = criarConta;