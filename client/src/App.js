import { Routes,Route } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout';
import Order from './pages/Order'
import Cart from './pages/Cart';
import { UserContextProvider } from './components/UserContext';
import CartOrders from './components/CartOrders';
import AdminOrder from './pages/AdminOrder';
import AddMenu from './pages/AddMenu';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AdminLayout from './components/AdminLayout'
import Tables from './pages/Tables'
import SampleAdminOrder from './pages/SampleAdminOrder';
import Singletable from './pages/Singletable';
import Dashboard from './pages/Dashboard';
import EditMenu from './pages/EditMenu';

function App() {
  return (
    <UserContextProvider>
    {/* <CartOrders/> */}
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route path='/menu' element={<Order/>}/>
          <Route path='/cart' element={<Cart/>}/>
        </Route>
        <Route path='/admin/login' element={<Login/>}/>
        <Route path='/admin/signup' element={<Signup/>}/>
        <Route path='/admin' element={<AdminLayout/>}>
          <Route path='/admin/dashboard' element={<Dashboard/>}/>

        <Route path='/admin/table/:id' element={<Singletable/>}/>
        <Route path='/admin/order' element={<SampleAdminOrder/>}/>
        <Route path='/admin/addMenu' element={<AddMenu/>}/>
        <Route path='/admin/table' element={<Tables/>}/>
        <Route path='/admin/editMenu/:id' element={<EditMenu/>}/>
        </Route>
        <Route path='/test' element={<SampleAdminOrder/>}/>
      </Routes>

    </UserContextProvider>
  );
}

export default App;
