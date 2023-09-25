import * as cdk from "aws-cdk-lib";
import * as iam from "aws-cdk-lib/aws-iam";
import * as apigateway from "aws-cdk-lib/aws-apigateway";
import { Construct } from "constructs";
import { env } from "../constants/env";
import { VPC } from "../resources/network/vpc/vpc";
import { SecurityGroup } from "../resources/network/securityGroup/securityGroup";
import { RDS } from "../resources/database/rds";
import { appointmentsLambda } from "../resources/services/appointments/appointments";
export class CdkAppStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // VPC
    const vpc = new VPC(this, "appointments-vpc", { env }).getVpc();

    // Security Group
    const securityGroup = new SecurityGroup(
      this,
      "appointments-security-group",
      { env, vpc }
    ).getSecurityGroup();

    // Database
    new RDS(this, "appointments-db", {
      env,
      vpc,
      securityGroup,
    });

    // Lambdas role
    const role = new iam.Role(this, "lambdas-role", {
      assumedBy: new iam.ServicePrincipal("lambda.amazonaws.com"),
    });
    role.addManagedPolicy(
      iam.ManagedPolicy.fromAwsManagedPolicyName(
        "service-role/AWSLambdaVPCAccessExecutionRole"
      )
    );

    // Lambdas
    const appointmentsFn = new appointmentsLambda(
      this,
      "app-service-appointments",
      {
        role,
        vpc,
        env,
      }
    );

    // API
    const api = new apigateway.RestApi(this, "MyApi", {
      restApiName: "app-api",
    });

    // API - appointments
    const appointmentsIntegration = new apigateway.LambdaIntegration(
      appointmentsFn.lambda
    );
    const appointments = api.root.addResource("appointments");
    appointments.addMethod("POST", appointmentsIntegration);

    // // API - deploy
    // const deployment = new apigateway.Deployment(this, "api-deployment", {
    //   api,
    // });
    // new apigateway.Stage(this, "development", {
    //   deployment,
    // });
  }
}
