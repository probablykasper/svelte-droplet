# Svelte Droplet

File dropzone for Svelte

## Usage

```svelte
<script lang="ts">
  function handleFiles(files: File[]) {
    console.log(file.name)
  }
</script>
<FileDrop {handleFiles} let:droppable>
  <div class="zone" class:droppable>
    Select or drop files here
  </div>
</FileDrop>
```

## Dev instructions

### Get started

1. Install Node.js (v14 works)
2. Run `npm install`

## Commands

- `npm run dev`: Start in dev mode
- `npm run build`: Build
- `npm run preview`: Preview production app
- `npm run lint`: Lint
- `npm run format`: Format

### Publish new version

1. Update `CHANGELOG.md`
2. Check for errors
    ```
    npm run check
    ```
3. Bump the version number
    ```
    npm version --no-git-tag <version>
    ```
4. Generate the package
    ```
    npm run build:package
    ```
5. Publish the package
    ```
    npm publish ./package
    ```
6. Commit with a tag in format "v#.#.#"
7. Create GitHub release with release notes
