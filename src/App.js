import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Calendar from './components/Calendar';
import CoachesCarousel from './components/CoachesCarousel';

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

