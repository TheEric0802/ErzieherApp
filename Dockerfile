FROM node:alpine AS frontend
WORKDIR /app
COPY ./frontend/package.json .
COPY ./frontend/package-lock.json .
RUN npm install
COPY ./frontend .
RUN npm run build

FROM maven:3.9-eclipse-temurin-21 AS builder
WORKDIR /app
COPY ./backend/pom.xml .
COPY ./backend/src ./src
COPY --from=frontend /app/dist ./src/main/resources/static
RUN mvn clean package

FROM eclipse-temurin:21-alpine
EXPOSE 8080
RUN mkdir "/opt/app"
COPY --from=builder /app/target/*.jar /opt/app/app.jar
WORKDIR /opt/app
ENTRYPOINT ["java", "-jar", "app.jar"]