import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from './common/Header';
import HomePage from './HomePage';
import AdminPage from './AdminPage';
import JournalEntriesPage from './JournalEntriesPage';
import JournalEntryPage from './JournalEntryPage';
import NotFoundPage from './NotFoundPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//import ProtectedRoute from "../Auth/ProtectedRoute";

function App() {
  return (
    <div className='container-fluid'>
      <ToastContainer autoClose={3000} hideProgressBar />
      <Header />
      <div className='body'>
        <Switch>
          <Route path='/' exact component={HomePage} />
          <Route path='/admin' component={AdminPage} />
          <Route
            path='/user/:userId/journalEntries/:entryId'
            component={JournalEntryPage}
          />
          <Route path='/user/:userId' component={JournalEntriesPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
