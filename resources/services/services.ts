import * as lambda from "aws-cdk-lib/aws-lambda";
import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as iam from "aws-cdk-lib/aws-iam";
import { appointmentsLambda } from "./appointments/appointments";

export class ServicesStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope,id,props);
    const role = new iam.Role(this, 'lambdas-role', {
        assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
    });

    new appointmentsLambda(this,"app-service-appointments",{role});
    
    role.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName("service-role/AWSLambdaVPCAccessExecutionRole")); 
  }
}
