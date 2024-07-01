import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const Cadastro = () => {
    const [dados, setDados] = useState([]);
    const [form, setForm] = useState({
        id: null,
        nome: "Mkt",
        periodoInicio: "2024-06-30",
        periodoFim: "2024-07-01",
        descricao: "Mkt",
        conteudo: "Mkt",
        valor: "1234"
    });

    useEffect(() => {
        fetchDados();
    }, []);

    const fetchDados = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/campanhas');
            setDados(response.data);
        } catch (error) {
            console.error('Erro ao buscar dados', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (form.id) {

            try {
                await axios.put(`http://localhost:8080/api/campanhas/${form.id}`, form);
                setDados(dados.map(dado => (dado.id === form.id ? form : dado)));
            } catch (error) {
                console.error('Erro ao editar dado', error);
            }
        } else {

            try {
                const response = await axios.post('http://localhost:8080/api/campanhas', form);
                setDados([...dados, response.data]);
            } catch (error) {
                console.error('Erro ao adicionar dado', error);
            }
        }
        setForm({
            id: null,
            nome: "",
            periodoInicio: "",
            periodoFim: "",
            descricao: "",
            conteudo: "",
            valor: ""
        });
    };

    const handleEdit = (item) => {
        setForm(item);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/campanhas/${id}`);
            setDados(dados.filter(dado => dado.id !== id));
        } catch (error) {
            console.error('Erro ao excluir dado', error);
        }
    };

    return (
        <div className="container mt-4">
            <h2>Cadastro</h2>
            <form onSubmit={handleSubmit} className="mb-4">
                <div className="row">
                    <div className="col-md-2">
                        <input type="text"
                            className="form-control"
                            name="nome"
                            placeholder="Nome"
                            value={form.nome}
                            onChange={handleInputChange}
                            required />
                    </div>
                    <div className="col-md-2">
                        <input type="text"
                            className="form-control"
                            name="descricao"
                            placeholder="Descrição"
                            value={form.descricao}
                            onChange={handleInputChange}
                            required />
                    </div>
                    <div className="col-md-2">
                        <input type="text"
                            className="form-control"
                            name="conteudo"
                            placeholder="Conteúdo"
                            value={form.conteudo}
                            onChange={handleInputChange}
                            required />
                    </div>
                    <div className="col-md-2">
                        <input type="date"
                            className="form-control"
                            name="dataInicial"
                            placeholder="Data Inicial"
                            value={form.dataInicial}
                            onChange={handleInputChange}
                            required />
                    </div>
                    <div className="col-md-2">
                        <input type="date"
                            className="form-control"
                            name="dataFinal"
                            placeholder="Data Final"
                            value={form.dataFinal}
                            onChange={handleInputChange}
                            required />
                    </div>
                    <div className="col-md-2">
                        <input type="number"
                            className="form-control"
                            name="valor" placeholder="Valor"
                            value={form.valor}
                            onChange={handleInputChange}
                            required />
                    </div>
                </div>
                <button type="submit" className="btn btn-primary mt-2">{form.id ? 'Editar' : 'Adicionar'}</button>
            </form>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Descrição</th>
                        <th>Conteúdo</th>
                        <th>Data Inicial</th>
                        <th>Data Final</th>
                        <th>Valor</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {dados.map((item) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.nome}</td>
                            <td>{item.descricao}</td>
                            <td>{item.conteudo}</td>
                            <td>{item.dataInicial}</td>
                            <td>{item.dataFinal}</td>
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
    );
};

export default Cadastro;
