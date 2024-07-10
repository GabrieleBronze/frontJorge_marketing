import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import './styleCadastros.css';

const CadastroForm = () => {
    const [form, setForm] = useState({
        nome: "",
        periodoInicio: "",
        periodoFim: "",
        descricao: "",
        conteudo: "",
        valor: ""
    });
    const [dados, setDados] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const[error, setError] = useState("");

    useEffect(() => {
        axios.get('http://localhost:8080/api/campanhas')
            .then(response => {
                setDados(response.data.content);
            })
            .catch(error => {
                console.error('Erro ao carregar as campanhas:', error);
            });
    }, []);
    

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

         const hoje = new Date().toISOString().split('T')[0];
        
        if (form.periodoInicio < hoje || form.periodoFim < hoje) {
            setError("As datas não podem ser anteriores à data atual.");
            return;
        }

        if (form.periodoInicio > form.periodoFim) {
            setError("A data de início não pode ser posterior à data final.");
            return;
        }

        setError("");

        if (editingId !== null) {
            axios.put(`http://localhost:8080/api/campanhas/${editingId}`, form)
                .then(response => {
                    setDados(dados.map((item) => (item.id === editingId ? response.data : item)));
                    setEditingId(null);
                    setForm({
                        nome: "",
                        periodoInicio: "",
                        periodoFim: "",
                        descricao: "",
                        conteudo: "",
                        valor: ""
                    });
                })
                .catch(error => {
                    console.error('Erro ao editar uma campanha:', error);
                });
        } else {
            axios.post('http://localhost:8080/api/campanhas', form)
                .then(response => {
                    setDados([...dados, response.data]);
                    setForm({
                        nome: "",
                        periodoInicio: "",
                        periodoFim: "",
                        descricao: "",
                        conteudo: "",
                        valor: ""
                    });
                })
                .catch(error => {
                    console.error('Erro ao adicionar uma campanha:', error);
                });
        }
    };

    const handleEdit = (item) => {
        setForm({
            nome: item.nome,
            periodoInicio: item.periodoInicio,
            periodoFim: item.periodoFim,
            descricao: item.descricao,
            conteudo: item.conteudo,
            valor: item.valor
        });
        setEditingId(item.id);
    };

    const handleDelete = (id) => {
        axios.delete(`http://localhost:8080/api/campanhas/${id}`)
            .then(() => {
                setDados(dados.filter((item) => item.id !== id));
            })
            .catch(error => {
                console.error('Erro ao excluir uma campanha:', error);
            });
    };

    return (
        <div className="container d-flex flex-column align-items-center justify-content-center min-vh-100">
            <div className="card p-4 shadow">
                <h2 className="text-center text-primary mb-4">Cadastro de Campanha</h2>
                {error && <div className="alert alert-danger">{error}</div>}
                <form onSubmit={handleSubmit} className="mb-4 w-100">
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <input
                                type="text"
                                className="form-control"
                                name="nome"
                                placeholder="Nome"
                                value={form.nome}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="col-md-6 mb-3">
                            <input
                                type="date"
                                className="form-control"
                                name="periodoInicio"
                                placeholder="Data Inicial"
                                value={form.periodoInicio}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="col-md-6 mb-3">
                            <input
                                type="date"
                                className="form-control"
                                name="periodoFim"
                                placeholder="Data Final"
                                value={form.periodoFim}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="col-md-6 mb-3">
                            <input
                                type="text"
                                className="form-control"
                                name="descricao"
                                placeholder="Descrição"
                                value={form.descricao}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="col-md-6 mb-3">
                            <input
                                type="text"
                                className="form-control"
                                name="conteudo"
                                placeholder="Conteúdo"
                                value={form.conteudo}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="col-md-6 mb-3">
                            <input
                                type="number"
                                className="form-control"
                                name="valor"
                                placeholder="Valor"
                                value={form.valor}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary w-100">{editingId ? 'Editar' : 'Adicionar'}</button>
                </form>
                <div className="table-responsive w-100">
                    <table className="table table-striped table-bordered text-center">
                        <thead className="thead-dark">
                            <tr>
                                <th>ID</th>
                                <th>Nome</th>
                                <th>Data Inicial</th>
                                <th>Data Final</th>
                                <th>Descrição</th>
                                <th>Conteúdo</th>
                                <th>Valor</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dados.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.nome}</td>
                                    <td>{item.periodoInicio}</td>
                                    <td>{item.periodoFim}</td>
                                    <td>{item.descricao}</td>
                                    <td>{item.conteudo}</td>
                                    <td>{item.valor}</td>
                                    <td>
                                        <button className="btn btn-warning btn-sm" onClick={() => handleEdit(item)}>Editar</button>
                                        <button className="btn btn-danger btn-sm ms-2" onClick={() => handleDelete(item.id)}>Excluir</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default CadastroForm;
