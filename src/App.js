import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DynamicForm from './components/DynamicForm';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 py-6">
      <header className="max-w-4xl mx-auto px-6 mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dynamic Form Application</h1>
      </header>
      
      <main>
        <DynamicForm />
      </main>

      <footer className="max-w-4xl mx-auto px-6 mt-8 text-center text-gray-600">
        <p> 2024 Dynamic Form App. All rights reserved.</p>
      </footer>

      <ToastContainer position="bottom-right" />
    </div>
  );
}

export default App;
