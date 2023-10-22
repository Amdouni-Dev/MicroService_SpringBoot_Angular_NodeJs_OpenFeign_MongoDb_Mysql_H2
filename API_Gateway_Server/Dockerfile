FROM openjdk:17
EXPOSE 8030
ADD target/API_Gateway_Server-0.0.1-SNAPSHOT.jar APIGateway-docker.jar
ENTRYPOINT ["java","-jar","APIGateway-docker.jar"]
