import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { VPC } from "../resources/network/vpc/vpc";
import { env } from "../constants/env";
import { SecurityGroup } from "../resources/network/securityGroup/securityGroup";
import { RDS } from "../resources/database/rds";

export class CdkAppStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    // Stack vpc
    const vpc = new VPC(this, "appointments-vpc", { env }).getVpc();
    // Stack Security Group
    const securityGroup = new SecurityGroup(
      this,
      "appointments-security-group",
      { env, vpc }
    ).getSecurityGroup();
    // Aurora database
    new RDS(this, "appointments-db", {
      env,
      vpc,
      securityGroup,
    });
  }
}
