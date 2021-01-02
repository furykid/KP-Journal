import "bootstrap/dist/css/bootstrap.css";
import { Route, Switch } from "react-router-dom";
import Header from "./common/Header";
import Footer from "./common/Footer";
import HomePage from "./HomePage";
import AdminPage from "./AdminPage";
import LoginPage from "./LoginPage";
import JournalEntriesPage from "./JournalEntriesPage";

function App() {
  return (
    <div className="container-fluid">
      <Header />
      <Switch>
        <Route path="/" exact component={LoginPage} />
        <Route path="/admin" component={AdminPage} />
        <Route path="/user/:id" component={JournalEntriesPage} />
        <Route path="/user" component={HomePage} />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
