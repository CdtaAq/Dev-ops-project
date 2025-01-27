# Step 1: Build Stage
# Use Maven to build the application
FROM maven:3.8.3-openjdk-17 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy the pom.xml and install the dependencies (this helps caching)
COPY pom.xml .

# Download dependencies to cache them
RUN mvn dependency:go-offline

# Copy the rest of the application source code
COPY src ./src

# Package the application (this will create the .jar file)
RUN mvn clean package -DskipTests

# Step 2: Runtime Stage
# Use an OpenJDK 17 image to run the application
FROM openjdk:17-jdk-slim

# Set the working directory inside the container
WORKDIR /app

# Copy the JAR file from the build stage
COPY --from=build /app/target/*.jar app.jar

# Expose the port the application will run on
EXPOSE 8080

# Run the Spring Boot application
ENTRYPOINT ["java", "-jar", "app.jar"]
