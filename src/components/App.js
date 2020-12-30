import "bootstrap/dist/css/bootstrap.css";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import Header from "./common/Header";
import Footer from "./common/Footer";
import HomePage from "./HomePage";
import AdminPage from "./AdminPage";

function App() {
  return (
    <div className="container-fluid">
      <Header />
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/admin" component={AdminPage} />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
