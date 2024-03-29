# Svelte Droplet

[![NPM](https://img.shields.io/npm/v/svelte-droplet.svg)](https://npmjs.com/package/svelte-droplet)
[![License](https://img.shields.io/npm/l/svelte-droplet.svg)](LICENSE)
[![NPM Downloads](https://img.shields.io/npm/dm/svelte-droplet.svg)](https://npmjs.com/package/svelte-droplet)
[![test](https://github.com/probablykasper/svelte-droplet/actions/workflows/test.yml/badge.svg)](https://github.com/probablykasper/svelte-droplet/actions/workflows/test.yml)

File dropzone for Svelte

[REPL](https://svelte.dev/repl/961863cf346c474888b658b98dcbf287?version=3.46.4)

## Install

```
npm install svelte-droplet
```

## Usage

```svelte
<script lang="ts">
	import { FileDrop } from 'svelte-droplet'
	function handleFiles(files: File[]) {
		for (const file of files) {
			console.log(file.name)
		}
	}
</script>
<FileDrop {handleFiles} let:droppable>
	<div class="zone" class:droppable>Select or drop files here</div>
</FileDrop>
```

## Props
| Prop            | Type                    | Description           |
| :-------------- | :---------------        | :-------------------- |
| `handleFiles`   | (files: File[]) => void | File handler function |
| `acceptedMimes` | string[] \| null        | List of allowed MIME types, like `image/jpeg` or `image/*`. Invalid files are ignored.<br>You can also use file extensions like `.jpg` but it will not enable `droppable` when the file is hovering, meaning you can't display a hover effect.<br>Defaults to `null` (all are allowed) |
| `max`           | number \| null          | Max number of files allowed. Extra files are ignored. Defaults to 0 (no limit) |
| `disabled`      | boolean                 | Disables the component |
| `name`          | string \| null          | Name of the input field, useful for forms |
| `tabindex`      | number                  | Set a custom tabindex |

## Slot props
| Prop         | Type     | Description   |
| :----------- | :------- | :------------ |
| `droppable`  | boolean  | True if the dropzone is currently hovered with valid files |

## Dev instructions

### Get started

1. Install Node.js (v14 works)
2. Run `npm install`

### Commands

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
	npm run package
	```
5. Publish the package
	```
	npm publish
	```
6. Commit with a tag in format "v#.#.#"
7. Create GitHub release with release notes
