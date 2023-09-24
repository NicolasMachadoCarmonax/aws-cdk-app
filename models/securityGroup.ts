import * as cdk from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';

export interface ISecurityGroupProps extends cdk.StackProps {
    vpc: ec2.Vpc,
}