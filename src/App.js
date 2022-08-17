import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { screenRoutes } from './constants/routesPath';
import {MainLayout} from './layouts/mainLayout/MainLayout'
import Home from './screens/Home';
import Dashboard from './screens/employees/Dashboard';
import NotFound from './screens/NotFound';

function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route exact path={screenRoutes.HOME} element={<Home/>} />
          <Route exact path={screenRoutes.DASHBOARD} element={<Dashboard/>} />
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;
