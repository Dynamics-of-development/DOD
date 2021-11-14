import Index from "pages/Index";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import 'assets/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import PublicLayout from "layouts/PublicLayout";
import PrivateLayout from "layouts/PrivateLayout";
import Productos from "pages/admin/Productos";
import Ventas from "pages/admin/Ventas";
import Usuarios from "pages/admin/Usuarios";
import { Auth0Provider } from "@auth0/auth0-react";
import { UserContext } from "context/userContext";
import { useState } from "react";
import PrivateRoute from "components/PrivateRoute";
import Footer from "components/Foooter";
function App() {
  const [userData, setUserData] = useState({});
  console.log(userData)

  return (
    <Auth0Provider
      domain="dynamics-of-development.us.auth0.com"
      clientId="x3v9kwN7gfxvTKdDtKB2901L14Y9SVWe"
      redirectUri="https://frontend-dod.herokuapp.com/admin/productos"
      audience='api-dod-auth'
    >
      <div className="App">
        <UserContext.Provider value={{ userData, setUserData }}>
          <Router>
            <Switch>
              <Route path={['/admin/productos', '/admin/ventas', '/admin/usuarios']}>
                <PrivateLayout>
                  <Switch>
                    <Route path='/admin/usuarios'>
                      <PrivateRoute roleList={['Admin']}>
                        <Usuarios />
                      </PrivateRoute>
                    </Route>
                    <Route path='/admin/ventas'>
                      <PrivateRoute roleList={['Admin', 'Vendedor']}>
                        <Ventas />
                      </PrivateRoute>
                    </Route>
                    <Route path='/admin/productos'>
                      <PrivateRoute roleList={['Admin', 'Vendedor']}>
                        <Productos />
                      </PrivateRoute>
                    </Route>
                  </Switch>
                </PrivateLayout>
              </Route>
              <Route path={['/']}>
                <PublicLayout>
                  <Switch>
                    <Route path='/'>
                      <Index />
                    </Route>
                  </Switch>
                </PublicLayout>
              </Route>
            </Switch>
          </Router>
          <Footer />
        </UserContext.Provider>
      </div>
    </Auth0Provider>
  );
}
export default App;