import "./style.scss";
import { App } from "./App.js";
import { Loader } from "./Loader.js";
import { Panel } from "./gui/Panel.js";
//3D场景入口调用
const app = new App();

//GTLF Loader
const modelPath = "src/gltf/medieval_fantasy_book/scene.gltf";
const loader = new Loader(app, modelPath);

//GUI Panel
