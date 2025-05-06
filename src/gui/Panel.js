import { Camera } from "three";
import { App } from "../App.js";
import { GUI } from "three/examples/jsm/libs/lil-gui.module.min.js";

class Panel {
  #loader = null;
  #scene = null;
  #camera = null;
  #renderer = null;
  #control = null; //调用模型的摄像头control
  #model = null;
  #app = null;
  #gui = new GUI();

  #axesHelper = null;
  #gridHelper = null;
  #cameraHelper = null;
  #box3Helper = null;
  constructor(app = new App(), loader) {
    //这边使用new 是应为他是实例，所有都是指向同一个
    this.#loader = loader;
    this.#control = app.control; //调用模型的摄像头control
    this.#model = loader.model;
    this.#app = app;
    this.#scene = app.scene;
    this.#camera = app.camera;
    this.#renderer = app.renderer;

    this.#panelAdd();
  }
  //添加button functions
  #buttonFunction = {
    autoRotate: () => {
      this.#control.autoRotate = !this.#control.autoRotate;
      this.#updateAutoRotateState();
    },
    resetAll: () => {
      this.#control.reset();
      this.#app.setting();
      this.#updateAutoRotateState();
    },
  };
  #updateAutoRotateState = () => {
    this.controlAutoRotateHandler.name(
      "Auto Rotate: " + this.#control.autoRotate
    );
  };
  #panelAdd = () => {
    const cameraFolder = this.#gui.addFolder("Camera");
    this.#cameraControl(cameraFolder);

    const controlFolder = this.#gui.addFolder("Auto Control ");
    this.controlAutoRotateHandler = controlFolder
      .add(this.#buttonFunction, "autoRotate")
      .listen();
    this.#updateAutoRotateState();
    controlFolder
      .add(this.#control, "autoRotateSpeed", -5, 5, 0.1)
      .name("Auto Rotate Speed")
      .listen();
    //初始化
    const controlResetPosition = controlFolder
      .add(this.#buttonFunction, "resetAll")
      .name("Reset All");

    controlFolder
      .addColor(this.#app, "background")
      .name("Background Color")
      .listen()
      .onChange((e) => {
        this.#app.sceneSetBackground(e);
      });

    controlFolder.open();
  };
  #cameraControl = (folder) => {
    const cameraPositionX = folder
      .add(this.#camera.position, "x")
      .name("Camera Position X")
      .listen();
    const cameraPositionY = folder
      .add(this.#camera.position, "y")
      .name("Camera Position Y")
      .listen();
    const cameraPositionZ = folder
      .add(this.#camera.position, "z")
      .name("Camera Position Z")
      .listen();
  };
}

export { Panel };
