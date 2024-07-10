import { useNavigate } from 'react-router-dom';
import styles from './apresentacao.module.css'


export default function Apresentacao() {
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate('/Pesquisa');
    }

    return (
        <div className={styles.container}>
            <h2>Bem-vindo ao Setor de Marketing!</h2>
            <p>Conheça nossos serviços e estratégias.</p>
            <button className={styles.botaoApresentacao} onClick={handleNavigate}>Entrar</button>
        </div>
    );
}