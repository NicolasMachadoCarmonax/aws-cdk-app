import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as ec2 from "aws-cdk-lib/aws-ec2";
import { IRDSStackProps } from "../../models/rds";
import * as rds from "aws-cdk-lib/aws-rds";

export class RDS extends Construct {
  public readonly cluster: rds.ServerlessCluster;
  constructor(scope: Construct, id: string, props: IRDSStackProps) {
    super(scope, id);
    // stack vpc
    const { vpc } = props;
    // db secret
    const dbSecret = new rds.DatabaseSecret(this, "db-secret", {
      username: "user001",
    });
    // db serverless cluster
    this.cluster = new rds.ServerlessCluster(this, "db", {
      engine: rds.DatabaseClusterEngine.auroraPostgres({
        version: rds.AuroraPostgresEngineVersion.VER_13_9,
      }),
      vpc,
      securityGroups: [props.securityGroup],
      credentials: rds.Credentials.fromSecret(dbSecret),
      scaling: {
        maxCapacity: rds.AuroraCapacityUnit.ACU_8,
      },
    });
  }

  public getCluster() {
    return this.cluster;
  }
}
