# Svelte Droplet

File dropzone for Svelte

[REPL](https://svelte.dev/repl/961863cf346c474888b658b98dcbf287?version=3.46.4)

## Usage

```svelte
<script lang="ts">
  function handleFiles(files: File[]) {
    console.log(file.name)
  }
</script>
<FileDrop {handleFiles} let:droppable>
  <div class="zone" class:droppable>Select or drop files here</div>
</FileDrop>
```

## Props
| Prop            | Type                    | Description           |
| :-------------- | :---------------        | :-------------------- |
| handleFiles     | (files: File[]) => void | File handler function |
| `acceptedMimes` | string[] \| null        | List of allowed mime types, like `image/jpeg` or `image/*`. Invalid files are simply filtered out.<br>Null: all are allowed (default) |
| `max`           | number \| null          | Max number of files allowed. Extra files are ignored. Defaults to 0 (no limit) |
| `disabled`      | boolean                 | Disables the component |

## Slot props
| Prop         | Type     | Description   |
| :----------- | :------- | :------------ |
| `droppable`  | boolean  | True if the dropzone is currently hovered with valid files |

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
    npm run lint
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
