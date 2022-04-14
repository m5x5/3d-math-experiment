import {
  AmbientLight,
  Color,
  Group,
  PerspectiveCamera,
  Raycaster,
  Scene,
  Vector2,
  Vector3,
  WebGLRenderer,
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Cursor } from "../Cursor";
import { Cube } from "./Cube";
import { LandingPage } from "./LandingPage";

const CONTROLS_ENABLED = false;
const MANUAL_CONTROLS = false;

export class App {
  private readonly fov = 45;
  private readonly aspect = innerWidth / innerHeight;
  private readonly near = 0.1;
  private far = 1000.0;

  private readonly scene = new Scene();
  private readonly camera = new PerspectiveCamera(
    this.fov,
    this.aspect,
    this.near,
    this.far
  );
  private readonly renderer = new WebGLRenderer({
    antialias: true,
    canvas: document.getElementById("main-canvas") as HTMLCanvasElement,
  });

  private readonly controls;
  private readonly ambientLight = new AmbientLight(0xffffff, 0.5);

  private cube: Cube;
  private landingPage: LandingPage;
  private root: Group;
  private cursor: Cursor;

  constructor() {
    this.root = new Group();
    this.cube = new Cube();
    this.root.add(this.cube);
    this.scene.add(this.root);

    this.cursor = new Cursor(this.renderer, this.camera);
    this.scene.add(this.cursor);
    this.scene.add(this.cursor.shadow);

    this.landingPage = new LandingPage();
    this.root.add(this.landingPage);
    this.landingPage.position.set(0, 0, 100);

    this.camera.position.set(0, 0, 400);
    this.camera.lookAt(new Vector3(0, 0, 0));

    this.renderer.setSize(innerWidth, innerHeight);
    this.renderer.setClearColor(new Color(0xffffff));

    if (CONTROLS_ENABLED) {
      this.controls = new OrbitControls(this.camera, this.renderer.domElement);
      this.controls.target.set(100, 0, 0);
      this.controls.update();
      this.controls.maxDistance = 500;
      this.controls.minDistance = 100;
      this.controls.maxAzimuthAngle = Math.PI / 2;
      this.controls.enableRotate = true;
      this.controls.enablePan = false;
      this.controls.enableZoom = false;
    }

    this.scene.add(this.ambientLight);

    document.addEventListener("mousemove", this.checkIntersection.bind(this));
    document.addEventListener("mousemove", this.cursor.move.bind(this.cursor));

    this.render();
  }

  private adjustCanvasSize() {
    this.renderer.setSize(innerWidth, innerHeight);
    this.camera.aspect = innerWidth / innerHeight;
    this.camera.updateProjectionMatrix();
  }

  private render() {
    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(() => this.render());

    if (!MANUAL_CONTROLS) {
      this.root.rotateX(-0.005);
    }
    this.adjustCanvasSize();
  }

  private checkIntersection(event: MouseEvent) {
    const ray = new Raycaster();
    const mouse = new Vector2();

    mouse.x = (event.clientX / this.renderer.domElement.clientWidth) * 2 - 1;
    mouse.y = -(event.clientY / this.renderer.domElement.clientHeight) * 2 + 1;

    ray.setFromCamera(mouse, this.camera);
    // const intersects = ray.intersectObject(this.title);
    // intersects.forEach(() => {
    //   this.title.material = new MeshStandardMaterial({ color: 0x00ff00 });
    // });

    // if (intersects.length === 0) {
    //   this.title.material = new MeshStandardMaterial({ color: 0xffffff });
    // }
  }
}
