import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import './styleCadastros.css';

const CadastroIndicadores = () => {
    const [form, setForm] = useState({
        nome: '',
        descricao: '',
        setor: ''
    });
    const [dados, setDados] = useState([]);
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:8080/api/indicadores')
            .then(response => {
                setDados(response.data.content);
            })
            .catch(error => {
                console.error('Erro ao carregar os indicadores:', error);
            });
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingId !== null) {
            axios.put(`http://localhost:8080/api/indicadores/${editingId}`, form)
                .then(response => {
                    setDados(dados.map((item) => (item.id === editingId ? response.data : item)));
                    setEditingId(null);
                    setForm({
                        nome: '',
                        descricao: '',
                        setor: ''
                    });
                })
                .catch(error => {
                    console.error('Erro ao editar um indicador:', error);
                });
        } else {
            axios.post('http://localhost:8080/api/indicadores', form)
                .then(response => {
                    setDados([...dados, response.data]);
                    setForm({
                        nome: '',
                        descricao: '',
                        setor: ''
                    });
                })
                .catch(error => {
                    console.error('Erro ao adicionar um indicador:', error);
                });
        }
    };

    const handleEdit = (item) => {
        setForm(item);
        setEditingId(item.id);
    };

    const handleDelete = (id) => {
        axios.delete(`http://localhost:8080/api/indicadores/${id}`)
            .then(() => {
                setDados(dados.filter((item) => item.id !== id));
            })
            .catch(error => {
                console.error('Erro ao excluir um indicador:', error);
            });
    };

    return (
        <div className="container d-flex flex-column align-items-center justify-content-center min-vh-100">
            <div className="card p-4 shadow">
                <h2 className="text-center text-primary mb-4">Cadastro de Indicadores</h2>
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
                                name="setor"
                                placeholder="Setor"
                                value={form.setor}
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
                                <th>Descrição</th>
                                <th>Setor</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dados.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.nome}</td>
                                    <td>{item.descricao}</td>
                                    <td>{item.setor}</td>
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

export default CadastroIndicadores;
