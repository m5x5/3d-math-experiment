import {
  Camera,
  CircleGeometry,
  Mesh,
  MeshBasicMaterial,
  Raycaster,
  Renderer,
  Vector2,
} from "three";

export class Cursor extends Mesh {
  public renderer: Renderer;
  public camera: Camera;
  public shadow: Mesh;

  constructor(renderer: Renderer, camera: Camera) {
    super();

    this.renderer = renderer;
    this.camera = camera;

    this.geometry = new CircleGeometry(10, 20);
    this.material = new MeshBasicMaterial({
      color: 0xdddddd,
      opacity: 0.6,
      transparent: true,
    });
    this.shadow = new Mesh();
    this.shadow.geometry = new CircleGeometry(10, 20);
    this.shadow.material = new MeshBasicMaterial({
      color: 0xeeeeee,
      opacity: 0.6,
      transparent: true,
    });
  }
  move(event: MouseEvent) {
    const ray = new Raycaster();
    const mouse = new Vector2();

    mouse.x = (event.clientX / this.renderer.domElement.clientWidth) * 2 - 1;
    mouse.y = -(event.clientY / this.renderer.domElement.clientHeight) * 2 + 1;

    ray.setFromCamera(mouse, this.camera);
    const lol = ray.ray.at(200, this.position);
    this.position.set(lol.x, lol.y, lol.z);

    const lol2 = ray.ray.at(100, this.position);
    this.shadow.position.set(lol2.x, lol2.y, 180);
  }
}
