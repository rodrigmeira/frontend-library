"use client"

import React, { useEffect, useState } from 'react';
import axios from '@/axiosConfig'

interface Book {
  id: number;
  title: string;
  author: string;
  isbn: string;
}

const Books = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [isbn, setIsbn] = useState('');

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('/books'); // Usando o caminho correto
        setBooks(response.data);
      } catch (error) {
        console.error('Failed to fetch books:', error);
      }
    };
    fetchBooks();
  }, []);

  const addBook = async () => {
    const newBook = { title, author, isbn };
    try {
      const response = await axios.post('/books', newBook); // Usando o caminho correto
      setBooks([...books, response.data]);
      setTitle('');
      setAuthor('');
      setIsbn('');
    } catch (error) {
      console.error('Failed to add book:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Livros</h1>
      <ul className="space-y-2 mb-4">
        {books.map(book => (
          <li key={book.id} className="border p-2 rounded">
            {book.title} - {book.author} - {book.isbn}
          </li>
        ))}
      </ul>
      <h2 className="text-xl font-bold mb-2">Adicione um novo livro</h2>
      <div className="space-y-2">
        <input
          type="text"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <input
          type="text"
          placeholder="Autor"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <input
          type="text"
          placeholder="ISBN"
          value={isbn}
          onChange={(e) => setIsbn(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <button onClick={addBook} className="bg-blue-500 text-white p-2 rounded">Adicionar livro</button>
      </div>
    </div>
  );
};

export default Books;
