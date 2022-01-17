#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { PipelineStack } from '../lib/pipeline/pipeline-stack';
import * as dotenv from 'dotenv';

dotenv.config();


const app = new cdk.App();

new PipelineStack(app, 'CognitoDevPipelineStack', {
  branch: 'dev',
  awsRegion: `${process.env.AWS_REGION}`,
  awsAccount: `${process.env.AWS_ACCOUNT_DEV}`,
  env: {
    account: `${process.env.AWS_ACCOUNT_MAIN_ID}`,
    region: `${process.env.AWS_REGION}`
  }
});

new PipelineStack(app, 'CognitoProdPipelineStack', {
  branch: 'prod',
  awsRegion: `${process.env.AWS_REGION}`,
  awsAccount: `${process.env.AWS_ACCOUNT_PROD}`,
  env: {
    account: `${process.env.AWS_ACCOUNT_MAIN_ID}`,
    region: `${process.env.AWS_REGION}`
  }
});

app.synth();