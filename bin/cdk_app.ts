#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { CdkAppStack } from "../lib/cdk_app-stack";
import { env } from "../constants/env";

const app = new cdk.App();

new CdkAppStack(app, 'Stack', {
  env
})