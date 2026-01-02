import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Gateways from './pages/Gateways';
import SuccessGateway from './pages/SuccessGateway';
import Login from './pages/Login';
import Home from './pages/Home';
import { Toaster } from './components/ui/sonner';
import { ProtectedRoute } from './components/ProtectedRoute';

function App() {
  return (
    <>
    <Toaster />
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        
        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route
            path="*"
            element={
              <Layout>
                <Routes>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/gateways" element={<Gateways />} />
                  <Route path="/gateway-created" element={<SuccessGateway />} />
                </Routes>
              </Layout>
            }
          />
        </Route>
      </Routes>
    </Router>
    </>
  );
}

export default App;
