import React from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { logo } from './assets';
import Home from './pages/Home';
import CreatePost from './pages/CreatePost';
import Summarize from './pages/Summarize';
import SummarizeApp from './components/SummarizeApp';

const App = () => (
  <BrowserRouter>
    <header className='w-full flex justify-between items-center bg-white z-50
    sm:px-8 px-4 py-4 border-b border-b-[#e6ebf4]'>
      <Link to="/">
      <img src={logo} alt="logo" className="w-28 object-contain" />
      </Link>

      <div>
          <Link to="/create-post" className="font-inter font-medium
           bg-black text-white border border-white hover:bg-white hover:text-black hover:border-black 
            hover:scale-150 duration-100 px-4 py-2 rounded-md mr-3">Create</Link>

          <Link to="/summarize" className="font-inter font-medium
           bg-black text-white border border-white hover:bg-white hover:text-black hover:border-black 
            hover:scale-150 duration-100 px-4 py-2 rounded-md mr-3">Summarize</Link>
      </div>
      
    </header>
    

    <main className='sm:p-8 px-4 py-8 w-full bg-[#f9fafe]
    min-h-[calc(100vh-73px)]'>

      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/create-post' element={<CreatePost/>} />
        <Route path='/summarize' element={<SummarizeApp/>}/>
      </Routes>
    </main>
    
  </BrowserRouter>
)

export default App;
