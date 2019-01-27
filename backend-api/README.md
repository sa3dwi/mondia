# Springboot online movies app

This project provide API for:
1. List/manage Categories
2. List/manage Movies
3. Jwt user Login

## Requirements

For building and running the application you need:

- [JDK 1.8](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)
- [Maven 3](https://maven.apache.org)
- [MySQL 5.7](https://dev.mysql.com/downloads/mysql/5.7.html)


## Configurations

To change configurations (server port, database username and password, ...) `pom.xml` 


## Running the application locally

Use Mysql command-line or any other tools to create new database "movies" 

```shell
mysql -u root -p
CREATE DATABASE movies;
```

There are several ways to run a Spring Boot application on your local machine. 
One way is to execute the `main` method in the `mondia.movies.MoviesApplication` class from your IDE.

Or you can use the [Spring Boot Maven plugin](https://docs.spring.io/spring-boot/docs/current/reference/html/build-tool-plugins-maven-plugin.html) like so:

```shell
mvn spring-boot:run
```
for a dev server. Navigate to `http://127.0.0.1:5000/`. 
The app will automatically reload if you change any of the source files.


## API Documentations 

Project use [JSONDOC](http://jsondoc.org/how-to-spring-boot.html) to easily generate docs and playground with API

To use documentations:
`http://127.0.0.1:5000/jsondoc-ui.html?url=http://127.0.0.1:5000/jsondoc`
