"use client"

import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Book {
  id: number;
  title: string;
}

interface User {
  id: number;
  name: string;
}

interface Loan {
  id: number;
  bookId: number;
  userId: number;
  loanDate: string;
  returnDate: string;
  book?: Book;
  user?: User;
}

const Loans = () => {
  const [loans, setLoans] = useState<Loan[]>([]);
  const [books, setBooks] = useState<Book[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [bookId, setBookId] = useState<number | null>(null);
  const [userId, setUserId] = useState<number | null>(null);
  const [loanDate, setLoanDate] = useState('');
  const [returnDate, setReturnDate] = useState('');

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const loanResponse = await axios.get('http://localhost:8080/api/loans');
        const bookResponse = await axios.get('http://localhost:8080/api/books');
        const userResponse = await axios.get('http://localhost:8080/api/users');

        const loansData = loanResponse.data;
        const booksData = bookResponse.data;
        const usersData = userResponse.data;

        // Map books and users by their ID for easy lookup
        const booksMap = booksData.reduce((map: { [x: string]: any; }, book: { id: string | number; }) => {
          map[book.id] = book;
          return map;
        }, {});

        const usersMap = usersData.reduce((map: { [x: string]: any; }, user: { id: string | number; }) => {
          map[user.id] = user;
          return map;
        }, {});

        // Add book and user details to each loan
        const enrichedLoans = loansData.map((loan: { bookId: string | number; userId: string | number; }) => ({
          ...loan,
          book: booksMap[loan.bookId],
          user: usersMap[loan.userId]
        }));

        setLoans(enrichedLoans);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };
    fetchLoans();
  }, []);

  const addLoan = async () => {
    if (bookId && userId) {
      const newLoan = { bookId, userId, loanDate, returnDate };
      try {
        const response = await axios.post('http://localhost:8080/api/loans', newLoan);
        const addedLoan = response.data;

        // Fetch the book and user details for the new loan
        const bookResponse = await axios.get(`http://localhost:8080/api/books/${addedLoan.bookId}`);
        const userResponse = await axios.get(`http://localhost:8080/api/users/${addedLoan.userId}`);

        const book = bookResponse.data;
        const user = userResponse.data;

        // Add the book and user details to the new loan
        setLoans(prevLoans => [...prevLoans, { ...addedLoan, book, user }]);

        setBookId(null);
        setUserId(null);
        setLoanDate('');
        setReturnDate('');
      } catch (error) {
        console.error('Failed to add loan:', error);
      }
    }
  };

  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
      <header className="text-center my-8">
        <h1 className="text-4xl font-bold text-blue-600">Empréstimos</h1>
      </header>
      <main>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Lista de Empréstimos</h2>
          <ul className="space-y-4">
            {loans.length > 0 ? (
              loans.map((loan) => (
                <li key={loan.id} className="p-4 border rounded-lg shadow-sm bg-white">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{loan.book?.title || 'No Title'}</h3>
                      <p className="text-gray-700">{loan.user?.name || 'No User'}</p>
                      <p className="text-gray-500">Loan Date: {loan.loanDate}</p>
                      <p className="text-gray-500">Return Date: {loan.returnDate}</p>
                    </div>
                  </div>
                </li>
              ))
            ) : (
              <p>Não foram encontrados empréstimos cadastrados.</p>
            )}
          </ul>
        </section>
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Cadastre um novo empréstimo</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <input
              type="number"
              placeholder="ID do livro"
              value={bookId !== null ? bookId : ''}
              onChange={(e) => setBookId(e.target.value ? parseInt(e.target.value, 10) : null)}
              className="p-3 border border-gray-300 rounded-lg"
            />
            <input
              type="number"
              placeholder="ID do usuário"
              value={userId !== null ? userId : ''}
              onChange={(e) => setUserId(e.target.value ? parseInt(e.target.value, 10) : null)}
              className="p-3 border border-gray-300 rounded-lg"
            />
            <input
              type="date"
              placeholder="Data do empréstimo"
              value={loanDate}
              onChange={(e) => setLoanDate(e.target.value)}
              className="p-3 border border-gray-300 rounded-lg"
            />
            <input
              type="date"
              placeholder="Data do retorno"
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              className="p-3 border border-gray-300 rounded-lg"
            />
            <button
              onClick={addLoan}
              className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Cadastrar empréstimo
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Loans;
