import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Gateways from './pages/Gateways';
// import GatewayCreatedSuccess from './pages/GatewayCreatedSuccess';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/gateways" element={<Gateways />} />
          {/* <Route path="/gateway-created" element={<Gateways />} /> */}
          <Route path="/gateway-created" element={<div> Hello </div>} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
