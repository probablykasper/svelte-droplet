<script lang="ts">
  export let handleFiles: (files: File[]) => void = () => {
    /* noop */
  }

  /**
   * List of allowed mime types, like `image/jpeg` or `image/*`. Invalid files are ignored.
   *
   * Null: all are allowed (default)
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

  let droppable = false
  $: if (disabled) droppable = false

  let input: HTMLInputElement

  function getAcceptedFiles(files: FileList | File[] = []): File[] {
    let acceptedFiles = []
    for (let i = 0; i < files.length; i++) {
      if (acceptedMimes === null || isAcceptedMime(files[i].type)) {
        acceptedFiles.push(files[i])
      }
    }
    if (max !== 0) {
      acceptedFiles = acceptedFiles.slice(0, max)
    }
    return acceptedFiles
  }

  function isAcceptedMime(mime: string): boolean {
    if (acceptedMimes === null) {
      return true
    }
    for (const acceptedMime of acceptedMimes) {
      if (acceptedMime === 'application/*' && mime.startsWith('application/')) {
        return true
      } else if (acceptedMime === 'audio/*' && mime.startsWith('audio/')) {
        return true
      } else if (acceptedMime === 'video/*' && mime.startsWith('video/')) {
        return true
      } else if (acceptedMime === 'image/*' && mime.startsWith('image/')) {
        return true
      } else if (acceptedMime === 'text/*' && mime.startsWith('text/')) {
        return true
      } else if (mime === acceptedMime) {
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
      if (item.kind === 'file' && isAcceptedMime(item.type)) {
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
</script>

<div
  on:drop|preventDefault={drop}
  on:dragover|preventDefault={dragOver}
  on:dragenter|preventDefault={dragOver}
  on:dragleave|preventDefault={dragLeave}
  tabindex="0"
  on:click={() => input.click()}
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
/>

<style lang="sass">
  div
    cursor: default
  [disabled]
    cursor: pointer
  input
    display: none
</style>
