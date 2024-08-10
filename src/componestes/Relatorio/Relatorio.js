import React from 'react';
import './Relatorios.css'; // Importando o arquivo de estilo

function Relatorios({ relatorios }) {
  const enviarEmail = () => {
    // Lógica para enviar por e-mail
    alert('Enviando por e-mail...');
  };

  const imprimirRelatorios = () => {
    // Lógica para imprimir
    window.print();
  };

  return (
    <div className="relatorios-container"> {/* Adicionando a classe CSS */}
      <h2 className="text-titulo">Relatórios</h2>
      <div className="button-container">
        <button onClick={enviarEmail} className="submit-button">Enviar por E-mail</button>
        <button onClick={imprimirRelatorios} className="submit-button">Imprimir</button>
      </div>
      <table className="table"> {/* Adicionando a classe CSS */}
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
              <td>{relatorio.venda ? 'Sim' : 'Não'}</td> {/* Formatando valor booleano */}
              <td>{relatorio.reuniao ? 'Sim' : 'Não'}</td> {/* Formatando valor booleano */}
              <td>{relatorio.pontos}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Relatorios;
