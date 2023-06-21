import './App.sass';
import '../src/ui/image/image.module.sass';
import '../src/ui/fonts/fonts.module.sass';
import '../src/ui/adaptive/adaptive.module.sass';
import '../src/ui/button/button.module.sass';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import { Header } from './ui/header/header';
import { Page404 } from './page/Page404/Page404';
import { LoginForm } from './ui/LoginForm/LoginForm';
import { AdminPanel } from './page/AdminPage/AdminPage';
import { Products } from './page/Products/Products';
import { Farmsteads } from './page/Farmstead/Farmsteads';
import ItemProduct from './page/Products/ItemProducts/ItemProducts';
import ItemFarmstead from './page/Farmstead/farmsteadItem/ItemFarmstead';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <div>
          <Routes>
            <Route path={"/"} element={<AdminPanel />} />
            <Route path={"/farmstead"} element={<Farmsteads />} />
            <Route path="/farmstead/:id" element={<ItemFarmstead />} />
            <Route path={"/login"} element={<LoginForm />}/>
            <Route path={"/product"} element={<Products />}/>
            <Route path="/product/:id" element={<ItemProduct />} />
            <Route path={"*"} element={<Page404 />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
