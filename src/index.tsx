import { RecoilRoot } from "recoil";
import ReactDOM from "react-dom/client";

import GamePage from "./containers/game-page/GamePage";
import "./index.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <RecoilRoot>
    <GamePage />
  </RecoilRoot>
);
