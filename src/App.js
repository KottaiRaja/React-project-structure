import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Signin from './Components/Signin';
import Signup from './Components/Signup';
import Adash  from './Components/admin/Adash';
import Aprod from './Components/admin/Aprod';

function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Signin/>}/>
      <Route path='/Signup' element={<Signup/>}/>
      <Route path='/Adash' element={<Adash/>}/>
      <Route path='/Aprod' element={<Aprod/>}/>
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
