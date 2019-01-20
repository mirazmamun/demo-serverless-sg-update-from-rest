# Serverless Service for Security Group (SG) Update
This microservice allows users with authorization keys to update SG. It will create the SG if does not exist already and will return `500` if the rule is already existing.

## How to Deploy

You need `nodejs > 8.0.0` and `npm > 5.0.0` installed. Follow these steps:

1. Run ```npm install```
2. Make sure you have setup your AWS credentials that will have privilege to create the resources required by CF Template. Checkout the docs [here](https://serverless.com/framework/docs/providers/aws/guide/credentials#using-aws-access-keys)
3. The default setup will take care of linking executable in POSIX environment. Alternatively you can install `serverless` globally. `npm install -g serverless` or checkout [this link](https://serverless.com/framework/docs/providers/aws/guide/quick-start#pre-requisites)
4. Run ```./node_modules/.bin/serverless deploy``` or is `serverless` is globally available in you environment, run ```serverless deploy```. This command will create the CF template locally and will create the CF stack in the target region. If you want to take the CF template yourself then modify and run it try ```serverless package --package <target folder to create packages to>```. Try the [docs](https://serverless.com/framework/docs/providers/aws/guide/packaging/) to learn more. This command will also print out the api key enforced on the endpoint. This API key is there to protect unauthorized access to it.
5. After the serverless service is deployed, you can use either the API Gateway to test out the endpoint or use curl tool for it. An example would be:
```
curl -d '{"sgName":"SG_DEVELOPER_TEST","IP":"1.1.1.2"}' -H "x-api-key: <your API GW key>" -H "Content-Type: application/json" -X POST https://cjdn3h9c9a.execute-api.ap-southeast-2.amazonaws.com/dev/update
```