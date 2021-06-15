import api from "./helpers/wp_api.js";
import { ajax } from "./helpers/ajax.js";
import { Header } from "./components/Header.js";
import { Main } from "./components/Main.js";
import { Loader } from "./components/Loader.js";
import { Router } from "./components/Router.js";
import { infiniteScroll } from "./helpers/infinite_scroll.js";


export function App() {
  const d = document,
    $root = d.getElementById("root");

  $root.innerHTML= null;
  $root.appendChild(Header());
  $root.appendChild(Main());
  $root.appendChild(Loader());
  Router();
  infiniteScroll();

}
