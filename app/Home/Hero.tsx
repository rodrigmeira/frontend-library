import React from 'react';
import Link from 'next/link';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <header className="w-full bg-blue-600 p-4 shadow-md">
        <h1 className="text-white text-2xl font-bold text-center">Gerenciamento da biblioteca</h1>
      </header>
      <main className="flex flex-col items-center justify-center mt-8">
        <h2 className="text-3xl font-semibold mb-4">Bem-vindo a Biblioteca!</h2>
        <p className="text-gray-700 mb-8 text-center">
          Gerencie livros, usuários e empréstimos com facilidade. Selecione uma opção abaixo para começar.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl">
          <Link href="/Books" className="bg-white p-6 rounded-lg shadow-md hover:bg-blue-100 transition">

              <h3 className="text-xl font-semibold mb-2">Livros</h3>
              <p>Veja e gerencie a coleção de livros.</p>

          </Link>
          <Link href="/Users" className="bg-white p-6 rounded-lg shadow-md hover:bg-blue-100 transition">

              <h3 className="text-xl font-semibold mb-2">Usuários</h3>
              <p>Gerencie os usuários da biblioteca.</p>

          </Link>
          <Link href="/Loans" className="bg-white p-6 rounded-lg shadow-md hover:bg-blue-100 transition"
>
              <h3 className="text-xl font-semibold mb-2">Empréstimos</h3>
              <p>Tenha o controle dos empréstimos de livros.</p>

          </Link>
        </div>
      </main>
      <footer className="w-full bg-blue-600 p-4 mt-8">
        <p className="text-white text-center">© 2024 Library Management System</p>
      </footer>
    </div>
  );
};

export default Home;
