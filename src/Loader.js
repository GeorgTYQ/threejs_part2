import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { isNumber } from "./util/Utils.js";
import { Panel } from "./gui/Panel.js";
class Loader {
  #renderer = null; //存醋渲染器
  #scene = null; //存储场景
  #camera = null; //存储摄像机
  #app = null; // 存储实例
  #modelPath = null; //存储模型路径
  #evnLight = null; //环境光
  #gltf = null; //gltf模型
  #model = null; //模型
  #loader = new GLTFLoader(); //加载器
  #loaderPanel = null; //加载面板
  constructor(app, modelPath) {
    this.#renderer = app.renderer;
    this.#scene = app.scene;
    this.#camera = app.camera;
    this.#app = app;
    this.#modelPath = modelPath;

    this.#init();
    this.#load();
  }
  #init = () => {
    this.#rendererEncorder();
    this.#sceneAddLight();
  };

  #rendererEncorder = () => {
    this.#renderer.outputEncoding = THREE.sRGBEncoding;
    this.#renderer.gammaOutput = true; //设置伽玛值，用于光线
  };
  #setEvnLightLevel = (level) => {
    if (isNumber(level)) {
      this.#scene.environmentIntensity = level; //设置环境光强度
    }
  };
  #sceneAddLight = () => {
    //添加光源
    this.#evnLight = new THREE.AmbientLight(0x404040, 100); //环境光
    this.#scene.add(this.#evnLight);
    this.#setEvnLightLevel(3);
  };

  #loadGltf = async () => {
    return await this.#loader.loadAsync(this.#modelPath);
  };

  //异步加载模型
  #load = async () => {
    this.#gltf = await this.#loadGltf(); //等待loadGltf的返回

    this.#model = this.#gltf.scene;
    this.#scene.add(this.#model);
    this.#loaderPanel = new Panel(this.#app, this); //创建面板
  };

  get renderer() {
    return this.#renderer;
  }
  get scene() {
    return this.#scene;
  }
  get camera() {
    return this.#camera;
  }
  get app() {
    return this.#app;
  }
  get loader() {
    return this.#loader;
  }
 
  get model() {
    return this.#model;
  }
 //获取面板，因为异步，需要自己创建一个来调取加载完的
  get panel() {
    return this.#loaderPanel;
  }
}

export { Loader };
