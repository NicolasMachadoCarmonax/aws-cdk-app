import * as cdk from "aws-cdk-lib";
import * as ec2 from "aws-cdk-lib/aws-ec2";

import { Construct } from "constructs";
import { ISecurityGroupProps } from "../../../models/securityGroup";

export class SecurityGroup extends Construct {
  public readonly securityGroup: ec2.SecurityGroup;
  constructor(scope: Construct, id: string, props: ISecurityGroupProps) {
    super(scope, id);
    this.securityGroup = new ec2.SecurityGroup(this, "db-security-group", {
      vpc: props.vpc, // use the vpc created above
    });
  }
  public getSecurityGroup() {
    return this.securityGroup;
  }
}
