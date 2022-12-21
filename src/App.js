// import './App.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import MenuBar from './components/menubar.component';

// function App() {
//   return (
//     <div className="App">
//       <MenuBar/>
//     </div>
//   );
// }

// export default App;

import './App.css';
import React from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Checkout from './components/checkout.component';
import MenuBar from './components/menubar.component';

function App() {


  return (
    <BrowserRouter>
            <Routes>
              <Route  path="/checkout" element={<Checkout/>} exact/>
              <Route  path="/menuBar" element={<MenuBar/>} exact/>
            </Routes>
    </BrowserRouter>
  );
}

export default App;
