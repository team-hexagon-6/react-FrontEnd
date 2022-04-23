import logo from "./logo.svg";
import "./assets/normalize.css";
// import "./App.css";
import "./views/registration/RegisterUser.css";

import RegisterUser from "./views/registration/RegisterUser";

function App() {
  return (
    <div className="App">
      <RegisterUser />
    </div>
  );
}

export default App;
