import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Gateways from './pages/Gateways';
import SuccessGateway from './pages/SuccessGateway';
import Login from './pages/Login';
import { Toaster } from './components/ui/sonner';

function App() {
  return (
    <>
    <Toaster />
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="*"
          element={
            <Layout>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/gateways" element={<Gateways />} />
                <Route path="/gateway-created" element={<SuccessGateway />} />
              </Routes>
            </Layout>
          }
        />
      </Routes>
    </Router>
    </>
  );
}

export default App;
