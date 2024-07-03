import "./App.css";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import Layout from "./layouts/Layout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useAppContext } from "./contexts/AppContext";
import AddAppartment from "./pages/AddAppartment";

function App() {
  const { isLoggedIn } = useAppContext();

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <p>Home Page</p>
            </Layout>
          }
        />
        <Route
          path="/search"
          element={
            <Layout>
              <p>Search Page</p>
            </Layout>
          }
        />
        <Route
          path="/register"
          element={
            <Layout>
              <Register />
            </Layout>
          }
        />
        <Route
          path="/login"
          element={
            <Layout>
              <Login />
            </Layout>
          }
        />

        {isLoggedIn && (
          <>
            <Route
              path="/appartment/:appartmentId/booking"
              element={
                <Layout>
                  {/* <Booking /> */}
                  <div>booking</div>
                </Layout>
              }
            />

            <Route
              path="/add-appartment"
              element={
                <Layout>
                  <AddAppartment />
                </Layout>
              }
            />
            <Route
              path="/edit-appartment/:appartmentId"
              element={
                <Layout>
                  {/* <EditHotel /> */}
                  <div>edit hotel</div>
                </Layout>
              }
            />
            <Route
              path="/my-appartments"
              element={
                <Layout>
                  {/* <MyHotels /> */}
                  <div>my hotels</div>
                </Layout>
              }
            />
            <Route
              path="/my-bookings"
              element={
                <Layout>
                  {/* <MyBookings /> */}
                  <div>my bookings</div>
                </Layout>
              }
            />
          </>
        )}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
