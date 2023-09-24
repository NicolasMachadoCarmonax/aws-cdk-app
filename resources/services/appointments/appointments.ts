import { Construct } from "constructs";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as cdk from "aws-cdk-lib";
export class appointmentsLambda extends Construct {
  public readonly lambda: lambda.Function;
  constructor(scope: Construct, id: string, props: any) {
    const { role } = props;
    super(scope, id);
    this.lambda = new lambda.Function(this, id, {
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: "index.handler",
      code: lambda.Code.fromAsset("lambda"),
      role,
      timeout: cdk.Duration.minutes(5),
    });
  }
}
