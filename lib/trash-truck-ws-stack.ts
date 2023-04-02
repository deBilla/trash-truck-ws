import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';
import { ApiConstruct } from './api.construct';

export class TrashTruckWsStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    // example resource
    // const queue = new sqs.Queue(this, 'TrashTruckWsQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });
    new ApiConstruct(this, 'ApiConstruct', {});
  }
}
