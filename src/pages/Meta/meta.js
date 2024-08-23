import React, { useState } from 'react';
import './meta.css';
import SidebarMenu from '../../componestes/SidebarMenu/SidebarMenu'; // Importe o SidebarMenu

function Meta() {
  const [relatorios, setRelatorios] = useState([]);
  const [inputSalario, setInputSalario] = useState(0);

  const handleFormSubmit = ({ empresa, data, tipo, venda, reuniao, inputSalario }) => {
    const novoRelatorio = {
      empresa: empresa,
      data: data,
      tipo: tipo,
      venda: venda ? 'Sim' : '',
      reuniao: reuniao ? 'Sim' : '',
      pontos: calcularPontos(tipo, venda, reuniao),
    };
    setRelatorios([...relatorios, novoRelatorio]);
    setInputSalario(parseFloat(inputSalario));
  };

  function calcularPontos(tipo, venda, reuniao) {
    let pontos = 0;
    if (venda) {
      switch (tipo) {
        case 'GOOGLE ADS':
        case 'FALECONOSCO':
        case 'TELEFONE':
        case 'INDICAÇÕES':
          pontos = 5;
          break;
        case 'EBOOK':
        case 'WEBINAR':
        case 'EVENTO':
        case 'BASE':
          pontos = 20;
          break;
        case 'OUTBOUND':
          pontos = 17;
          break;
        default:
          pontos = 0;
      }
    }
    if (reuniao) {
      switch (tipo) {
        case 'GOOGLE ADS':
        case 'FALECONOSCO':
        case 'TELEFONE':
        case 'INDICAÇÕES':
          pontos += 0.5;
          break;
        case 'EBOOK':
        case 'WEBINAR':
        case 'EVENTO':
        case 'BASE':
          pontos += 1;
          break;
        case 'OUTBOUND':
          pontos += 1.75;
          break;
        default:
          pontos += 0;
      }
    }
    return pontos;
  }

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
        </div>
      </form>
    );
  }

  function Relatorios({ relatorios }) {
    return (
      <div className="relatorios-container">
        <h2 className='text-titulo'>Relatórios</h2>
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
                <td>{relatorio.venda}</td>
                <td>{relatorio.reuniao}</td>
                <td>{relatorio.pontos}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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

    return (
      <div className="informacoes-container">
        <p>Total de pontos: {totalPontos}</p>
        <p>Salário: R$ {inputSalario.toFixed(2)}</p>
        <p>Comissão: R$ {totalComissao.toFixed(2)}</p>
        <p>Bônus: R$ {totalBonus.toFixed(2)}</p>
        <p>Total de Salário, Comissão e Bônus: R$ {totalSalarioComissaoEBonus.toFixed(2)}</p>
      </div>
    );
  }

  return (
    <div className="meta-page">
      
      <div className="meta-container">
        <Formulario onFormSubmit={handleFormSubmit} />
        <Relatorios relatorios={relatorios} />
        <InformacoesAdicionais relatorios={relatorios} inputSalario={inputSalario} />
      </div>
    </div>
  );
}

export default Meta;
