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

<h1>Svelte Droplet</h1>

<p>Demo</p>
<div class="container">
  <FileDrop acceptedMimes={['image/png']} {handleFiles} let:droppable>
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
    margin: 100px 0px
    font-family: Arial, Helvetica, sans-serif
    font-size: 18px
    background-color: #111318
    color: #f2f2f2
    text-align: center
  h1
    color: #00c3ff
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
