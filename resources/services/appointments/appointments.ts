import { Construct } from "constructs";
import * as cdk from "aws-cdk-lib";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as path from 'path';

export class appointmentsLambda extends Construct {
  public readonly lambda: lambda.Function;
  constructor(scope: Construct, id: string, props: any) {
    const { role, vpc, env } = props;
    super(scope, id);
    this.lambda = new lambda.Function(this, id, {
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: "index.handler",
      code: lambda.Code.fromAsset(path.join(__dirname, 'handler')),
      timeout: cdk.Duration.minutes(5),
      role,
      vpc,
      environment: env
    });
  }
}
