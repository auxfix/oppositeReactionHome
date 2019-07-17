#!/bin/bash
# Deploy to prod
echo "Deploying to ECR"
$(aws ecr get-login --no-include-email --region eu-north-1)
docker build -t opposite.reaction.home .
docker tag opposite.reaction.home:latest 482520622690.dkr.ecr.eu-north-1.amazonaws.com/opposite.reaction.home:latest
docker push 482520622690.dkr.ecr.eu-north-1.amazonaws.com/opposite.reaction.home:latest