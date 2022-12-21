import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import MenuBar from './components/menubar.component';
import DetailProduk from './DetailProduk';

function App() {
  return (
    <div className="App d-flex flex-row">
      <MenuBar/>
      <DetailProduk />
    </div>
  );
}

export default App;
