import React, { useState, useEffect } from 'react';
import { db, collection, addDoc, getDocs, deleteDoc, doc } from '../../firebaseConfig';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { Timestamp } from 'firebase/firestore';
import './financeiro.css';

const Financeiro = () => {
  const [fixedAccounts, setFixedAccounts] = useState([]);
  const [newFixedAccount, setNewFixedAccount] = useState({ name: '', value: '', installments: '' });
  const [payments, setPayments] = useState([]);
  const [newPayment, setNewPayment] = useState({ accountId: '', amount: '', date: '' });

  const [salary, setSalary] = useState('');
  const [commission, setCommission] = useState('');
  const [benefits, setBenefits] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (user) {
      const fetchData = async () => {
        const fixedAccountsSnapshot = await getDocs(collection(db, `users/${user.uid}/fixedAccounts`));
        const paymentsSnapshot = await getDocs(collection(db, `users/${user.uid}/payments`));
        const fetchedFixedAccounts = fixedAccountsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        const fetchedPayments = paymentsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setFixedAccounts(fetchedFixedAccounts);
        setPayments(fetchedPayments);
      };

      fetchData();
    }
  }, [user]);

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
    if (user && newFixedAccount.name && newFixedAccount.value && newFixedAccount.installments) {
      const accountData = {
        ...newFixedAccount,
        value: parseFloat(newFixedAccount.value),
        installments: parseInt(newFixedAccount.installments, 10),
        totalPaid: 0,
        remaining: parseFloat(newFixedAccount.value),
        uid: user.uid,
      };
      const docRef = await addDoc(collection(db, `users/${user.uid}/fixedAccounts`), accountData);
      setFixedAccounts((prev) => [...prev, { id: docRef.id, ...accountData }]);
      setNewFixedAccount({ name: '', value: '', installments: '' });
    }
  };

  const addPayment = async () => {
    if (user && newPayment.accountId && newPayment.amount && newPayment.date) {
      const paymentData = {
        ...newPayment,
        amount: parseFloat(newPayment.amount),
        date: new Date(newPayment.date), // Use JavaScript Date object
        accountName: fixedAccounts.find(account => account.id === newPayment.accountId)?.name || 'Desconhecida',
        uid: user.uid,
      };
      const docRef = await addDoc(collection(db, `users/${user.uid}/payments`), paymentData);
      setPayments((prev) => [...prev, { id: docRef.id, ...paymentData }]);
      setNewPayment({ accountId: '', amount: '', date: '' });
    }
  };

  const deleteFixedAccount = async (id) => {
    if (user) {
      await deleteDoc(doc(db, `users/${user.uid}/fixedAccounts`, id));
      setFixedAccounts((prev) => prev.filter(account => account.id !== id));

      // Também deletar os pagamentos relacionados a essa conta fixa
      const relatedPayments = payments.filter(payment => payment.accountId === id);
      for (const payment of relatedPayments) {
        await deleteDoc(doc(db, `users/${user.uid}/payments`, payment.id));
      }
      setPayments(prev => prev.filter(payment => payment.accountId !== id));
    }
  };

  const deletePayment = async (id) => {
    if (user) {
      await deleteDoc(doc(db, `users/${user.uid}/payments`, id));
      setPayments((prev) => prev.filter(payment => payment.id !== id));
    }
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
              {fixedAccounts.map((account) => (
                <tr key={account.id}>
                  <td className="border-b p-2">{account.name}</td>
                  <td className="border-b p-2">R$ {account.value.toFixed(2)}</td>
                  <td className="border-b p-2">{account.installments}</td>
                  <td className="border-b p-2">R$ {account.totalPaid ? account.totalPaid.toFixed(2) : '0.00'}</td>
                  <td className="border-b p-2">R$ {account.remaining ? account.remaining.toFixed(2) : '0.00'}</td>
                  <td className="border-b p-2">
                    <button onClick={() => deleteFixedAccount(account.id)} className="bg-red-500 text-white p-1 rounded">🗑️</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-4">
            <input
              type="text"
              name="name"
              value={newFixedAccount.name}
              onChange={handleFixedChange}
              placeholder="Nome da Conta"
              className="w-full p-2 border border-muted rounded"
            />
            <input
              type="number"
              name="value"
              value={newFixedAccount.value}
              onChange={handleFixedChange}
              placeholder="Valor Total"
              className="w-full p-2 border border-muted rounded mt-2"
            />
            <input
              type="number"
              name="installments"
              value={newFixedAccount.installments}
              onChange={handleFixedChange}
              placeholder="Parcelas"
              className="w-full p-2 border border-muted rounded mt-2"
            />
            <button onClick={addFixedAccount} className="bg-primary text-white p-2 rounded mt-2 w-full">Adicionar Conta Fixa</button>
          </div>
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
              {payments.map((payment) => (
                <tr key={payment.id}>
                  <td className="border-b p-2">{payment.accountName}</td>
                  <td className="border-b p-2">R$ {payment.amount.toFixed(2)}</td>
                  <td className="border-b p-2">{new Date(payment.date).toLocaleDateString()}</td>
                  <td className="border-b p-2">
                    <button onClick={() => deletePayment(payment.id)} className="bg-red-500 text-white p-1 rounded">🗑️</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-4">
            <select
              name="accountId"
              value={newPayment.accountId}
              onChange={handlePaymentChange}
              className="w-full p-2 border border-muted rounded"
            >
              <option value="">Selecione a Conta</option>
              {fixedAccounts.map((account) => (
                <option key={account.id} value={account.id}>{account.name}</option>
              ))}
            </select>
            <input
              type="number"
              name="amount"
              value={newPayment.amount}
              onChange={handlePaymentChange}
              placeholder="Valor"
              className="w-full p-2 border border-muted rounded mt-2"
            />
            <input
              type="date"
              name="date"
              value={newPayment.date}
              onChange={handlePaymentChange}
              placeholder="Data"
              className="w-full p-2 border border-muted rounded mt-2"
            />
            <button onClick={addPayment} className="bg-primary text-white p-2 rounded mt-2 w-full">Adicionar Pagamento</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Financeiro;
