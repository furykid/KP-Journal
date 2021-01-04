import "bootstrap/dist/css/bootstrap.css";
import React from "react";
import { Route, Switch } from "react-router-dom";
import Header from "./common/Header";
import HomePage from "./HomePage";
import AdminPage from "./AdminPage";
import LoginPage from "./LoginPage";
import JournalEntriesPage from "./JournalEntriesPage";
import JournalEntryPage from "./JournalEntryPage";

function App() {
  return (
    <div className="container-fluid">
      <Header />
      <div className="body">
        <Switch>
          <Route path="/" exact component={LoginPage} />
          <Route path="/admin" component={AdminPage} />
          <Route
            path="/user/:userId/journalEntries/:entryId"
            component={JournalEntryPage}
          />
          <Route path="/user/:userId" component={JournalEntriesPage} />
          <Route path="/user" component={HomePage} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
