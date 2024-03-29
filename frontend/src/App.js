import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Public from './components/Public'
import Login from './features/auth/Login';
import DashLayout from './components/DashLayout'
import Welcome from './features/auth/Welcome'
import TripsList from './features/trips/TripsList'
import TicketsList from './features/store/TicketList';
import UsersList from './features/users/UsersList'
import EditUser from './features/users/EditUser'
import NewUserForm from './features/users/NewUserForm'
import EditTrip from './features/trips/EditTrip'
import NewTrip from './features/trips/NewTrip'
import Prefetch from './features/auth/Prefetch'
import PersistLogin from './features/auth/PersistLogin'
import RequireAuth from './features/auth/RequireAuth'
import { ROLES } from './config/roles'
import useTitle from './hooks/useTitle';
//import { useMetaMask } from "metamask-react";
import StoreTripsList from './features/store/StoreTripsList'
import Signup from './features/auth/Signup';
import ShareTicket from './features/store/ShareTicket';

function App() {
  useTitle('Jumanji Adventures')

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route index element={<Public />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />

        {/* Protected Routes */}
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}>
            <Route element={<Prefetch />}>
              <Route path="dash" element={<DashLayout />}>

                <Route index element={<Welcome />} />
                <Route path="store">
                    <Route index element={<StoreTripsList />} />
                    <Route path="tickets" element={<TicketsList />} />
                    <Route path="tickets/:id" element={<ShareTicket />} />
                </Route>
                <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
                  <Route path="users">
                    <Route index element={<UsersList />} />
                    <Route path=":id" element={<EditUser />} />
                    <Route path="new" element={<NewUserForm />} />
                  </Route>
                </Route>

                <Route path="trips">
                  <Route index element={<TripsList />} />
                  <Route path=":id" element={<EditTrip />} />
                  <Route path="new" element={<NewTrip />} />
                </Route>

              </Route>{/* End Dash */}
            </Route>
          </Route>
        </Route>{/* End Protected Routes */}

      </Route>
    </Routes >
  );
}

export default App;