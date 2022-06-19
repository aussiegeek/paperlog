# paperlog-cli

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
