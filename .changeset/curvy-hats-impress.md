---
"paperlog-cli": patch
---

Fix internal validation error of parser contacts

Was verifying a contact was a valid AdifRecord when should have been
testing for a ParserContact

Added some more error handling output to handle these situations
