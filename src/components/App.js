import "bootstrap/dist/css/bootstrap.css";
import React from "react";
import { Route, Switch } from "react-router-dom";
import Header from "./common/Header";
import HomePage from "./HomePage";
import AdminPage from "./AdminPage";
import LoginPage from "./LoginPage";
import JournalEntriesPage from "./JournalEntriesPage";
import JournalEntryPage from "./JournalEntryPage";
import ProtectedRoute from "../Auth/ProtectedRoute";

function App() {
  return (
    <div className="container-fluid">
      <Header />
      <div className="body">
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/admin" component={AdminPage} />
          <ProtectedRoute
            path="/user/:userId/journalEntries/:entryId"
            component={JournalEntryPage}
          />
          <ProtectedRoute path="/user/:userId" component={JournalEntriesPage} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
