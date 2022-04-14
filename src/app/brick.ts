import {
  BoxGeometry,
  CubeTextureLoader,
  Mesh,
  MeshStandardMaterial,
  TextureLoader,
} from "three";

export class Brick extends Mesh {
  loaded: boolean = false;

  constructor(size: number) {
    super();
    const textureLoader = new TextureLoader();
    textureLoader.setPath("/public/textures");
    const tilesBaseColor = textureLoader.load(
      "/BricksFlemishRed001_COL_VAR2_2K.jpg"
    );
    const tilesNormalMap = textureLoader.load(
      "/BricksFlemishRed001_NRM_2K.png"
    );
    const tilesHeightMap = textureLoader.load(
      "/BricksFlemishRed001_DISP_2K.jpg"
    );
    const tilesRoughnessMap = textureLoader.load(
      "/BricksFlemishRed001_BUMP_2K.jpg"
    );
    const tilesAmbientOcclusionMap = textureLoader.load(
      "/BricksFlemishRed001_AO_2K.jpg"
    );
    const tilesMetallicMap = textureLoader.load(
      "/BricksFlemishRed001_GLOSS_2K.jpg"
    );
    const loader = new CubeTextureLoader();
    this.geometry = new BoxGeometry(size, size, size);
    this.material = new MeshStandardMaterial({
      map: tilesBaseColor,
      normalMap: tilesNormalMap,
      displacementMap: tilesHeightMap,
      roughnessMap: tilesRoughnessMap,
      aoMap: tilesAmbientOcclusionMap,
      metalnessMap: tilesMetallicMap,
    });

    loader.manager.onLoad = () => {
      this.loaded = true;
      console.log("Loaded");
    };
  }
}
