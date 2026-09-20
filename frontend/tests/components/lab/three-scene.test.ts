import { describe, expect, it, vi, afterEach } from "vitest";
import * as THREE from "three";
import {
  addStudioLighting,
  clearObject,
  detectSceneQuality,
  disposeMaterial,
  disposeScene,
  scenePixelRatio,
} from "@/components/lab/three-scene";

function setHardware(cores: number, dpr?: number) {
  Object.defineProperty(navigator, "hardwareConcurrency", { configurable: true, value: cores });
  if (dpr !== undefined) {
    Object.defineProperty(window, "devicePixelRatio", { configurable: true, value: dpr });
  }
}

afterEach(() => {
  setHardware(4, 1);
  vi.restoreAllMocks();
});

describe("detectSceneQuality", () => {
  it("tiers by core count on desktop", () => {
    setHardware(2);
    expect(detectSceneQuality()).toBe("low");
    setHardware(4);
    expect(detectSceneQuality()).toBe("medium");
    setHardware(16);
    expect(detectSceneQuality()).toBe("high");
  });
});

describe("scenePixelRatio", () => {
  it("keeps low tiers cheap and caps retina at 2", () => {
    setHardware(4, 3);
    expect(scenePixelRatio("low")).toBe(1.25);
    expect(scenePixelRatio("medium")).toBe(1.75);
    expect(scenePixelRatio("high")).toBe(2);
  });

  it("never upscales past the device ratio", () => {
    setHardware(4, 1);
    expect(scenePixelRatio("high")).toBe(1);
  });
});

describe("addStudioLighting", () => {
  it("adds a four-light rig for soft gradient shading", () => {
    const scene = new THREE.Scene();
    const rig = addStudioLighting(scene, { quality: "high" });

    expect(scene.children).toHaveLength(4);
    expect(rig.hemisphere.isHemisphereLight).toBe(true);
    expect(rig.key.isDirectionalLight).toBe(true);
    expect(rig.rim.isDirectionalLight).toBe(true);
  });

  it("widens the key shadow camera past the three.js ±5 default", () => {
    const scene = new THREE.Scene();
    const rig = addStudioLighting(scene, { quality: "high" });
    const cam = rig.key.shadow.camera;

    expect(rig.key.castShadow).toBe(true);
    expect(cam.right).toBeGreaterThan(5);
    expect(cam.top).toBeGreaterThan(5);
    expect(rig.key.shadow.mapSize.width).toBe(2048);
  });

  it("uses a cheaper shadow map and no shadow casting when disabled", () => {
    const scene = new THREE.Scene();
    const rig = addStudioLighting(scene, { quality: "low", shadows: false });

    expect(rig.key.castShadow).toBe(false);
  });

  it("tints lights with the subject accent", () => {
    const scene = new THREE.Scene();
    const rig = addStudioLighting(scene, { subject: "biology" });

    // Biology accent key is #10b981.
    expect(rig.key.color.getHexString()).toBe("10b981");
  });

  it("leaves lights neutral when no subject is given", () => {
    const scene = new THREE.Scene();
    const rig = addStudioLighting(scene, {});

    expect(rig.key.color.getHexString()).toBe("ffffff");
  });
});

describe("disposal", () => {
  it("disposes the textures a material owns, not just the material", () => {
    const texture = new THREE.Texture();
    const textureDispose = vi.spyOn(texture, "dispose");
    const material = new THREE.MeshStandardMaterial({ map: texture });
    const materialDispose = vi.spyOn(material, "dispose");

    disposeMaterial(material);

    expect(textureDispose).toHaveBeenCalledTimes(1);
    expect(materialDispose).toHaveBeenCalledTimes(1);
  });

  it("disposes textures for materials attached to a cleared object", () => {
    const texture = new THREE.Texture();
    const textureDispose = vi.spyOn(texture, "dispose");
    const mesh = new THREE.Mesh(
      new THREE.BoxGeometry(),
      new THREE.MeshStandardMaterial({ map: texture }),
    );

    clearObject(mesh);

    expect(textureDispose).toHaveBeenCalledTimes(1);
  });

  it("empties a scene that also holds lights, grids and helpers", () => {
    const scene = new THREE.Scene();
    addStudioLighting(scene, {});
    scene.add(new THREE.GridHelper(20, 40));
    scene.add(new THREE.AxesHelper(5));
    scene.add(new THREE.Mesh(new THREE.SphereGeometry(), new THREE.MeshBasicMaterial()));
    expect(scene.children.length).toBeGreaterThan(4);

    disposeScene(scene);

    expect(scene.children).toHaveLength(0);
  });
});
