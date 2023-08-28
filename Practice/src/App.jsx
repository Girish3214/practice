import "./App.css";
import UseReducer from "./components/UseReducer";

import Explorer from "./components/Explorer";
import Select from "./components/Select";

function App() {
  return (
    <div style={{ margin: "1rem" }}>
      {/* <Explorer /> */}
      <Select />
      <Select multiSelect={true} />
    </div>
  );
}

export default App;
