<script lang='ts'>
	import { Canvas } from "@threlte/core";
  import Scene from "./Scene.svelte";

	let width: number;
</script>

<div class="relative w-full" style:height={'600px'} bind:clientWidth={width} >
	<Canvas>
		<Scene />
	</Canvas>
</div>


