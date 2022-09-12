# paperlog-cli

## 0.1.1

### Patch Changes

- d6d8e83: Improve errors so the user can action them easier
- ce99a5d: Export logs to subdirectory of input directory
- c611a7b: Fix WWFF logs not being split per UTC day
- aa04b6e: Don't export empty SOTA logs
- Updated dependencies [d6d8e83]
- Updated dependencies [d69c4d5]
- Updated dependencies [7fbc414]
- Updated dependencies [4e21d73]
- Updated dependencies [8a12b13]
  - paperlog@0.1.1

## 0.0.4

### Patch Changes

- Updated dependencies [a6f917e]
- Updated dependencies [a3d112b]
- Updated dependencies [d933053]
- Updated dependencies [d0137e5]
- Updated dependencies [7057ad6]
- Updated dependencies [3ffedfa]
  - paperlog@0.1.0

## 0.0.3

### Patch Changes

- 06a7861: Fix internal validation error of parser contacts

  Was verifying a contact was a valid AdifRecord when should have been
  testing for a ParserContact

  Added some more error handling output to handle these situations

## 0.0.2

### Patch Changes

- 2714900: Make development dependencies actual devDependencies
- fde18b5: Add missing bin to package.json
- Updated dependencies [b939940]
  - paperlog@0.0.2
