import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/Login.css';

function Login() {
  const [cpf, setCpf] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/login', { cpf, senha });

      if (response.status === 200) {
        localStorage.setItem('token', response.data.token);
        navigate('/home');
      } else {
        setErro('Erro desconhecido');
      }
    } catch (error) {
      if (error.response) {
        setErro(error.response.data.message || 'Erro desconhecido');
      } else {
        setErro('Erro ao conectar com o servidor');
      }
    }
  };

  return (
    <div className="medic-login-container">
      <div className="medic-login-box">
        <img src="medic.png" alt="Logo Medic" className="medic-logo-image" />
        <h2 className="login-title">Seja Bem Vindo!</h2>
        
        <form className="medic-login-form" onSubmit={handleLogin}>
          <div className="input-group">
            <label>CPF</label>
            <input
              type="text"
              placeholder="CPF"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
              required
            />
            
            <label>Senha</label>
            <input
              type="password"
              placeholder="Senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
            
            <button type="submit" className="next-button">Entrar</button>
          </div>
        </form>

        <div className="login-options">
          <p>Não é cadastrado? <Link to="/cadastro">Cadastre-se!</Link></p>
        </div>

        {erro && <p className="error-message">{erro}</p>}
      </div>
    </div>
  );
}

export default Login;