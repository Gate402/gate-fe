import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Gateways from './pages/Gateways';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/gateways" element={<Gateways />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
