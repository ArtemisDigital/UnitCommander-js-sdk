
import { createNpmBump } from 'npm-bump';
const options = ["patch","minor","major"]

if(!options.includes(process.env.npm_config_newVer ))
    throw new Error("Option not found, must be path, minor or major")

    var npmBump = createNpmBump({
        remote: 'origin',
        branch: 'master',
        prefix: '[no-ci]',
        access: 'public',
    });
    npmBump(process.env.npm_config_newVer);