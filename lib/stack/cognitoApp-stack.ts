import * as cdk from "aws-cdk-lib"
import { Construct } from "constructs"
import * as lambdaNodeJs from 'aws-cdk-lib/aws-lambda-nodejs'
import * as apigateway from 'aws-cdk-lib/aws-apigateway'
import * as cwlogs from 'aws-cdk-lib/aws-logs'
import * as cognito from 'aws-cdk-lib/aws-cognito'

interface CognitoAppStackProps extends cdk.StackProps {
    branch: string ,
    productsFetchHandler: lambdaNodeJs.NodejsFunction,
   
}

export class CognitoAppStack extends cdk.Stack {

    constructor(scope: Construct, id : string, props : CognitoAppStackProps) {
        super(scope , id , props)

        const logGroup = new cwlogs.LogGroup( this, "CognitoApiLogs")
       const api = new apigateway.RestApi( this , "CognitoApi" , {
           restApiName: "Cognito API" ,
           deployOptions : {
               accessLogDestination : new apigateway.LogGroupLogDestination(logGroup) ,
               accessLogFormat: apigateway.AccessLogFormat.jsonWithStandardFields({
                   caller: true ,
                   httpMethod: true ,
                   ip: true ,
                   protocol : true,
                   requestTime: true ,
                   resourcePath: true ,
                   status: true ,
                   responseLength: true ,
                   user: true
               })
           }
       })

       const productsFetchFunctionIntegration = new apigateway.LambdaIntegration(props.productsFetchHandler)
       const productResource = api.root.addResource("products")
       productResource.addMethod("GET" , productsFetchFunctionIntegration)



    }


}