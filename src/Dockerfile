#
# Build
#
FROM maven:3.8.5-openjdk-17-slim AS build
COPY ./src /home/app/src
COPY ./pom.xml /home/app
RUN mvn -f /home/app/pom.xml clean package -DskipTests

#
# Package stage
#
FROM openjdk:17.0.2-slim
COPY --from=build /home/app/target/epigram-0.0.1-SNAPSHOT.jar /usr/local/lib/app.jar
ENTRYPOINT ["java","-jar","/usr/local/lib/app.jar"]