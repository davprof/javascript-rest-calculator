#!/bin/bash

# adiciona plugins do .tool-versions no asdf
cat .tool-versions | awk '{print $1}' | xargs -I {} asdf plugin add {}

# instala as versões do .tool-versions
asdf install