#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { PipelineStack } from '../lib/pipeline/pipeline-stack';
import * as dotenv from 'dotenv';

dotenv.config();


const app = new cdk.App();

new PipelineStack(app, 'CognitoDevPipelineStack', {
  branch: 'dev',
  awsRegion: "us-west-1" ,
  awsAccount: "723694120505",
  env: {
    account: "349225300597",
    region: "us-west-1"
  }
});

new PipelineStack(app, 'CognitoProdPipelineStack', {
  branch: 'prod',
  awsRegion: "us-west-1" ,
  awsAccount: "980373638480",
  env: {
    account: "349225300597",
    region: "us-west-1"
  }
});

app.synth();