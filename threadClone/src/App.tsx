import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import DetailThread from './component/DetailThread';
import Login from './features/Login';
import MainLayout from './layout/MainLayout';
import Follows from './pages/Follows';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import MyProfile from './pages/Profile';
import Search from './pages/Search';

const App = () => {
  return ( 
    <Router>
      <Routes>
        <Route path='/' element={<MainLayout />}>
          <Route path='/' element={<Home />} />
          <Route path='/search' element={<Search />} />
          <Route path='/follows' element={<Follows />} />
          <Route path='/profile' element={<MyProfile />} />
          <Route path='/details/:id' element={<DetailThread />} />
        </Route>

        <Route path='*' element={<NotFound />} />
      </Routes>
    </Router>
  );
}
 
export default App;