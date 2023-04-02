import { Construct } from "constructs";
import { StackProps } from "aws-cdk-lib/core";
import { Function, Runtime, Code } from "aws-cdk-lib/aws-lambda";
import { RestApi, LambdaIntegration } from "aws-cdk-lib/aws-apigateway";
import { resolve } from 'path';

export class ApiConstruct extends Construct {
  constructor(scope: Construct, id: string, props: StackProps = {}) {
    super(scope, id);

    // Create the Lambda function
    const lambdaFn = new Function(this, "trashTruckLambda", {
      runtime: Runtime.NODEJS_18_X,
      handler: "main.api",
      code: Code.fromAsset(resolve(__dirname, '..', 'api/dist'))
    });

    // Create the API Gateway
    const restApi = new RestApi(this, "trashTruckApi", {
      restApiName: "My Rest API",
    });

    // Add a resource to the API Gateway
    const resource = restApi.root.addResource("trash-truck-resources");

    // Add a method to the resource
    resource.addMethod("GET", new LambdaIntegration(lambdaFn));
  }
}
