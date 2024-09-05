import React, { useState, useEffect } from 'react';
import { db, collection, addDoc, getDocs, deleteDoc, doc } from '../../firebaseConfig';
import './financeiro.css';

const Financeiro = () => {
  const [fixedAccounts, setFixedAccounts] = useState([]);
  const [newFixedAccount, setNewFixedAccount] = useState({ name: '', value: '', installments: '' });
  const [payments, setPayments] = useState([]);
  const [newPayment, setNewPayment] = useState({ accountName: '', amount: '', date: '' });

  const [salary, setSalary] = useState('');
  const [commission, setCommission] = useState('');
  const [benefits, setBenefits] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const fixedAccountsSnapshot = await getDocs(collection(db, 'fixedAccounts'));
      const paymentsSnapshot = await getDocs(collection(db, 'payments'));
      const fetchedFixedAccounts = fixedAccountsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      const fetchedPayments = paymentsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setFixedAccounts(fetchedFixedAccounts);
      setPayments(fetchedPayments);
    };

    fetchData();
  }, []);

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

  const addFixedAccount = async () => {
    if (newFixedAccount.name && newFixedAccount.value && newFixedAccount.installments) {
      const accountData = {
        ...newFixedAccount,
        value: parseFloat(newFixedAccount.value),
        installments: parseInt(newFixedAccount.installments, 10),
        totalPaid: 0,
        remaining: parseFloat(newFixedAccount.value),
      };
      const docRef = await addDoc(collection(db, 'fixedAccounts'), accountData);
      setFixedAccounts((prev) => [...prev, { id: docRef.id, ...accountData }]);
      setNewFixedAccount({ name: '', value: '', installments: '' });
    }
  };

  const addPayment = async () => {
    if (newPayment.accountName && newPayment.amount && newPayment.date) {
      const paymentData = {
        ...newPayment,
        amount: parseFloat(newPayment.amount),
      };
      const docRef = await addDoc(collection(db, 'payments'), paymentData);
      setPayments((prev) => [...prev, { id: docRef.id, ...paymentData }]);
      setNewPayment({ accountName: '', amount: '', date: '' });
    }
  };

  const deleteFixedAccount = async (id) => {
    await deleteDoc(doc(db, 'fixedAccounts', id));
    setFixedAccounts((prev) => prev.filter(account => account.id !== id));
    setPayments(prev => prev.filter(payment => payment.accountName !== id));
  };

  const deletePayment = async (id) => {
    await deleteDoc(doc(db, 'payments', id));
    setPayments((prev) => prev.filter(payment => payment.id !== id));
  };

  const totalIncome = parseFloat(salary || '0') + parseFloat(commission || '0') + parseFloat(benefits || '0');
  const totalExpenses = fixedAccounts.reduce((sum, account) => sum + (account.value || 0), 0);
  const totalPayments = payments.reduce((sum, payment) => sum + (payment.amount || 0), 0);
  const netIncome = totalIncome - (totalExpenses - totalPayments);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-primary mb-4">Controle Financeiro</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-card p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-secondary">Receitas</h2>
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

        <div className="bg-card p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-secondary">Resumo</h2>
          <p>Receita Total: R$ {totalIncome.toFixed(2)}</p>
          <p>Total de Pagamentos: R$ {totalPayments.toFixed(2)}</p>
          <p>Despesas Totais: R$ {totalExpenses.toFixed(2)}</p>
          <p>Saldo Líquido: R$ {netIncome.toFixed(2)}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div className="bg-card p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-secondary">Contas Fixas</h2>
          <table className="min-w-full mt-2">
            <thead>
              <tr>
                <th className="border-b border-muted p-2">Conta</th>
                <th className="border-b border-muted p-2">Valor Total</th>
                <th className="border-b border-muted p-2">Parcelas</th>
                <th className="border-b border-muted p-2">Total Pago</th>
                <th className="border-b border-muted p-2">Restante</th>
                <th className="border-b border-muted p-2">Ações</th>
              </tr>
            </thead>
            <tbody>
              {fixedAccounts.map((account, index) => (
                <tr key={index}>
                  <td className="border-b p-2">{account.name}</td>
                  <td className="border-b p-2">R$ {account.value.toFixed(2)}</td>
                  <td className="border-b p-2">{account.installments}</td>
                  <td className="border-b p-2">R$ {account.totalPaid ? account.totalPaid.toFixed(2) : '0.00'}</td>
                  <td className="border-b p-2">R$ {account.remaining.toFixed(2)}</td>
                  <td className="border-b p-2">
                    <button onClick={() => deleteFixedAccount(account.id)} className="bg-red-500 text-white p-1 rounded">🗑️</button>
                  </td>
                </tr>
              ))}
              <tr>
                <td className="border-b p-2">
                  <input
                    type="text"
                    name="name"
                    value={newFixedAccount.name}
                    onChange={handleFixedChange}
                    placeholder="Nome da Conta"
                    className="w-full p-1 border border-muted rounded"
                  />
                </td>
                <td className="border-b p-2">
                  <input
                    type="number"
                    name="value"
                    value={newFixedAccount.value}
                    onChange={handleFixedChange}
                    placeholder="Valor"
                    className="w-full p-1 border border-muted rounded"
                  />
                </td>
                <td className="border-b p-2">
                  <input
                    type="number"
                    name="installments"
                    value={newFixedAccount.installments}
                    onChange={handleFixedChange}
                    placeholder="Parcelas"
                    className="w-full p-1 border border-muted rounded"
                  />
                </td>
                <td colSpan={2}></td>
                <td className="border-b p-2">
                  <button onClick={addFixedAccount} className="bg-blue-500 text-white p-1 rounded">Adicionar</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="bg-card p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-secondary">Pagamentos</h2>
          <table className="min-w-full mt-2">
            <thead>
              <tr>
                <th className="border-b border-muted p-2">Conta</th>
                <th className="border-b border-muted p-2">Valor</th>
                <th className="border-b border-muted p-2">Data</th>
                <th className="border-b border-muted p-2">Ações</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment, index) => (
                <tr key={index}>
                  <td className="border-b p-2">{payment.accountName}</td>
                  <td className="border-b p-2">R$ {payment.amount.toFixed(2)}</td>
                  <td className="border-b p-2">{payment.date}</td>
                  <td className="border-b p-2">
                    <button onClick={() => deletePayment(payment.id)} className="bg-red-500 text-white p-1 rounded">🗑️</button>
                  </td>
                </tr>
              ))}
              <tr>
                <td className="border-b p-2">
                  <select
                    name="accountName"
                    value={newPayment.accountName}
                    onChange={handlePaymentChange}
                    className="w-full p-1 border border-muted rounded"
                  >
                    <option value="">Selecione a Conta</option>
                    {fixedAccounts.map((account, index) => (
                      <option key={index} value={account.name}>
                        {account.name}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="border-b p-2">
                  <input
                    type="number"
                    name="amount"
                    value={newPayment.amount}
                    onChange={handlePaymentChange}
                    placeholder="Valor"
                    className="w-full p-1 border border-muted rounded"
                  />
                </td>
                <td className="border-b p-2">
                  <input
                    type="date"
                    name="date"
                    value={newPayment.date}
                    onChange={handlePaymentChange}
                    className="w-full p-1 border border-muted rounded"
                  />
                </td>
                <td className="border-b p-2">
                  <button onClick={addPayment} className="bg-blue-500 text-white p-1 rounded">Adicionar</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Financeiro;
