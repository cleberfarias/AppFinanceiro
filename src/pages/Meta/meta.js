import React, { useState } from 'react';
import './meta.css'; // Importa o CSS para estilização

const Meta = () => {
  // Estado para alternar entre formulários
  const [formType, setFormType] = useState('relatorio');

  // Estado para o formulário de Relatórios
  const [empresaRelatorio, setEmpresaRelatorio] = useState('');
  const [dataRelatorio, setDataRelatorio] = useState('');
  const [tipoRelatorio, setTipoRelatorio] = useState('');
  const [venda, setVenda] = useState(0);
  const [reuniao, setReuniao] = useState(0);
  const [pontos, setPontos] = useState(0);
  const [relatorios, setRelatorios] = useState([]);

  // Estado para o formulário de Agendamentos
  const [empresa, setEmpresa] = useState('');
  const [data, setData] = useState('');
  const [agendamentos, setAgendamentos] = useState(0);
  const [meta, setMeta] = useState(0); // Novo estado para meta
  const [metaAlcancada, setMetaAlcancada] = useState(false);
  const [agendamentoConcluido, setAgendamentoConcluido] = useState(false);
  const [agendamentosList, setAgendamentosList] = useState([]);

  // Função para alternar entre formulários
  const toggleForm = () => {
    setFormType(formType === 'relatorio' ? 'agendamentos' : 'relatorio');
  };

  // Função para adicionar relatório
  const adicionarRelatorio = () => {
    setRelatorios([...relatorios, {
      empresa: empresaRelatorio,
      data: dataRelatorio,
      tipo: tipoRelatorio,
      venda,
      reuniao,
      pontos
    }]);
    // Limpar campos após adicionar
    setEmpresaRelatorio('');
    setDataRelatorio('');
    setTipoRelatorio('');
    setVenda(0);
    setReuniao(0);
    setPontos(0);
  };

  // Função para adicionar agendamento
  const adicionarAgendamento = () => {
    setAgendamentosList([...agendamentosList, {
      empresa,
      data,
      agendamentos,
      meta,
      metaAlcancada,
      agendamentoConcluido
    }]);
    // Limpar campos após adicionar
    setEmpresa('');
    setData('');
    setAgendamentos(0);
    setMeta(0); // Limpar campo de meta
    setMetaAlcancada(false);
    setAgendamentoConcluido(false);
  };

  // Componente do Formulário de Relatório
  const RelatorioForm = () => (
    <>
      <label className='texto-form'>Cadastrar Empresa</label>
      <input
        type="text"
        placeholder="Empresa"
        value={empresaRelatorio}
        onChange={(e) => setEmpresaRelatorio(e.target.value)}
        className="input-field"
      />
      <label className='texto-form'>Data</label>
      <input
        type="date"
        value={dataRelatorio}
        onChange={(e) => setDataRelatorio(e.target.value)}
        className="input-field"
      />
      <label className='texto-form'>Tipo</label>
      <input
        type="text"
        placeholder="Tipo"
        value={tipoRelatorio}
        onChange={(e) => setTipoRelatorio(e.target.value)}
        className="input-field"
      />
      <label className='texto-form'>Venda</label>
      <input
        type="number"
        placeholder="Venda"
        value={venda}
        onChange={(e) => setVenda(Number(e.target.value))}
        className="input-field"
      />
      <label className='texto-form'>Reunião</label>
      <input
        type="number"
        placeholder="Reunião"
        value={reuniao}
        onChange={(e) => setReuniao(Number(e.target.value))}
        className="input-field"
      />
      <label className='texto-form'>Pontos</label>
      <input
        type="number"
        placeholder="Pontos"
        value={pontos}
        onChange={(e) => setPontos(Number(e.target.value))}
        className="input-field"
      />
    </>
  );

  // Componente do Formulário de Agendamentos
  const AgendamentosForm = () => (
    <>
      <label className='texto-form'>Cadastrar Empresa</label>
      <input
        type="text"
        placeholder="Empresa"
        value={empresa}
        onChange={(e) => setEmpresa(e.target.value)}
        className="input-field"
      />
      <label className='texto-form'>Data</label>
      <input
        type="date"
        value={data}
        onChange={(e) => setData(e.target.value)}
        className="input-field"
      />
      <label className='texto-form'>Número de Agendamentos</label>
      <input
        type="number"
        placeholder="Número de Agendamentos"
        value={agendamentos}
        onChange={(e) => setAgendamentos(Number(e.target.value))}
        className="input-field"
      />
      <label className='texto-form'>Meta</label>
      <input
        type="number"
        placeholder="Meta"
        value={meta}
        onChange={(e) => setMeta(Number(e.target.value))}
        className="input-field"
      />
      <label className='label'>
        Meta Alcançada:
        <input type="checkbox" checked={metaAlcancada} onChange={(e) => setMetaAlcancada(e.target.checked)} className="checkbox" />
      </label>
      <label className='label'>
        Agendamento Concluído:
        <input type="checkbox" checked={agendamentoConcluido} onChange={(e) => setAgendamentoConcluido(e.target.checked)} className="checkbox" />
      </label>
    </>
  );

  // Componente da Tabela de Relatórios
  const RelatoriosTable = () => (
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
  );

  // Componente da Tabela de Agendamentos
  const AgendamentosTable = () => (
    <table className="table">
      <thead>
        <tr>
          <th>Empresa</th>
          <th>Data</th>
          <th>Agendamentos</th>
          <th>Meta</th>
          <th>Meta Alcançada</th>
          <th>Agendamento Concluído</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        {agendamentosList.map((agendamento, index) => (
          <tr key={index}>
            <td>{agendamento.empresa}</td>
            <td>{agendamento.data}</td>
            <td>{agendamento.agendamentos}</td>
            <td>{agendamento.meta}</td>
            <td>{agendamento.metaAlcancada ? 'Sim' : 'Não'}</td>
            <td>{agendamento.agendamentoConcluido ? 'Sim' : 'Não'}</td>
            <td>
              {agendamento.agendamentos * (agendamento.metaAlcancada ? 2 : 1) * 10}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div className="meta-container">
      <button onClick={toggleForm} className="toggle-button">
        Alternar Formulário
      </button>

      {/* Renderiza o formulário atual baseado no estado */}
      {formType === 'relatorio' ? (
        <>
          <RelatorioForm />
          <button onClick={adicionarRelatorio} className="submit-button">Adicionar Relatório</button>
          <RelatoriosTable />
        </>
      ) : (
        <>
          <AgendamentosForm />
          <button onClick={adicionarAgendamento} className="submit-button">Adicionar Agendamento</button>
          <AgendamentosTable />
        </>
      )}
    </div>
  );
};

export default Meta;
