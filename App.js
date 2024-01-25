import store from "./src/store/store";
import { Provider } from "react-redux";
import AppScreen from "./src/AppScreen";

export default function App() {
  return (
    <Provider store={store}>
      <AppScreen></AppScreen>
    </Provider>
  );
}
