FROM openjdk:17
VOLUME /tmp
ADD ./target/Bookstore-0.0.1-SNAPSHOT.jar Bookstore.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/Bookstore.jar"]
