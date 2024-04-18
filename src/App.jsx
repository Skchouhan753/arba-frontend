import "./App.css";

import AllRoutes from "./AllRoutes/AllRoutes.jsx";

import Navbar from "./component/navbar/Navbar.jsx";


function App() {
  return (
    <>
      <div className="card">
        <Navbar/>
        
        <AllRoutes />
      </div>
    </>
  );
}

export default App;
