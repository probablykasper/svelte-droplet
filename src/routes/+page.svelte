<script lang="ts">
	import FileDrop from '$lib/FileDrop.svelte'

	let handledFiles: File[] = []
	function handleFiles(files: File[]) {
		handledFiles = files
	}
</script>

<svelte:head>
	<title>Svelte Droplet</title>
</svelte:head>

<div class="row">
	<h2 class="logo">Svelte Droplet</h2>
	<div class="mr-auto"></div>

	<a href="https://github.com/probablykasper/svelte-droplet#usage">Docs</a>
	<a href="https://svelte.dev/repl/961863cf346c474888b658b98dcbf287?version=3.46.4">REPL</a>
	<a href="https://github.com/probablykasper/svelte-droplet" aria-label="GitHub repository">
		<svg
			height="24"
			viewBox="-2 -2 28 28"
			width="24"
			xmlns="http://www.w3.org/2000/svg"
			class="svelte-219huu"
			><path
				d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"
				fill="none"
				stroke="currentColor"
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				class="svelte-219huu"
			/></svg
		>
	</a>
</div>

<h2>Demo</h2>
<div class="container">
	<FileDrop {handleFiles} let:droppable>
		<div class="zone">
			{#if droppable}
				Drop a file
			{:else}
				Upload a file
			{/if}
			{#each handledFiles as file}
				<p class="file">{file.name}</p>
			{/each}
		</div>
	</FileDrop>
</div>

<style lang="sass">
	:global(body)
		font-family: Arial, Helvetica, sans-serif
		font-size: 18px
		background-color: #111318
		color: #f2f2f2
		text-align: center
	.logo
		color: #1fff8b
	.row
		display: flex
		flex-direction: row
		justify-content: center
		align-items: center
		margin-bottom: 50px
		max-width: 1000px
		margin: 0px auto
	.mr-auto
		margin-right: auto
	a
		color: #ffffff
		text-decoration: none
		margin: 0px 6px
		transition: all 80ms cubic-bezier(0.4, 0.0, 0.2, 1)
		&:hover
			color: #1fff8b
	svg
		display: block
	.container
		display: inline-block
	.zone
		background: #282b33
		display: inline-block
		width: 560px
		padding: 40px 0px
		border-radius: 4px
	.file
		margin-top: 10px
		margin-bottom: 0px
</style>
