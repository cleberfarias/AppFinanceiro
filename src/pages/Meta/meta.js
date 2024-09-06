import React, { useState } from 'react';
import './meta.css'; // Importa o CSS para estilização

// Funções de Cálculo
function Formulario({ onFormSubmit }) {
  const [empresa, setEmpresa] = useState('');
  const [data, setData] = useState('');
  const [tipo, setTipo] = useState('');
  const [venda, setVenda] = useState(false);
  const [reuniao, setReuniao] = useState(false);
  const [inputSalario, setInputSalario] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (empresa && data && tipo && inputSalario) {
      onFormSubmit({ empresa, data, tipo, venda, reuniao, inputSalario });
      setEmpresa('');
      setData('');
      setTipo('');
      setVenda(false);
      setReuniao(false);
      setInputSalario('');
    } else {
      alert('Por favor, preencha todos os campos.');
    }
  };

  const handleClear = () => {
    setEmpresa('');
    setData('');
    setTipo('');
    setVenda(false);
    setReuniao(false);
    setInputSalario('');
  };

  const handleDelete = () => {
    alert('Excluir registro...');
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h2 className='texto-form'>Relatório de Pré-Vendas</h2>
      <label className='texto-form'>Informe seu Salário</label>
      <input
        type="text"
        placeholder="Salário"
        value={inputSalario}
        onChange={(e) => setInputSalario(e.target.value)}
        className="input-field"
      />
      <label className='texto-form'>Cadastrar Empresa</label>
      <input
        type="text"
        placeholder="Empresa"
        value={empresa}
        onChange={(e) => setEmpresa(e.target.value)}
        className="input-field"
      />
      <label className='texto-form'>Mês e Ano</label>
      <input
        type="text"
        placeholder="MM/AAAA"
        value={data}
        onChange={(e) => setData(e.target.value)}
        className="input-field"
      />
      <label className='texto-form'>Origem do Lead</label>
      <select value={tipo} onChange={(e) => setTipo(e.target.value)} className="input-field">
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

function InformacoesAdicionais({ relatorios, inputSalario }) {
  const totalPontos = relatorios.reduce((acc, curr) => acc + curr.pontos, 0);
  const totalComissao = calcularComissao(totalPontos);
  const totalBonus = calcularBonus(totalPontos);
  const totalSalarioComissaoEBonus = inputSalario + totalComissao + totalBonus;

  function calcularComissao(pontos) {
    let porcentagem = 0;
    if (pontos >= 9.5 && pontos <= 19.5) {
      porcentagem = 0.2;
    } else if (pontos >= 20 && pontos <= 38) {
      porcentagem = 0.5;
    } else if (pontos >= 38.5 && pontos <= 69) {
      porcentagem = 0.7;
    } else if (pontos >= 69.5) {
      porcentagem = 1;
    }
    return porcentagem * inputSalario;
  }

  function calcularBonus(pontos) {
    let bonus = 0;
    if (pontos >= 90) {
      bonus = 1500;
    } else if (pontos >= 80) {
      bonus = 1000;
    } else if (pontos >= 70) {
      bonus = 500;
    }
    return bonus;
  }

  const enviarEmail = () => {
    alert('Enviando por e-mail...');
  };

  const imprimirInformacoes = () => {
    window.print();
  };

  return (
    <div className="informacoes-container">
      <p>Total de pontos: {totalPontos}</p>
      <p>Salário: R$ {inputSalario}</p>
      <p>Comissão: R$ {totalComissao}</p>
      <p>Bônus: R$ {totalBonus}</p>
      <p>Total de Salário, Comissão e Bônus: R$ {totalSalarioComissaoEBonus}</p>
      <button onClick={enviarEmail} className="submit-button">Enviar por E-mail</button>
      <button onClick={imprimirInformacoes} className="submit-button">Imprimir</button>
    </div>
  );
}

function Relatorios({ relatorios }) {
  const enviarEmail = () => {
    alert('Enviando por e-mail...');
  };

  const imprimirRelatorios = () => {
    window.print();
  };

  return (
    <div className="relatorios-container">
      <h2 className='text-titulo'>Relatórios</h2>
      <div className="button-container">
        <button onClick={enviarEmail} className="submit-button">Enviar por E-mail</button>
        <button onClick={imprimirRelatorios} className="submit-button">Imprimir</button>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Empresa</th>
            <th>Data</th>
            <th>Tipo</th>
            <th>Venda</th>
            <th>Reunião</th>
            <th>Pontos</th>
          </tr>
        </thead>
        <tbody>
          {relatorios.map((relatorio, index) => (
            <tr key={index}>
              <td>{relatorio.empresa}</td>
              <td>{relatorio.data}</td>
              <td>{relatorio.tipo}</td>
              <td>{relatorio.venda ? 'Sim' : 'Não'}</td>
              <td>{relatorio.reuniao ? 'Sim' : 'Não'}</td>
              <td>{relatorio.pontos}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const Meta = () => {
  const [formType, setFormType] = useState('relatorio');
  const [relatorios, setRelatorios] = useState([]);
  const [agendamentosList, setAgendamentosList] = useState([]);
  const [inputSalario, setInputSalario] = useState('');

  const toggleForm = () => {
    setFormType(formType === 'relatorio' ? 'agendamento' : 'relatorio');
  };

  const adicionarRelatorio = (novoRelatorio) => {
    setRelatorios([...relatorios, novoRelatorio]);
  };

  const adicionarAgendamento = (novoAgendamento) => {
    setAgendamentosList([...agendamentosList, novoAgendamento]);
  };

  const TotalCard = ({ relatorios }) => {
    const totalPontos = relatorios.reduce((acc, curr) => acc + curr.pontos, 0);
    const totalComissao = calcularComissao(totalPontos);
    const totalBonus = calcularBonus(totalPontos);
    const totalSalarioComissaoEBonus = inputSalario + totalComissao + totalBonus;

    function calcularComissao(pontos) {
      let porcentagem = 0;
      if (pontos >= 9.5 && pontos <= 19.5) {
        porcentagem = 0.2;
      } else if (pontos >= 20 && pontos <= 38) {
        porcentagem = 0.5;
      } else if (pontos >= 38.5 && pontos <= 69) {
        porcentagem = 0.7;
      } else if (pontos >= 69.5) {
        porcentagem = 1;
      }
      return porcentagem * inputSalario;
    }

    function calcularBonus(pontos) {
      let bonus = 0;
      if (pontos >= 90) {
        bonus = 1500;
      } else if (pontos >= 80) {
        bonus = 1000;
      } else if (pontos >= 70) {
        bonus = 500;
      }
      return bonus;
    }

    return (
      <div className="total-card">
        <p>Total de pontos: {totalPontos}</p>
        <p>Salário: R$ {inputSalario}</p>
        <p>Comissão: R$ {totalComissao}</p>
        <p>Bônus: R$ {totalBonus}</p>
        <p>Total de Salário, Comissão e Bônus: R$ {totalSalarioComissaoEBonus}</p>
      </div>
    );
  };

  return (
    <div className="meta-container">
      <h1>Meta e Relatórios</h1>
      <button onClick={toggleForm} className="toggle-button">
        {formType === 'relatorio' ? 'Mostrar Agendamentos' : 'Mostrar Relatórios'}
      </button>
      {formType === 'relatorio' ? (
        <>
          <Formulario onFormSubmit={adicionarRelatorio} />
          <Relatorios relatorios={relatorios} />
          <TotalCard relatorios={relatorios} inputSalario={inputSalario} />
        </>
      ) : (
        <>
          <div className="form-container">
            <h2>Formulário de Agendamento</h2>
            <form>
              <label>Nome da Empresa:</label>
              <input
                type="text"
                placeholder="Nome da Empresa"
                className="input-field"
              />
              <label>Data do Agendamento:</label>
              <input
                type="text"
                placeholder="Data"
                className="input-field"
              />
              <label>Tipo de Agendamento:</label>
              <select className="input-field">
                <option>Selecione</option>
                <option>Tipo 1</option>
                <option>Tipo 2</option>
              </select>
              <button type="submit" className="submit-button">Cadastrar</button>
            </form>
          </div>
          {/* Adicionar lógica para exibir agendamentos */}
        </>
      )}
    </div>
  );
};

export default Meta;
