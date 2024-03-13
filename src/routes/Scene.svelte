<script lang='ts'>
  import { T } from '@threlte/core'
  import { OrbitControls } from '@threlte/extras';
  import Element from './Element.svelte';
  import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial.js'
  import { Line2 } from 'three/examples/jsm/lines/Line2.js'
  import { LineGeometry } from 'three/examples/jsm/lines/LineGeometry.js';
  import { DEG2RAD } from 'three/src/math/MathUtils.js';
  import ImagePlane from './ImagePlane.svelte';

  let balls: number[][] = []
  for (let i = 0; i <= 75; i += 5) {
    balls.push([0, 0, i])
  }
  for (let i = 0; i < 40; i += 5) {
    balls.push([i, 0, 20])
  }

  for (let i = 0; i < 25; i += 5) {
    balls.push([20 - i, 30, 50])
  }

  for (let i = 0; i < 30; i += 5) {
    balls.push([0, 30 - i, 50])
  }

  for (let i = 0; i <= 45; i += 5) {
    const y = i / Math.SQRT2
    const z = 20 + i / Math.SQRT2
    balls.push([20, y, z])
  }

  //balls.push([20, 30, 50])

  export function genLineSegment(segs: Float32Array | number[]): LineGeometry {
    const geo = new LineGeometry()
    geo.setPositions(segs)
    return geo
  }

  let r45 = 45 * DEG2RAD
  let r90 = 90 * DEG2RAD
  let r135 = 135 * DEG2RAD

  let axislines: Float32Array[] = [
    new Float32Array([0, 0, 0, 0, 0, 75]),
    new Float32Array([0, 0, 20, 20, 0, 20]),
    new Float32Array([0, 0, 20, 20, 0, 20]),
    new Float32Array([20, 0, 20, 20, 30, 50]),
    new Float32Array([20, 30, 50, 0, 30, 50]),
    new Float32Array([0, 30, 50, 0, 0, 50])
];
</script>

<T.OrthographicCamera makeDefault position={[-10, 10, -20]} zoom={5} >
  <OrbitControls enableZoom enablePan enableRotate />
</T.OrthographicCamera>

<!-- Add Lights -->
<T.DirectionalLight position={[-100, 0, 0]} intensity={0.75} />
<T.DirectionalLight position={[0, 100, 0]} intensity={0.2} />
<T.DirectionalLight position={[0, -100, 0]} intensity={0.2} />
<T.DirectionalLight position={[0, 0, -100]} intensity={0.2} />
<T.DirectionalLight position={[0, 0, 100]} intensity={0.2} />
<T.AmbientLight intensity={0.5} /> />

<!-- Mirror 1 - rotate only about y axis for horizontal bend -->
<T.Group position={[0, 0, 20]} visible={true}>
  <T.Group rotation={[0, -r45, 0]}>
    <T.Group rotation={[0, 0, 0]}>
      <T.Group rotation={[0, 0, 0]}>
        <Element radius={5} ct={2} />
      </T.Group>
    </T.Group>
  </T.Group>
</T.Group>

<!-- Mirror 2 -->
<T.Group position={[20, 0, 20]} visible={true}>
  <T.Group rotation={[-r45, r45, 0]}>
    <T.Group rotation={[0, r90, 0]}>
        <Element radius={5} ct={2} />
      </T.Group>
    </T.Group>
  </T.Group>


<!-- Mirror 3 -->
<T.Group position={[20, 30, 50]} visible={true}>
    <T.Group rotation={[-r45, 0, 0]}>
      <T.Group rotation={[0, r45, 0]}>
        <Element radius={5} ct={1} />
      </T.Group>
    </T.Group>
  </T.Group>

<!-- Mirror 4 -->
<T.Group position={[0, 30, 50]} visible={true}>
  <T.Group rotation={[0, -r90, 0]}>
    <T.Group rotation={[-r45, 0, 0]}>
        <Element radius={5} ct={1} />
    </T.Group>
  </T.Group>
</T.Group>

<!-- Mirror 5 -->
<T.Group position={[0, 0, 50]} visible={true}>
  <T.Group rotation={[r90, 0, 0]}>
    <T.Group rotation={[r45, 0, 0]}>
        <Element radius={5} ct={1} />
    </T.Group>
  </T.Group>
</T.Group>
<!-- Image Plane -->
<T.Group position={[20, 0, 50]} visible={false}>
  <T.Group rotation={[0, 0, 0]}>
    <T.Group rotation={[0, 0, 0]}>
      <T.Group rotation={[0, 0, 0]}>
        <ImagePlane radius={2.5} ct={1} />
      </T.Group>
    </T.Group>
  </T.Group>
</T.Group>

{#each balls as ball}
  <T.Mesh position={ball} visible={true}>
    <T.SphereGeometry args={[ball[2] === 0 ? 1 : 0.4, 16, 16]} />
    <T.MeshBasicMaterial color={ball[2] <= 0 ? 'red' : 'yellow'} />
  </T.Mesh>
{/each}

{#each axislines as axispts}
  <T.Mesh position={[0, 0, 0]} visible={true}>
    <T
      is={Line2}
      geometry={genLineSegment(axispts)}
      material={new LineMaterial({ color: 'white', linewidth: 0.0015 })}
    />
  </T.Mesh>
{/each}

