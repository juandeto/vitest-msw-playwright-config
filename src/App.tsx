import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ItemList from './components/ItemList';
import ItemDetails from './components/ItemDetails';
import { PaletteIcon } from 'lucide-react';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <header className="bg-blue-600 text-white p-4">
          <div className="container mx-auto flex items-center">
            <PaletteIcon className="mr-2" />
            <h1 className="text-2xl font-bold">
              Art Institute of Chicago Explorer
            </h1>
          </div>
        </header>
        <main className="container mx-auto p-4">
          <Routes>
            <Route path="/" element={<ItemList />} />
            <Route path="/item/:id" element={<ItemDetails />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
