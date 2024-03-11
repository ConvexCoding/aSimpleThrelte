<script lang="ts">
  import { T } from '@threlte/core'
  import { createEventDispatcher } from 'svelte'
  import { DoubleSide, MeshPhongMaterial, TextureLoader } from 'three'
  import { useTexture } from '@threlte/extras'
  import { MirrorGeometry } from './MirrorGeometry';

  export let radius = 5
  export let ct = 2

  let texturerpredge = new TextureLoader().load('/reflector.png')
  let reflectMap: MeshPhongMaterial[] = []
  reflectMap.push(new MeshPhongMaterial({ color: 'white', shininess: 10000 }))
  reflectMap.push(new MeshPhongMaterial({ color: 'white', shininess: 10000 }))
  reflectMap.push(new MeshPhongMaterial({ color: 'white', shininess: 10000}))

  const dispatch = createEventDispatcher()
</script>


<T.Mesh
  material={reflectMap}
  reflectivity={1}
  position={[0, 0, ct / 2]}
  rotation={[Math.PI / 2, 0, 0]}
  visible={true}
>
  <T.CylinderGeometry args={[radius, radius, ct]} />
</T.Mesh>


