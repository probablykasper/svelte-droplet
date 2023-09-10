<script lang="ts">
	export let handleFiles: (files: File[]) => void = () => {
		/* noop */
	}

	/**
	 * List of allowed MIME types, like `image/jpeg` or `image/*`. Invalid files are ignored.
	 *
	 * You can also use file extensions like `.jpg` but it will not enable `droppable` when the file is hovering, meaning you can't display a hover effect.
	 *
	 * Defaults to `null` (all are allowed)
	 */
	export let acceptedMimes: string[] | null = null

	/**
	 * Max number of files allowed. Extra files are ignored.
	 *
	 * Defaults to 0 (no limit)
	 */
	export let max = 0

	/**
	 * Disables the component
	 */
	export let disabled = false

	/**
	 * Name of the input field, useful for forms
	 */
	export let name: string | null | undefined = undefined

	/**
	 * Set a custom tabindex
	 */
	export let tabindex = 0

	let droppable = false
	$: if (disabled) droppable = false

	let input: HTMLInputElement

	function getAcceptedFiles(files: FileList | File[] = []): File[] {
		let acceptedFiles = []
		for (let i = 0; i < files.length; i++) {
			if (acceptedMimes === null || isAccepted(files[i])) {
				acceptedFiles.push(files[i])
			}
		}
		if (max !== 0) {
			acceptedFiles = acceptedFiles.slice(0, max)
		}
		return acceptedFiles
	}

	function isAccepted(item: DataTransferItem | File): boolean {
		if (acceptedMimes === null) {
			return true
		}
		for (const acceptedType of acceptedMimes) {
			if (acceptedType.startsWith('.')) {
				const file = item instanceof DataTransferItem ? item.getAsFile() : item
				if (file?.name.endsWith(acceptedType)) {
					return true
				}
			}
			if (acceptedType === 'application/*' && item.type.startsWith('application/')) {
				return true
			} else if (acceptedType === 'audio/*' && item.type.startsWith('audio/')) {
				return true
			} else if (acceptedType === 'video/*' && item.type.startsWith('video/')) {
				return true
			} else if (acceptedType === 'image/*' && item.type.startsWith('image/')) {
				return true
			} else if (acceptedType === 'text/*' && item.type.startsWith('text/')) {
				return true
			} else if (item.type === acceptedType) {
				return true
			}
		}
		return false
	}

	function dragOver(e: DragEvent) {
		if (disabled) {
			return
		}
		const items = Array.from(e.dataTransfer?.items || [])
		for (const item of items) {
			if (item.kind === 'file' && isAccepted(item)) {
				droppable = true
				return
			}
		}
	}

	function dragLeave() {
		droppable = false
	}

	function drop(e: DragEvent) {
		if (disabled) {
			return
		}
		const acceptedFiles = getAcceptedFiles(e.dataTransfer?.files)
		if (acceptedFiles.length > 0) {
			handleFiles(acceptedFiles)
		}
		droppable = false
	}

	let inputFiles: FileList
	function handleChange() {
		const acceptedFiles = getAcceptedFiles(inputFiles)
		if (acceptedFiles && acceptedFiles.length > 0) {
			handleFiles(acceptedFiles)
		}
	}

	function keydown(e: KeyboardEvent) {
		if (e.key === ' ' || e.key === 'Enter') {
			e.preventDefault()
			input.click()
		}
	}
</script>

<div
	on:drop|preventDefault={drop}
	on:dragover|preventDefault={dragOver}
	on:dragenter|preventDefault={dragOver}
	on:dragleave|preventDefault={dragLeave}
	{tabindex}
	on:keydown={keydown}
	on:click={() => input.click()}
	role="button"
	aria-label="File Upload"
>
	<slot {droppable}>Upload</slot>
</div>
<input
	type="file"
	accept={acceptedMimes === null ? null : acceptedMimes.join(',')}
	multiple={max !== 1}
	bind:files={inputFiles}
	on:change|preventDefault={handleChange}
	bind:this={input}
	{disabled}
	{name}
/>

<style lang="sass">
	div
		cursor: pointer
	[disabled]
		cursor: default
	input
		display: none
</style>
