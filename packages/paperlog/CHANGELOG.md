# paperlog

## 0.1.0

### Minor Changes

- a6f917e: Drop shortcut CW mode

  Drop support for using shorthand 'CW' without mode prefix as it creates inconsitency in that other modes require the mode prefix

- a3d112b: Enable support for more ADIF fields

  Previously ADIF fields were on a short allow list. Now with the fields being generated from ADIF data, have flipped to use blocklist as the majority of fields can now be used with no issue

- d933053: Breaking: Add Operator field support, and rename `mycall` to `station` to more clearly match ADIF fields in use

### Patch Changes

- d0137e5: Refactor to use field definitions generated from ADIF spec
- 7057ad6: Support FT8 entries. Allows mode field to be any valid mode, and adds new `timeOn` command to deal with 6 digit times (ie. 234203)
- 3ffedfa: Export version in ADIF header

## 0.0.2

### Patch Changes

- b939940: Make parser case insensitive
