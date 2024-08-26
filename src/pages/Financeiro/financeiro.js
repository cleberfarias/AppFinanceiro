import React, { useState, useEffect } from 'react';
import './financeiro.css';

const cardClass = "bg-card p-4 rounded-lg shadow";
const textClass = "text-xl font-semibold text-secondary";
const tableClass = "min-w-full mt-2";
const rowClass = "border-b border-muted p-2";

const Financeiro = () => {
  const [fixedAccounts, setFixedAccounts] = useState([]);
  const [newFixedAccount, setNewFixedAccount] = useState({ name: '', value: '', installments: '' });
  const [payments, setPayments] = useState([]);
  const [newPayment, setNewPayment] = useState({ accountName: '', amount: '', date: '' });

  const [salary, setSalary] = useState('');
  const [commission, setCommission] = useState('');
  const [benefits, setBenefits] = useState('');

  useEffect(() => {
    // Load data from localStorage
    const savedFixedAccounts = JSON.parse(localStorage.getItem('fixedAccounts')) || [];
    const savedPayments = JSON.parse(localStorage.getItem('payments')) || [];
    const savedSalary = localStorage.getItem('salary') || '';
    const savedCommission = localStorage.getItem('commission') || '';
    const savedBenefits = localStorage.getItem('benefits') || '';

    setFixedAccounts(savedFixedAccounts);
    setPayments(savedPayments);
    setSalary(savedSalary);
    setCommission(savedCommission);
    setBenefits(savedBenefits);
  }, []);

  useEffect(() => {
    updateFixedAccounts();
    // Save data to localStorage whenever there's a change
    localStorage.setItem('fixedAccounts', JSON.stringify(fixedAccounts));
    localStorage.setItem('payments', JSON.stringify(payments));
    localStorage.setItem('salary', salary);
    localStorage.setItem('commission', commission);
    localStorage.setItem('benefits', benefits);
  }, [fixedAccounts, payments, salary, commission, benefits]);

  const handleFixedChange = (e) => {
    const { name, value } = e.target;
    setNewFixedAccount((prev) => ({ ...prev, [name]: value }));
  };

  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    setNewPayment((prev) => ({ ...prev, [name]: value }));
  };

  const handleSalaryChange = (e) => setSalary(e.target.value);
  const handleCommissionChange = (e) => setCommission(e.target.value);
  const handleBenefitsChange = (e) => setBenefits(e.target.value);

  const addFixedAccount = () => {
    if (newFixedAccount.name && newFixedAccount.value && newFixedAccount.installments) {
      setFixedAccounts((prev) => [
        ...prev,
        {
          ...newFixedAccount,
          value: parseFloat(newFixedAccount.value),
          installments: parseInt(newFixedAccount.installments, 10),
          totalPaid: 0,
          remaining: parseFloat(newFixedAccount.value),
        },
      ]);
      setNewFixedAccount({ name: '', value: '', installments: '' });
    }
  };

  const addPayment = () => {
    if (newPayment.accountName && newPayment.amount && newPayment.date) {
      setPayments((prev) => [
        ...prev,
        {
          ...newPayment,
          amount: parseFloat(newPayment.amount),
        },
      ]);
      setNewPayment({ accountName: '', amount: '', date: '' });
    }
  };
  const updateFixedAccounts = () => {
    const paymentMap = payments.reduce((acc, payment) => {
      if (!acc[payment.accountName]) acc[payment.accountName] = 0;
      acc[payment.accountName] += payment.amount;
      return acc;
    }, {});
  
    setFixedAccounts((prevAccounts) => prevAccounts.map((account) => {
      const totalValue = account.value * account.installments;
      const totalPaid = paymentMap[account.name] || 0;
      const remaining = totalValue - totalPaid;
  
      return {
        ...account,
        totalPaid: totalPaid,
        remaining: remaining < 0 ? 0 : remaining,
      };
    }));
  };
  

  const deleteFixedAccount = (name) => {
    setFixedAccounts((prev) => {
      const updatedAccounts = prev.filter(account => account.name !== name);
      setPayments(prevPayments => prevPayments.filter(payment => payment.accountName !== name));
      return updatedAccounts;
    });
  };

  const deletePayment = (accountName, date) => {
    setPayments((prev) => prev.filter(payment => payment.accountName !== accountName || payment.date !== date));
  };

  const totalIncome = parseFloat(salary || '0') + parseFloat(commission || '0') + parseFloat(benefits || '0');
  const totalExpenses = fixedAccounts.reduce((sum, account) => sum + (account.value || 0), 0);
  const totalPayments = payments.reduce((sum, payment) => sum + (payment.amount || 0), 0);
  const netIncome = totalIncome - (totalExpenses - totalPayments);

  const calculateMonthlySummary = () => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    const monthlyIncome = parseFloat(salary || '0') + parseFloat(commission || '0') + parseFloat(benefits || '0');
    const monthlyPayments = payments.reduce((sum, payment) => {
      const paymentDate = new Date(payment.date);
      if (paymentDate.getMonth() === currentMonth && paymentDate.getFullYear() === currentYear) {
        sum += payment.amount;
      }
      return sum;
    }, 0);

    return { monthlyIncome, monthlyPayments };
  };

  const monthlySummary = calculateMonthlySummary();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-primary mb-4">Controle Financeiro</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className={`${cardClass} flex flex-col`}>
          <h2 className={textClass}>Receitas</h2>
          <div className="mb-2">
            <label className="block text-muted-foreground">Salário</label>
            <input
              type="number"
              value={salary}
              onChange={handleSalaryChange}
              placeholder="Salário"
              className="w-full p-2 border border-muted rounded"
            />
          </div>
          <div className="mb-2">
            <label className="block text-muted-foreground">Comissão</label>
            <input
              type="number"
              value={commission}
              onChange={handleCommissionChange}
              placeholder="Comissão"
              className="w-full p-2 border border-muted rounded"
            />
          </div>
          <div className="mb-2">
            <label className="block text-muted-foreground">Benefícios</label>
            <input
              type="number"
              value={benefits}
              onChange={handleBenefitsChange}
              placeholder="Benefícios"
              className="w-full p-2 border border-muted rounded"
            />
          </div>
        </div>

        <div className={`${cardClass} flex flex-col`}>
          <h2 className={textClass}>Resumo Mensal</h2>
          <div className="mb-2">
            <p><strong>Receita Total:</strong> R$ {monthlySummary.monthlyIncome.toFixed(2)}</p>
            <p><strong>Total Pagamentos:</strong> R$ {monthlySummary.monthlyPayments.toFixed(2)}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div className={cardClass}>
          <h2 className={textClass}>Contas Fixas</h2>
          <table className={tableClass}>
            <thead>
              <tr>
                <th className={`${rowClass} text-left p-2`}>Conta</th>
                <th className={`${rowClass} text-left p-2`}>Valor Total</th>
                <th className={`${rowClass} text-left p-2`}>Parcelas</th>
                <th className={`${rowClass} text-left p-2`}>Total Pago</th>
                <th className={`${rowClass} text-left p-2`}>Restante</th>
                <th className={`${rowClass} text-left p-2`}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {fixedAccounts.map((account, index) => (
                <tr key={index}>
                  <td className={`${rowClass} p-2`}>{account.name}</td>
                  <td className={`${rowClass} p-2`}>R$ {account.value ? account.value.toFixed(2) : '0.00'}</td>
                  <td className={`${rowClass} p-2`}>{account.installments}</td>
                  <td className={`${rowClass} p-2`}>R$ {account.totalPaid ? account.totalPaid.toFixed(2) : '0.00'}</td>
                  <td className={`${rowClass} p-2`}>R$ {account.remaining ? account.remaining.toFixed(2) : '0.00'}</td>
                  <td className={`${rowClass} p-2`}>
                    <button onClick={() => deleteFixedAccount(account.name)} className="bg-red-500 text-white p-1 rounded">🗑️</button>
                  </td>
                </tr>
              ))}
              <tr>
                <td className={`${rowClass} p-2`}>
                  <input
                    type="text"
                    name="name"
                    value={newFixedAccount.name}
                    onChange={handleFixedChange}
                    placeholder="Nome da Conta"
                    className="w-full p-1 border border-muted rounded"
                  />
                </td>
                <td className={`${rowClass} p-2`}>
                  <input
                    type="number"
                    name="value"
                    value={newFixedAccount.value}
                    onChange={handleFixedChange}
                    placeholder="Valor Total"
                    className="w-full p-1 border border-muted rounded"
                  />
                </td>
                <td className={`${rowClass} p-2`}>
                  <input
                    type="number"
                    name="installments"
                    value={newFixedAccount.installments}
                    onChange={handleFixedChange}
                    placeholder="Parcelas"
                    className="w-full p-1 border border-muted rounded"
                  />
                </td>
                <td className={`${rowClass} p-2`} colSpan="3">
                  <button onClick={addFixedAccount} className="bg-blue-500 text-white p-1 rounded">Adicionar</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className={cardClass}>
          <h2 className={textClass}>Pagamentos</h2>
          <table className={tableClass}>
            <thead>
              <tr>
                <th className={`${rowClass} text-left p-2`}>Conta</th>
                <th className={`${rowClass} text-left p-2`}>Valor</th>
                <th className={`${rowClass} text-left p-2`}>Data</th>
                <th className={`${rowClass} text-left p-2`}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment, index) => (
                <tr key={index}>
                  <td className={`${rowClass} p-2`}>{payment.accountName}</td>
                  <td className={`${rowClass} p-2`}>R$ {payment.amount ? payment.amount.toFixed(2) : '0.00'}</td>
                  <td className={`${rowClass} p-2`}>{payment.date}</td>
                  <td className={`${rowClass} p-2`}>
                    <button onClick={() => deletePayment(payment.accountName, payment.date)} className="bg-red-500 text-white p-1 rounded">🗑️</button>
                  </td>
                </tr>
              ))}
              <tr>
                <td className={`${rowClass} p-2`}>
                  <select
                    name="accountName"
                    value={newPayment.accountName}
                    onChange={handlePaymentChange}
                    className="w-full p-1 border border-muted rounded"
                  >
                    <option value="" disabled>Selecione uma Conta</option>
                    {fixedAccounts.map((account, index) => (
                      <option key={index} value={account.name}>{account.name}</option>
                    ))}
                  </select>
                </td>
                <td className={`${rowClass} p-2`}>
                  <input
                    type="number"
                    name="amount"
                    value={newPayment.amount}
                    onChange={handlePaymentChange}
                    placeholder="Valor"
                    className="w-full p-1 border border-muted rounded"
                  />
                </td>
                <td className={`${rowClass} p-2`}>
                  <input
                    type="date"
                    name="date"
                    value={newPayment.date}
                    onChange={handlePaymentChange}
                    placeholder="Data"
                    className="w-full p-1 border border-muted rounded"
                  />
                </td>
                <td className={`${rowClass} p-2`} colSpan="2">
                  <button onClick={addPayment} className="bg-blue-500 text-white p-1 rounded">Adicionar</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className={`${cardClass} mt-4`}>
        <h2 className={textClass}>Resumo Geral</h2>
        <p><strong>Receitas Totais:</strong> R$ {totalIncome.toFixed(2)}</p>
        <p><strong>Despesas Totais:</strong> R$ {totalExpenses.toFixed(2)}</p>
        <p><strong>Total Pagamentos:</strong> R$ {totalPayments.toFixed(2)}</p>
        <p><strong>Renda Líquida:</strong> R$ {netIncome.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default Financeiro;
