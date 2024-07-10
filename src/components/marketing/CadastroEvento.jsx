import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import './styleCadastros.css';

const CadastroEvento = () => {
    const [form, setForm] = useState({
        nome: '',
        local: '',
        dataInicio: '',
        dataFinal: '',
        valor: '',
        custo: '',
        conteudo: '',
        descricao: ''
    });
    const [dados, setDados] = useState([]);
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:8080/api/eventos')
            .then(response => {
                setDados(response.data.content);
            })
            .catch(error => {
                console.error('Erro ao carregar os eventos:', error);
            });
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingId !== null) {
            axios.put(`http://localhost:8080/api/eventos/${editingId}`, form)
                .then(response => {
                    setDados(dados.map((item) => (item.id === editingId ? response.data : item)));
                    setEditingId(null);
                    setForm({
                        nome: '',
                        local: '',
                        dataInicio: '',
                        dataFinal: '',
                        valor: '',
                        custo: '',
                        conteudo: '',
                        descricao: ''
                    });
                })
                .catch(error => {
                    console.error('Erro ao editar o evento:', error);
                });
        } else {
            axios.post('http://localhost:8080/api/eventos', form)
                .then(response => {
                    setDados([...dados, response.data]);
                    setForm({
                        nome: '',
                        local: '',
                        dataInicio: '',
                        dataFinal: '',
                        valor: '',
                        custo: '',
                        conteudo: '',
                        descricao: ''
                    });
                })
                .catch(error => {
                    console.error('Erro ao adicionar o evento:', error);
                });
        }
    };

    const handleEdit = (item) => {
        setForm(item);
        setEditingId(item.id);
    };

    const handleDelete = (id) => {
        axios.delete(`http://localhost:8080/api/eventos/${id}`)
            .then(() => {
                setDados(dados.filter((item) => item.id !== id));
            })
            .catch(error => {
                console.error('Erro ao excluir o evento:', error);
            });
    };

    return (
        <div className="container d-flex flex-column align-items-center justify-content-center min-vh-100">
            <div className="card p-4 shadow">
                <h2 className="text-center text-primary mb-4">Cadastro de Eventos</h2>
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
                                type="text"
                                className="form-control"
                                name="local"
                                placeholder="Local"
                                value={form.local}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="col-md-6 mb-3">
                            <input
                                type="date"
                                className="form-control"
                                name="dataInicio"
                                placeholder="Data Início"
                                value={form.dataInicio}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="col-md-6 mb-3">
                            <input
                                type="date"
                                className="form-control"
                                name="dataFinal"
                                placeholder="Data Final"
                                value={form.dataFinal}
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
                        <div className="col-md-6 mb-3">
                            <input
                                type="number"
                                className="form-control"
                                name="custo"
                                placeholder="Custo"
                                value={form.custo}
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
                                type="text"
                                className="form-control"
                                name="descricao"
                                placeholder="Descrição"
                                value={form.descricao}
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
                                <th>Local</th>
                                <th>Data Início</th>
                                <th>Data Final</th>
                                <th>Valor</th>
                                <th>Custo</th>
                                <th>Conteúdo</th>
                                <th>Descrição</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dados.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.nome}</td>
                                    <td>{item.local}</td>
                                    <td>{item.dataInicio}</td>
                                    <td>{item.dataFinal}</td>
                                    <td>{item.valor}</td>
                                    <td>{item.custo}</td>
                                    <td>{item.conteudo}</td>
                                    <td>{item.descricao}</td>
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

export default CadastroEvento;
