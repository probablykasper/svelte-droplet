<script lang="ts">
  export let handleFiles: (files: FileList) => void = () => {
    /* noop */
  }

  let droppable = false
  let input: HTMLInputElement

  function handleEnter() {
    droppable = true
  }

  function handleLeave() {
    droppable = false
  }

  function handleDrop(e: DragEvent) {
    e.preventDefault()
    const files = e.dataTransfer?.files
    if (files) {
      handleFiles(files)
    }
    droppable = false
  }

  function handleDragOver(e: DragEvent) {
    e.preventDefault()
  }

  let files: FileList
  function handleChange(e: Event) {
    e.preventDefault()
    if (files && files.length > 0) {
      handleFiles(files)
    }
  }
</script>

<div
  on:drop={handleDrop}
  on:dragover={handleDragOver}
  on:dragenter={handleEnter}
  on:dragleave={handleLeave}
  on:click={() => input.click()}
>
  <slot {droppable}>Upload</slot>
</div>
<input type="file" bind:files on:change={handleChange} bind:this={input} multiple />

<style lang="sass">
  input
    display: none
</style>
