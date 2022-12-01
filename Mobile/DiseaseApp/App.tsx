import React from "react";
import { Provider as PaperProvider } from "react-native-paper";
import { LoginScreen } from "./app/screens/login/login.screen";
import { RegisterScreen } from "./app/screens/register/register.screen";
import { HomeScreen }  from "./app/screens/home/home.screen";
import { theme } from "./App.style";
import AppNavigator from "./app/app.navigatior";


const App = () => {

  return(
    <PaperProvider theme={theme}>
      <AppNavigator />
      {/* <LoginScreen/ > */}
      {/* <RegisterScreen/ > */}
      {/* <HomeScreen/ > */}
    </PaperProvider>
  );
};

export default App;