<script lang="ts">
	import "../app.css"
	import type { LayoutServerData } from "./$types"
	import darkmode from "$lib/contexts/darkmode"

	export let data: LayoutServerData
	$: $darkmode = data.mode
</script>

<svelte:head>
	<title>Minecraft Server</title>
	<meta
		name="keywords"
		content="minecraft, pvp, server, gaming, template, create, serve"
	/>
	<meta name="description" content="Minecraft Server Template" />
	<meta name="theme-color" content="#4c246e" />
	<link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
	<link rel="icon" href="/favicon.ico" type="image/x-icon" />
</svelte:head>

<slot />
