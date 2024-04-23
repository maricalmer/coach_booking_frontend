import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<CoachesCarousel/>}/>
        <Route path="/coaches/:id/slots" element={<Calendar/>} />
      </Routes>
    </Router>
  );
}

export default App;

