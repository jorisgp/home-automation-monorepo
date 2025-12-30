// scripts/start-wiremock.js
const { execSync } = require('child_process');
const path = require('path');

const cwd = process.cwd().replace(/\\\\/g, '/');
const cmd = `docker rm -f ha-wiremock && docker run --rm --name ha-wiremock -p 8080:8080 -v ${cwd}/libs/wiremock/src/lib/__files:/home/wiremock/__files -v ${cwd}/libs/wiremock/src/lib/mappings:/home/wiremock/mappings wiremock/wiremock --global-response-templating --max-template-cache-entries=0 --enable-stub-cors`;

execSync(cmd, { stdio: 'inherit' });
