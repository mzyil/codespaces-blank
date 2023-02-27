import { App, Stack, StackProps } from 'aws-cdk-lib';
import { SubnetType, Vpc } from 'aws-cdk-lib/aws-ec2';
import { Construct } from 'constructs';

export class MyStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps = {}) {
    super(scope, id, props);

    new Vpc(this, 'TestVPC', {
      subnetConfiguration: [
        {
          name: 'subnet1',
          subnetType: SubnetType.PUBLIC,
        },
        {
          name: 'subnet2',
          subnetType: SubnetType.PRIVATE_ISOLATED,
        },
        {
          name: 'subnet3',
          subnetType: SubnetType.PRIVATE_WITH_EGRESS,
        },
      ],
    });
  }
}

// for development, use account/region from cdk cli
const devEnv = {
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_DEFAULT_REGION,
};

const app = new App();

new MyStack(app, 'codespaces-blank-dev', { env: devEnv });
// new MyStack(app, 'codespaces-blank-prod', { env: prodEnv });

app.synth();