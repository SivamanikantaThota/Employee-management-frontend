import './App.css';
import Header from "./pages/header/Header"
import { Route, Routes } from 'react-router-dom';
import Dashboard from './pages/dashboard/dashboard';

import PostUser from './pages/employee/PostUser';
import UpdateUser from './pages/employee/UpdateUser';
import NoMatch from './pages/nomatch/NoMatch';

function App() {
  return (
    <>
    <Header />
    <Routes>
      <Route path='/' element={<Dashboard/>} />
      <Route path='/employee' element={<PostUser/>}/>
      <Route path='/employee/:id' element={<UpdateUser/>}/>
      <Route path='*' element={<NoMatch/>}/>
    </Routes>
    </>
      
  );
}
export default App;
