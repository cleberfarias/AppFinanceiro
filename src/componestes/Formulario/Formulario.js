import React, { useState } from 'react';
import './Formulario.css'; // Importando o arquivo de estilo

function Formulario({ onFormSubmit }) {
  const [empresa, setEmpresa] = useState('');
  const [data, setData] = useState('');
  const [tipo, setTipo] = useState('');
  const [venda, setVenda] = useState(false);
  const [reuniao, setReuniao] = useState(false);
  const [inputSalario, setInputSalario] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validação para garantir que todos os campos necessários estão preenchidos
    if (!empresa || !data || !tipo || !inputSalario) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    // Enviando os dados preenchidos
    onFormSubmit({ empresa, data, tipo, venda, reuniao, inputSalario });

    // Limpa o formulário após o envio
    handleClear();
  };

  const handleClear = () => {
    // Limpa todos os campos
    setEmpresa('');
    setData('');
    setTipo('');
    setVenda(false);
    setReuniao(false);
    setInputSalario('');
  };

  const handleDelete = () => {
    // Função de exclusão, pode ser ajustada conforme necessidade
    alert('Excluir registro...');
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h2 className="texto-form">Relatório de Pré-Vendas</h2>
      <label className="texto-form">Informe seu Salário</label>
      <input
        type="number"
        placeholder="Salário"
        value={inputSalario}
        onChange={(e) => setInputSalario(e.target.value)}
        className="input-field"
        required
      />
      <label className="texto-form">Cadastrar Empresa</label>
      <input
        type="text"
        placeholder="Empresa"
        value={empresa}
        onChange={(e) => setEmpresa(e.target.value)}
        className="input-field"
        required
      />
      <label className="texto-form">Mês e Ano</label>
      <input
        type="month"
        value={data}
        onChange={(e) => setData(e.target.value)}
        className="input-field"
        required
      />
      <label className="texto-form">Origem do Lead</label>
      <select value={tipo} onChange={(e) => setTipo(e.target.value)} className="input-field" required>
        <option value="">Selecione o tipo</option>
        <option value="GOOGLE ADS">GOOGLE ADS</option>
        <option value="FALECONOSCO">FALECONOSCO</option>
        <option value="TELEFONE">TELEFONE</option>
        <option value="INDICAÇÕES">INDICAÇÕES</option>
        <option value="EBOOK">EBOOK</option>
        <option value="WEBINAR">WEBINAR</option>
        <option value="EVENTO">EVENTO</option>
        <option value="BASE">BASE</option>
        <option value="OUTBOUND">OUTBOUND</option>
      </select>
      <label className="label">
        Venda:
        <input type="checkbox" checked={venda} onChange={(e) => setVenda(e.target.checked)} className="checkbox" />
      </label>
      <label className="label">
        Reunião:
        <input type="checkbox" checked={reuniao} onChange={(e) => setReuniao(e.target.checked)} className="checkbox" />
      </label>
      <div className="button-container">
        <button type="submit" className="submit-button">Cadastrar</button>
        <button type="button" onClick={handleClear} className="submit-button">Limpar</button>
        <button type="button" onClick={handleDelete} className="submit-button">Excluir</button>
      </div>
    </form>
  );
}

export default Formulario;
