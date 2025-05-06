import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
class App {
  static #instance = null;
  #roomDom = null;
  #scene = null;
  #camera = null;
  #renderer = null;
  #backgroundColor = null;
  #resizeHandler = null;
  #control = null;
  //判断实例,只有一个APP
  #isSingleInstance = () => {
    if (App.#instance) return false;
    else {
      App.#instance = this;
      return true;
    }
  };
  constructor() {
    if (!this.#isSingleInstance()) {
      return App.#instance;
    }
    this.#init();
  }
  #init = () => {
    //创建，设置关键信息
    this.#create();
    this.#setting();
    this.#update();
    this.#animate();
  };

  #create = () => {
    this.#roomDom = this.#createRootDom(); //创建节点
    this.#renderer = this.#createRenderer(); //创建渲染
    this.#camera = this.#createCamera(); // 创建镜头
    this.#scene = this.#createScene(); //创建场景
    this.#control = this.#createCameraControls(); //创建镜头控制
  };

  #createRootDom = () => {
    return document.querySelector("#app");
  };

  #createRenderer = () => {
    this.#renderer = new THREE.WebGLRenderer({ antialias: true });
    return this.#renderer;
  };

  #createCamera = () => {
    this.#camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    return this.#camera;
  };
  //创建摄像头控制
  #createCameraControls = () => {
    return new OrbitControls(this.#camera, this.#renderer.domElement);
  };
  #createScene = () => {
    this.#scene = new THREE.Scene();
    return this.#scene;
  };

  //设置场景
  #setting = () => {
    this.#rendererAspectRatio();
    this.#rendererSetSize();
    this.#rendererDomAppend();
    this.#cameraSetPosition();
    this.#rendererDomAppend();
    this.#sceneSetBackground(0xd0eaf5);
    this.#addKeyControl();
  };

  #rendererAspectRatio = () => {
    this.#renderer.setPixelRatio(window.innerWidth / window.innerHeight);
  };
  #rendererSetSize = () => {
    this.#renderer.setSize(window.innerWidth, window.innerHeight);
  };
  #rendererDomAppend = () => {
    this.#roomDom?.appendChild(this.#renderer.domElement);
  };
  #cameraSetPosition = () => {
    this.#camera.position.z = 100;
    this.#camera.position.y = 25;
  };
  #sceneSetBackground = (color) => {
    this.#scene.background = color
      ? new THREE.Color(color) //如果color存在/可用
      : new THREE.Color(0x4287f5); //否则就default 场景色

    this.background = this.#scene.background.getStyle();
  };

  #addKeyControl = () => {
    this.#control.listenToKeyEvents(window);
    this.#control.keys = {
      LEFT: "KeyA",
      UP: "KeyS",
      RIGHT: "KeyD",
      BOTTOM: "KeyW",
    };
  };

  #update = () => {
    this.#resizeHandler = () => {
      this.#camera.aspect = window.innerWidth / window.innerHeight;
      this.#cameraResizeUpdate();
      this.#rendererResizeUpdate();
    };

    window.addEventListener("resize", this.#resizeHandler);
  };

  #rendererResizeUpdate = () => {
    this.#renderer.setSize(window.innerWidth, window.innerHeight);
  };

  #cameraResizeUpdate = () => {
    this.#camera.aspect = this.#renderer.setPixelRatio(
      window.innerWidth / window.innerHeight
    );
    this.#camera.updateProjectionMatrix();
  };

  #render = () => {
    this.#renderer.render(this.#scene, this.#camera);
  };
  #animate = () => {
    requestAnimationFrame(this.#animate);

    this.#render();
  };

  get create() {
    return this.#create;
  }
  get setting() {
    return this.#setting;
  }
  get update() {
    return this.#update;
  }
  get renderer() {
    return this.#renderer;
  }
  get scene() {
    return this.#scene;
  }
  get camera() {
    return this.#camera;
  }

  get animate() {
    return this.#animate;
  }
  get control() {
    return this.#control;
  }

  get setting() {
    return this.#setting;
  }
  get backgroundColor() {
    return this.#backgroundColor;
  }
  get sceneSetBackground() {
    return this.#sceneSetBackground;
  }
  set sceneSetBackground(value) {
    this.#sceneSetBackground(value);
  }
}

export { App };
