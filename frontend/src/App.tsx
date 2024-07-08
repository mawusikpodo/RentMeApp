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
import Booking from "./pages/Booking";
import AppartmentHotel from "./pages/EditAppartment";
import MyAppartments from "./pages/MyAppartments";
import MyBookings from "./pages/MyBookings";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Detail from "./pages/Detail";

function App() {
  const { isLoggedIn } = useAppContext();

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        <Route
          path="/search"
          element={
            <Layout>
              <Search />
            </Layout>
          }
        />
        <Route
          path="/detail/:appartmentId"
          element={
            <Layout>
              <Detail />
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
                  <Booking />
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
                  <AppartmentHotel />
                </Layout>
              }
            />
            <Route
              path="/my-appartments"
              element={
                <Layout>
                  <MyAppartments />
                </Layout>
              }
            />
            <Route
              path="/my-bookings"
              element={
                <Layout>
                  <MyBookings />
                </Layout>
              }
            />
          </>
        )}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
    // <Router>
    //   <Routes>
    //     <Route
    //       path="/"
    //       element={
    //         <Layout>
    //           <Home />
    //         </Layout>
    //       }
    //     />
    //     <Route
    //       path="/search"
    //       element={
    //         <Layout>
    //           <Search />
    //         </Layout>
    //       }
    //     />
    //     <Route
    //       path="/register"
    //       element={
    //         <Layout>
    //           <Register />
    //         </Layout>
    //       }
    //     />
    //     <Route
    //       path="/login"
    //       element={
    //         <Layout>
    //           <Login />
    //         </Layout>
    //       }
    //     />

    //     {isLoggedIn && (
    //       <>
    //         <Route
    //           path="/appartment/:appartmentId/booking"
    //           element={
    //             <Layout>
    //               <Booking />
    //             </Layout>
    //           }
    //         />

    //         <Route
    //           path="/add-appartment"
    //           element={
    //             <Layout>
    //               <AddAppartment />
    //             </Layout>
    //           }
    //         />
    //         <Route
    //           path="/edit-appartment/:appartmentId"
    //           element={
    //             <Layout>
    //               <EditHotel />
    //             </Layout>
    //           }
    //         />
    //         <Route
    //           path="/my-appartments"
    //           element={
    //             <Layout>
    //               <MyHotels />
    //             </Layout>
    //           }
    //         />
    //         <Route
    //           path="/my-bookings"
    //           element={
    //             <Layout>
    //               <MyBookings />
    //             </Layout>
    //           }
    //         />
    //       </>
    //     )}
    //     <Route path="*" element={<Navigate to="/" />} />
    //   </Routes>
    // </Router>
  );
}

export default App;
