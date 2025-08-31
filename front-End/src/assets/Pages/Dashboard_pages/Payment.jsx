import React, { useState, useEffect } from 'react';

const PaymentPage = () => {
  const [payments, setPayments] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    amount: '',
    paymentType: '',
    receiptNo: '',
    student: { regNo: '' }
  });

  const paymentTypes = [
    'Room Rent',
    'Security Deposit',
    'Maintenance Fee',
    'Electricity Bill',
    'Water Bill',
    'Other'
  ];

  const API_BASE_URL = 'http://localhost:8080/api';

  // Fetch payments and students on component mount
  useEffect(() => {
    fetchPayments();
    fetchStudents();
  }, []);

  const fetchPayments = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/payments`);
      if (response.ok) {
        const data = await response.json();
        setPayments(data);
      } else {
        console.error('Failed to fetch payments');
      }
    } catch (error) {
      console.error('Error fetching payments:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStudents = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/students`);
      if (response.ok) {
        const data = await response.json();
        setStudents(data);
      } else {
        console.error('Failed to fetch students');
      }
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'regNo') {
      setFormData(prev => ({
        ...prev,
        student: { regNo: value }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      
      // Convert amount to BigDecimal format expected by backend
      const paymentData = {
        ...formData,
        amount: parseFloat(formData.amount)
      };
      
      const response = await fetch(`${API_BASE_URL}/payments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData),
      });

      if (response.ok) {
        const newPayment = await response.json();
        setPayments([...payments, newPayment]);
        setFormData({
          amount: '',
          paymentType: '',
          receiptNo: '',
          student: { regNo: '' }
        });
        alert('Payment recorded successfully!');
      } else {
        const errorText = await response.text();
        alert('Failed to record payment: ' + errorText);
      }
    } catch (error) {
      console.error('Error recording payment:', error);
      alert('Error recording payment');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString();
  };

  const formatCurrency = (amount) => {
    if (!amount) return 'N/A';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'LKR'
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex justify-center items-center h-64">
          <div className="text-xl">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Payment Management</h1>
      
      {/* Record Payment Form */}
      <div className="mb-8 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-3">Record New Payment</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Student</label>
            <select
              name="regNo"
              className="w-full p-2 border rounded"
              value={formData.student.regNo}
              onChange={handleChange}
              required
            >
              <option value="">Select Student</option>
              {students.map(student => (
                <option key={student.regNo} value={student.regNo}>
                  {student.regNo} - {student.fullName}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Amount</label>
            <input
              type="number"
              name="amount"
              placeholder="Amount"
              className="w-full p-2 border rounded"
              value={formData.amount}
              onChange={handleChange}
              step="0.01"
              min="0"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Payment Type</label>
            <select
              name="paymentType"
              className="w-full p-2 border rounded"
              value={formData.paymentType}
              onChange={handleChange}
              required
            >
              <option value="">Select Payment Type</option>
              {paymentTypes.map(type => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Receipt Number</label>
            <input
              type="text"
              name="receiptNo"
              placeholder="Receipt Number"
              className="w-full p-2 border rounded"
              value={formData.receiptNo}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="md:col-span-2">
            <button 
              type="submit" 
              className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 w-full"
              disabled={loading}
            >
              {loading ? 'Recording Payment...' : 'Record Payment'}
            </button>
          </div>
        </form>
      </div>

      {/* Payments List */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-3">Payment History</h2>
        
        {payments.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No payments recorded yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-2 px-4 border-b">Payment ID</th>
                  <th className="py-2 px-4 border-b">Student Reg No</th>
                  <th className="py-2 px-4 border-b">Student Name</th>
                  <th className="py-2 px-4 border-b">Amount</th>
                  <th className="py-2 px-4 border-b">Payment Type</th>
                  <th className="py-2 px-4 border-b">Receipt No</th>
                  <th className="py-2 px-4 border-b">Date</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment) => (
                  <tr key={payment.paymentId}>
                    <td className="py-2 px-4 border-b">{payment.paymentId}</td>
                    <td className="py-2 px-4 border-b">{payment.student?.regNo || 'N/A'}</td>
                    <td className="py-2 px-4 border-b">{payment.student?.fullName || 'N/A'}</td>
                    <td className="py-2 px-4 border-b">{formatCurrency(payment.amount)}</td>
                    <td className="py-2 px-4 border-b">{payment.paymentType}</td>
                    <td className="py-2 px-4 border-b">{payment.receiptNo}</td>
                    <td className="py-2 px-4 border-b">{formatDate(payment.date)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentPage;