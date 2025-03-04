+++
date = '2025-03-04T18:40:11+01:00'
title = 'How to Send Logs from FluentBit to AWS OpenSearch Serverless'
slug = 'how-to-send-logs-from-fluent-bit-to-aws-opensearch-serverless'
tags = ['aws', 'logging', 'fluentbit', 'opensearch']
keywords = ['']
languages = ['en']
+++

While exploring alternatives to Datadog for logging, I created a proof of 
concept using OpenSearch (an Elasticsearch fork since 2021). I opted for the 
[Serverless](https://docs.aws.amazon.com/opensearch-service/latest/developerguide/serverless.html) option to avoid cluster management and tuning, allowing me to 
focus on integration and developer experience.

I couldn’t find a comprehensive guide covering all the necessary components to 
get this working, so I decided to write one. However, this post is not a 
step-by-step tutorial; it assumes familiarity with FluentBit, AWS and OpenSearch 
Serverless configuration options.

## Networking

I kept the dashboard publicly accessible (authenticated via the AWS web console 
session) and created an OpenSearch Serverless network policy with a managed VPC 
endpoint for API access. This enabled an internal AWS network connection between 
the OpenSearch API and our ECS Fargate containers.

For this setup to work, the VPC endpoint requires a security group that allows 
inbound HTTPS access from the ECS container's security group.

## IAM

The role under which FluentBit runs (in our case, `task_role_arn` in the ECS task 
definition), [requires the following permission](https://docs.aws.amazon.com/opensearch-service/latest/developerguide/serverless-data-access.html#serverless-data-access-vs-iam):
```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "VisualEditor0",
            "Effect": "Allow",
            "Action": "aoss:APIAccessAll",
            "Resource": "arn:aws:aoss:<region>:<account-id>:collection/<collection-id>"
        }
    ]
}
```
This might raise some concerns, but it only grants the role access to data plane 
APIs for a specified collection in the account. More details [here](https://docs.aws.amazon.com/opensearch-service/latest/developerguide/security-iam-serverless.html#security_iam_id-based-policy-examples-data-plane).

The actual access control is enforced through the OpenSearch Serverless data 
access policy, where we need to define the following permissions for the 
role and collection above:
```
aoss:CreateIndex
aoss:UpdateIndex
aoss:WriteDocument
```

## Create the index

1. Visit OpenSearch Dashboards URL for the collection. The URL follows this format: 
`https://dashboards.<region>.aoss.amazonaws.com/_login/?collectionId=<collection-id>`.
2. In OpenSearch Dashboards, open the left navigation pane and select Dev Tools.
3. Create an index using the query: `PUT <index-name>`

## FluentBit

Add the following output configuration as per the [FluentBit documentation](https://docs.fluentbit.io/manual/pipeline/outputs/opensearch#aws-opensearch-serverless):

```
[OUTPUT]
    Name  opensearch
    Match *
    Host <collection-id>.<region>.aoss.amazonaws.com
    Port 443
    Index <index-name>
    Trace_Error On
    Trace_Output Off
    AWS_Auth On
    AWS_Region ${AWS_REGION}
    AWS_Service_Name aoss
    tls On
    Suppress_Type_Name On
```

**Ensure you can read and tail FluentBit engine logs to monitor for delivery 
errors.**

## Verification

In OpenSearch Dev Tools, check the index information using the query: 
`GET _cat/indices/<index-name>?v`

Once the document count increases and no errors appear in FluentBit, proceed to 
create an index pattern in the _Stack Management_ menu to explore your data in 
_Discover_.

## Results

As an interesting data point, with approximately 650 logs per second and an 
average log size of ~6KB, indexing scaled to ~10 OCUs on average. Search 
capacity remained mostly at 1 OCU, peaking at 5 OCUs during active searches.

We decided not to proceed with this project due to its pricing and challenges in 
handling schema-less JSON logs, particularly those with high cardinality and 
varying data types. While it was roughly half the cost of Datadog, in our 
current context, the trade-offs were not justified.
