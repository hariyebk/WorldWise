import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Homepage"
import Product from "./pages/Product"
import Pricing from "./pages/Pricing"
import AppLayout from "./pages/AppLayout"
import PageNotFound from "./pages/PageNotFound"
import Login from "./pages/Login"
import Form from "./components/Form/Form"
import CityList from "./components/CityList/CityList"
import ProtectRoute from "./pages/ProtectRoute"
import City from "./components/City/City"
import CountryList from "./components/CountryList/CountryList"
import { Navigate } from "react-router-dom"
import { CityProvider } from "./contexts/CityProvider"
import {FakeAuthContextProvider} from "./contexts/FakeAuthContext"
import Authorize from "./pages/Authorize"
import { Toaster } from "react-hot-toast"
import Signup from "./pages/Signup"

function App() {
  return (
    <div>
      <FakeAuthContextProvider>
        <CityProvider>
        <BrowserRouter>
          <Routes>
            <Route index element = {
              <ProtectRoute>
                  <Home/>
              </ProtectRoute>
              }></Route>
            <Route path="/product" element = {<Product />}></Route>
            <Route path="/pricing" element = {<Pricing />}></Route>
            <Route path="/app" element = {
              <Authorize>
                <AppLayout />
              </Authorize>
            }>
              {/* Nested Routes will be redered on the outlet position in the parent route */}
              <Route index element = {<Navigate replace to = "cities" />} />
              <Route path="cities" element = {<CityList/>} />
              <Route path="cities/:id" element = {<City />} />
              <Route path="countries" element = {<CountryList/>} />
              <Route path="form" element = {<Form />} />
            </Route>
            <Route path="/Login" element = {<Login />}></Route>
            <Route path="/signup" element = {<Signup />}></Route>
            <Route path="*" element = {<PageNotFound />}></Route>
          </Routes>
        </BrowserRouter>
        </CityProvider>
        <Toaster position="top-center" gutter={12} containerStyle={{margin: "8px"}} toastOptions={{
              success: {
                duration: 3000
              },
              error: {
                duration: 5000
              },
              style: {
                fontSize: "16px",
                maxWidth: "500px",
                padding: "16px 24px",
                backgroundColor: "black",
                color: "var(--color-light--2)"
              }
            }} />
      </FakeAuthContextProvider>
    </div>
  )
}
export default App
