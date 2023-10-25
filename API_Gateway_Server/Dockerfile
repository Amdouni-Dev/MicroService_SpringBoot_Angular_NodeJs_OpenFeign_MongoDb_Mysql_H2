FROM openjdk:17
EXPOSE 8090
ADD target/API_Gateway_Server-0.0.1-SNAPSHOT.jar Gateway-Docker.jar
ENTRYPOINT ["java", "-jar", "Gateway-Docker.jar"]
