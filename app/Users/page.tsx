"use client";

import { useEffect, useState } from 'react';
import axios from '@/axiosConfig';

interface User {
  id: number;
  name: string;
  email: string;
}

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/users');
        if (Array.isArray(response.data)) {
          setUsers(response.data);
        } else {
          setUsers([]);
        }
      } catch (error) {
        console.error('Failed to fetch users:', error);
        setUsers([]);
      }
    };
    fetchUsers();
  }, []);

  const addUser = async () => {
    const newUser = { name, email };
    try {
      const response = await axios.post('/users', newUser);
      setUsers((prevUsers) => [...prevUsers, response.data]);
      setName('');
      setEmail('');
    } catch (error) {
      console.error('Failed to add user:', error);
    }
  };

  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
      <header className="text-center my-8">
        <h1 className="text-4xl font-bold text-blue-600">Usuários</h1>
      </header>
      <main>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Lista de Usuários</h2>
          <ul className="space-y-4">
            {users.map((user) => (
              <li key={user.id} className="p-4 border rounded-lg shadow-sm bg-white">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{user.name}</h3>
                    <p className="text-gray-700">{user.email}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Adicione um novo usuário</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <input
              type="text"
              placeholder="Nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="p-3 border border-gray-300 rounded-lg"
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-3 border border-gray-300 rounded-lg"
            />
            <button
              onClick={addUser}
              className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Adiconar usuário
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Users;
