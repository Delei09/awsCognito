import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as cdk_pipeline from 'aws-cdk-lib/pipelines';

import * as dotenv from 'dotenv';
dotenv.config();


interface PipelineStackProps extends cdk.StackProps {
  branch: string;
  awsAccount: string;
  awsRegion: string;
}

export class PipelineStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: PipelineStackProps) {
    super(scope, id, props);

    const pipeline = new cdk_pipeline
      .CodePipeline(
        this, 'CognitoPipeLine'.concat(props.branch), {
          pipelineName: 'CognitoPipeLine'.concat(props.branch),
          dockerEnabledForSynth: true,
          crossAccountKeys: true,
          synth: new cdk_pipeline.ShellStep('Synth', {
            input: cdk_pipeline.CodePipelineSource
              .gitHub('Delei09/awsCognito', props.branch),
            commands: [
              'npm ci',
              'npm run build',
              'npx cdk synth'
            ]  
          })
      });

    // add stage here


  }
}