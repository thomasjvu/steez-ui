"use client";

import React from "react";
import * as THREE from "three";

import styles from "./SignalTrailBackdrop.module.css";

export interface SignalTrailBackdropProps {
  className?: string;
  color?: string;
  linesCount?: number;
  segments?: number;
  lineSpeed?: number;
  signalDensity?: number;
  trailLength?: number;
  shapeSize?: number;
  amplitude?: number;
  tiltX?: number;
  tiltY?: number;
  baseOpacity?: number;
  shapeOpacity?: number;
}

const VERTEX_SHADER = `
  uniform float uTime;
  uniform float uSize;
  uniform float uAmplitude;
  uniform float uRotZ;
  uniform float uScaleX;

  varying vec2 vUv;
  varying float vZ;
  varying float vLineIndex;
  varying float vHeightNorm;

  vec2 rotate2d(vec2 value, float angle) {
    float s = sin(angle);
    float c = cos(angle);
    return mat2(c, -s, s, c) * value;
  }

  float ellipseHeight(vec2 point, vec2 radii, float weight) {
    vec2 normalized = point / radii;
    float q = dot(normalized, normalized);
    if (q >= 1.0) return 0.0;
    return sqrt(1.0 - q) * weight;
  }

  float getFigureHeight(vec2 point, float size) {
    float head = ellipseHeight(point - vec2(0.0, size * 0.72), vec2(size * 0.16, size * 0.18), size * 0.34);
    float shoulders = ellipseHeight(point - vec2(0.0, size * 0.34), vec2(size * 0.46, size * 0.14), size * 0.22);
    float torso = ellipseHeight(point - vec2(0.0, size * 0.04), vec2(size * 0.28, size * 0.50), size * 0.64);
    float hips = ellipseHeight(point - vec2(0.0, -size * 0.44), vec2(size * 0.24, size * 0.24), size * 0.36);
    float legLeft = ellipseHeight(point - vec2(-size * 0.09, -size * 0.94), vec2(size * 0.11, size * 0.40), size * 0.22);
    float legRight = ellipseHeight(point - vec2(size * 0.09, -size * 0.94), vec2(size * 0.11, size * 0.40), size * 0.22);
    return max(max(max(head, shoulders), max(torso, hips)), max(legLeft, legRight));
  }

  void main() {
    vUv = uv;
    vLineIndex = uv.y;

    vec3 positionNext = position;
    vec2 point = positionNext.xy;
    point.x /= uScaleX;
    point = rotate2d(point, -uRotZ);

    float height = getFigureHeight(point, uSize);
    float transition = smoothstep(0.0, 0.08, abs(height) + 0.01);
    positionNext.z += height * transition * uAmplitude;

    vZ = positionNext.z;
    vHeightNorm = smoothstep(0.0, uSize * 0.55 * uAmplitude, abs(height));

    gl_Position = projectionMatrix * modelViewMatrix * vec4(positionNext, 1.0);
  }
`;

const FRAGMENT_SHADER = `
  uniform float uTime;
  uniform float uTrailLength;
  uniform float uDensity;
  uniform float uBaseOpacity;
  uniform float uShapeOpacity;
  uniform vec3 uColor;

  varying vec2 vUv;
  varying float vZ;
  varying float vLineIndex;
  varying float vHeightNorm;

  float randomValue(vec2 value) {
    return fract(sin(dot(value.xy, vec2(12.9898, 78.233))) * 43758.5453123);
  }

  void main() {
    float seed = floor(vLineIndex * 3000.0);
    float speed = 0.55 + randomValue(vec2(seed, 11.0)) * 0.95;
    float offset = randomValue(vec2(seed, 21.0)) * 24.0;
    float visibility = step(1.0 - uDensity, randomValue(vec2(seed, 31.0)));

    float baseStrength = mix(uBaseOpacity, uShapeOpacity, vHeightNorm);
    vec3 finalColor = uColor * baseStrength;

    if (visibility > 0.5) {
      float phase = fract(vUv.x * 4.75 - uTime * speed + offset);
      float trailStart = 1.0 - max(uTrailLength, 0.002);
      float trail = smoothstep(trailStart, 1.0, phase);
      float brightness = pow(trail, 12.0) * 2.8;

      if (phase < trailStart) {
        brightness = 0.0;
      }

      finalColor += uColor * brightness;
    }

    float contour = smoothstep(0.12, 1.0, abs(vZ)) * 0.18;
    finalColor += uColor * contour;

    float alpha = clamp(baseStrength * 0.75 + contour, 0.0, 1.0);
    gl_FragColor = vec4(finalColor, alpha);
  }
`;

const DEFAULT_LINES_COUNT = 110;
const DEFAULT_SEGMENTS = 800;
const MIN_LINES_COUNT = 2;
const MIN_SEGMENTS = 1;
const MAX_LINES_COUNT = 200;
const MAX_SEGMENTS = 1200;

function clampGeometryCount(
  value: number,
  fallback: number,
  minimum: number,
  maximum: number,
) {
  if (!Number.isFinite(value)) {
    return fallback;
  }

  return Math.min(maximum, Math.max(minimum, Math.floor(value)));
}

function createGeometry(linesCount: number, segments: number): THREE.BufferGeometry {
  const width = 32;
  const height = 24;
  const geometry = new THREE.BufferGeometry();
  const vertexCount = linesCount * (segments + 1);
  const positions = new Float32Array(vertexCount * 3);
  const uvs = new Float32Array(vertexCount * 2);
  const indices = new Uint32Array(linesCount * segments * 2);
  let vertexOffset = 0;
  let uvOffset = 0;
  let indexOffset = 0;

  for (let lineIndex = 0; lineIndex < linesCount; lineIndex += 1) {
    const y = (lineIndex / (linesCount - 1)) * height - height / 2;
    for (let segmentIndex = 0; segmentIndex <= segments; segmentIndex += 1) {
      const x = (segmentIndex / segments) * width - width / 2;
      positions[vertexOffset++] = x;
      positions[vertexOffset++] = y;
      positions[vertexOffset++] = 0;
      uvs[uvOffset++] = segmentIndex / segments;
      uvs[uvOffset++] = lineIndex / (linesCount - 1);

      if (segmentIndex < segments) {
        const index = lineIndex * (segments + 1) + segmentIndex;
        indices[indexOffset++] = index;
        indices[indexOffset++] = index + 1;
      }
    }
  }

  geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(positions, 3),
  );
  geometry.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
  geometry.setIndex(new THREE.Uint32BufferAttribute(indices, 1));
  return geometry;
}

export function SignalTrailBackdrop({
  className = "",
  color = "#7ae4ff",
  linesCount = DEFAULT_LINES_COUNT,
  segments = DEFAULT_SEGMENTS,
  lineSpeed = 0.22,
  signalDensity = 0.24,
  trailLength = 0.16,
  shapeSize = 4.1,
  amplitude = 1.05,
  tiltX = -0.2,
  tiltY = -0.28,
  baseOpacity = 0.12,
  shapeOpacity = 0.2,
}: SignalTrailBackdropProps) {
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const materialRef = React.useRef<THREE.ShaderMaterial | null>(null);
  const meshRef = React.useRef<THREE.LineSegments | null>(null);
  const visualOptionsRef = React.useRef({
    color,
    lineSpeed,
    signalDensity,
    trailLength,
    shapeSize,
    amplitude,
    tiltX,
    tiltY,
    baseOpacity,
    shapeOpacity,
  });
  visualOptionsRef.current = {
    color,
    lineSpeed,
    signalDensity,
    trailLength,
    shapeSize,
    amplitude,
    tiltX,
    tiltY,
    baseOpacity,
    shapeOpacity,
  };

  const safeLinesCount = clampGeometryCount(
    linesCount,
    DEFAULT_LINES_COUNT,
    MIN_LINES_COUNT,
    MAX_LINES_COUNT,
  );
  const safeSegments = clampGeometryCount(
    segments,
    DEFAULT_SEGMENTS,
    MIN_SEGMENTS,
    MAX_SEGMENTS,
  );

  React.useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return undefined;
    }

    delete container.dataset.webglUnavailable;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.set(-10, 0, 15);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch {
      container.dataset.webglUnavailable = "true";
      return undefined;
    }

    const options = visualOptionsRef.current;
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.domElement.className = styles.canvas;
    container.appendChild(renderer.domElement);

    const material = new THREE.ShaderMaterial({
      vertexShader: VERTEX_SHADER,
      fragmentShader: FRAGMENT_SHADER,
      uniforms: {
        uTime: { value: 0 },
        uColor: { value: new THREE.Color(options.color) },
        uSize: { value: options.shapeSize },
        uAmplitude: { value: options.amplitude },
        uRotZ: { value: 0 },
        uScaleX: { value: 1.05 },
        uTrailLength: { value: options.trailLength },
        uDensity: { value: options.signalDensity },
        uBaseOpacity: { value: options.baseOpacity },
        uShapeOpacity: { value: options.shapeOpacity },
      },
      transparent: true,
      depthTest: false,
      blending: THREE.AdditiveBlending,
    });

    const mesh = new THREE.LineSegments(
      createGeometry(safeLinesCount, safeSegments),
      material,
    );
    mesh.rotation.x = options.tiltX;
    mesh.rotation.y = options.tiltY;
    materialRef.current = material;
    meshRef.current = mesh;
    scene.add(mesh);

    const clock = new THREE.Clock();
    let animationFrame = 0;
    let isDocumentVisible = typeof document !== "undefined" ? !document.hidden : true;
    let isInViewport = true;

    const reducedMotionQuery =
      typeof window !== "undefined" && typeof window.matchMedia === "function"
        ? window.matchMedia("(prefers-reduced-motion: reduce)")
        : null;
    let prefersReducedMotion = reducedMotionQuery?.matches ?? false;

    const resize = () => {
      const width = Math.max(container.clientWidth, 1);
      const height = Math.max(container.clientHeight, 1);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    };

    resize();
    const resizeObserver =
      typeof ResizeObserver === "undefined" ? null : new ResizeObserver(resize);
    resizeObserver?.observe(container);

    const shouldAnimate = () =>
      !prefersReducedMotion && isDocumentVisible && isInViewport;

    const renderFrame = () => {
      material.uniforms.uTime.value +=
        clock.getDelta() *
        Math.max(
          Number.isFinite(visualOptionsRef.current.lineSpeed)
            ? visualOptionsRef.current.lineSpeed
            : 0.01,
          0.01,
        );
      renderer.render(scene, camera);
    };

    const stopLoop = () => {
      if (animationFrame !== 0) {
        window.cancelAnimationFrame(animationFrame);
        animationFrame = 0;
      }
    };

    const animate = () => {
      animationFrame = 0;
      if (!shouldAnimate()) {
        return;
      }
      renderFrame();
      animationFrame = window.requestAnimationFrame(animate);
    };

    const startLoop = () => {
      if (animationFrame !== 0 || !shouldAnimate()) {
        return;
      }
      clock.getDelta();
      animationFrame = window.requestAnimationFrame(animate);
    };

    // Static first frame (also the only frame under reduced-motion).
    renderFrame();
    startLoop();

    const onVisibilityChange = () => {
      isDocumentVisible = !document.hidden;
      if (isDocumentVisible) {
        startLoop();
      } else {
        stopLoop();
      }
    };

    const onReducedMotionChange = (event: MediaQueryListEvent) => {
      prefersReducedMotion = event.matches;
      if (prefersReducedMotion) {
        stopLoop();
        renderFrame();
      } else {
        startLoop();
      }
    };

    document.addEventListener("visibilitychange", onVisibilityChange);
    reducedMotionQuery?.addEventListener("change", onReducedMotionChange);

    let intersectionObserver: IntersectionObserver | null = null;
    if (typeof IntersectionObserver !== "undefined") {
      intersectionObserver = new IntersectionObserver(
        ([entry]) => {
          isInViewport = entry?.isIntersecting ?? true;
          if (isInViewport) {
            startLoop();
          } else {
            stopLoop();
          }
        },
        { threshold: 0 },
      );
      intersectionObserver.observe(container);
    }

    return () => {
      stopLoop();
      document.removeEventListener("visibilitychange", onVisibilityChange);
      reducedMotionQuery?.removeEventListener("change", onReducedMotionChange);
      intersectionObserver?.disconnect();
      resizeObserver?.disconnect();
      mesh.geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (materialRef.current === material) {
        materialRef.current = null;
      }
      if (meshRef.current === mesh) {
        meshRef.current = null;
      }
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [safeLinesCount, safeSegments]);

  React.useEffect(() => {
    const material = materialRef.current;
    const mesh = meshRef.current;
    if (!material || !mesh) {
      return;
    }

    material.uniforms.uColor.value.set(color);
    material.uniforms.uSize.value = shapeSize;
    material.uniforms.uAmplitude.value = amplitude;
    material.uniforms.uTrailLength.value = trailLength;
    material.uniforms.uDensity.value = signalDensity;
    material.uniforms.uBaseOpacity.value = baseOpacity;
    material.uniforms.uShapeOpacity.value = shapeOpacity;
    mesh.rotation.x = tiltX;
    mesh.rotation.y = tiltY;
  }, [
    amplitude,
    baseOpacity,
    color,
    shapeOpacity,
    shapeSize,
    signalDensity,
    tiltX,
    tiltY,
    trailLength,
  ]);

  return (
    <div
      ref={containerRef}
      className={`${styles.root} ${className}`.trim()}
      aria-hidden="true"
    />
  );
}

export default SignalTrailBackdrop;
