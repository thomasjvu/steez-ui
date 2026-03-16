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

function createGeometry(linesCount: number, segments: number): THREE.BufferGeometry {
  const width = 32;
  const height = 24;
  const geometry = new THREE.BufferGeometry();
  const positions: number[] = [];
  const uvs: number[] = [];
  const indices: number[] = [];

  for (let lineIndex = 0; lineIndex < linesCount; lineIndex += 1) {
    const y = (lineIndex / (linesCount - 1)) * height - height / 2;
    for (let segmentIndex = 0; segmentIndex <= segments; segmentIndex += 1) {
      const x = (segmentIndex / segments) * width - width / 2;
      positions.push(x, y, 0);
      uvs.push(
        segmentIndex / segments,
        lineIndex / Math.max(linesCount - 1, 1),
      );

      if (segmentIndex < segments) {
        const index = lineIndex * (segments + 1) + segmentIndex;
        indices.push(index, index + 1);
      }
    }
  }

  geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(positions, 3),
  );
  geometry.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
  geometry.setIndex(indices);
  return geometry;
}

export function SignalTrailBackdrop({
  className = "",
  color = "#7ae4ff",
  linesCount = 110,
  segments = 800,
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

  React.useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return undefined;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.set(-10, 0, 15);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.domElement.className = styles.canvas;
    container.appendChild(renderer.domElement);

    const material = new THREE.ShaderMaterial({
      vertexShader: VERTEX_SHADER,
      fragmentShader: FRAGMENT_SHADER,
      uniforms: {
        uTime: { value: 0 },
        uColor: { value: new THREE.Color(color) },
        uSize: { value: shapeSize },
        uAmplitude: { value: amplitude },
        uRotZ: { value: 0 },
        uScaleX: { value: 1.05 },
        uTrailLength: { value: trailLength },
        uDensity: { value: signalDensity },
        uBaseOpacity: { value: baseOpacity },
        uShapeOpacity: { value: shapeOpacity },
      },
      transparent: true,
      depthTest: false,
      blending: THREE.AdditiveBlending,
    });

    const mesh = new THREE.LineSegments(
      createGeometry(linesCount, segments),
      material,
    );
    mesh.rotation.x = tiltX;
    mesh.rotation.y = tiltY;
    scene.add(mesh);

    const clock = new THREE.Clock();
    let animationFrame = 0;

    const resize = () => {
      const width = Math.max(container.clientWidth, 1);
      const height = Math.max(container.clientHeight, 1);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    };

    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);

    const animate = () => {
      animationFrame = window.requestAnimationFrame(animate);
      material.uniforms.uTime.value +=
        clock.getDelta() * Math.max(lineSpeed, 0.01);
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
      mesh.geometry.dispose();
      material.dispose();
      renderer.dispose();
      container.removeChild(renderer.domElement);
    };
  }, [
    amplitude,
    baseOpacity,
    color,
    lineSpeed,
    linesCount,
    segments,
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
