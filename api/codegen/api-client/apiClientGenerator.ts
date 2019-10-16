/*tslint:disable: no-console*/
/// <reference types="../../typings/portable-fetch"/>

import * as fs from 'fs';
import * as fetch from 'portable-fetch';
import * as sh from 'shelljs';
import { PROXY } from '../config/config';
import { apiClientDefinitions, APIDefinition } from './APIClientDefinitions';
import HttpProxyAgent = require('http-proxy-agent');

// Generator Config
const OPENAPI_CLI_VERSION = '4.0.0';
const OPENAPI_CLI_URL = `http://central.maven.org/maven2/org/openapitools/openapi-generator-cli/${OPENAPI_CLI_VERSION}/openapi-generator-cli-${OPENAPI_CLI_VERSION}.jar`;
const GENERATOR_FILENAME = 'openapi-generator-cli.jar';
const GENERATOR_DIR = 'resources';

// Directory config
const CWD = 'codegen/api-client';
const ROOT_DIR = '../../';
const API_INPUT_FOLDER = `${ROOT_DIR}api-specs`;
const INPUT_DIR = '';
const CLIENT_OUTPUT_FOLDER = `${ROOT_DIR}../src/services/api.generated`;

const fetchOptions = {
    agent: new HttpProxyAgent(PROXY)
};

const getOpenAPIGenerator = async () => {
    console.log('Checking if Generator JAR exists');
    const generatorExists = fs.existsSync(`${CWD}/${GENERATOR_DIR}/${GENERATOR_FILENAME}`);
    if (!generatorExists) {
        console.log('Downloading Generator JAR');
        if (!fs.existsSync(`${CWD}/${GENERATOR_DIR}`)) {
            fs.mkdirSync(`${CWD}/${GENERATOR_DIR}`);
        }
        const jarFileStream = fs.createWriteStream(`${CWD}/${GENERATOR_DIR}/${GENERATOR_FILENAME}`);
        const result = await fetch(OPENAPI_CLI_URL, fetchOptions);
        console.log('Creating Generator JAR');
        await new Promise((resolve, reject) => {
            result.body.pipe(jarFileStream);
            result.body.on('error', (err: Error) => reject(err));
            jarFileStream.on(`finish`, () => resolve());
        });
        console.log(`Created Generator JAR at: ${CWD}/${GENERATOR_FILENAME}`);
    } else {
        console.log('Generator JAR already exists');
    }
};

const generateAPIClients = (apiDefinitions: APIDefinition[]) => {
    console.log('Generating typescript...');
    sh.cd(__dirname);
    for (const apiDefinition of apiDefinitions) {
        sh.exec(
            `java -jar ${GENERATOR_DIR}/${GENERATOR_FILENAME} generate -i ${API_INPUT_FOLDER}/${INPUT_DIR}/${
                apiDefinition.src
            } -o ${CLIENT_OUTPUT_FOLDER}/${apiDefinition.name} -g typescript-axios`
        );
    }
};

const setupAPIClientGeneration = async () => {
    if (!sh.which('java')) {
        throw new Error('Java is not installed or in path');
    } else {
        await getOpenAPIGenerator();
        generateAPIClients(apiClientDefinitions);
    }
};

setupAPIClientGeneration();
