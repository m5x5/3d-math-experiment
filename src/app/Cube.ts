import { BoxGeometry, Group, Mesh, MeshBasicMaterial } from "three";
import { Sphere } from "./sphere";

export class Cube extends Mesh {
  constructor() {
    super();

    const geometry = new BoxGeometry(200, 200, 200);
    const orange = new MeshBasicMaterial({
      color: 0xfeb139,
    });
    const white = new MeshBasicMaterial({
      color: 0xffc149,
      alphaTest: 0.5,
    });
    this.geometry = geometry;
    this.material = [orange, orange, white, white, orange, orange];
    const group = new Group();
    const sphere = new Sphere(50);
    group.add(sphere);
    group.position.set(0, 0, 0);
  }

  update() {
    this.rotation.x += 0.005;
  }
}
