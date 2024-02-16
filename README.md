# Digital Library Client

The Digital Library provides library management solution digitally, where user can create new books,
user can see the list of books, update and delete book from the library.

## Setting Up the Project

### Prerequisites

-   Install Node.js
-   Install Docker
-   Install Minikube (optional)
-   Need to Run Backend Server

### Install dependencies

```shell
npm install
```

Copy Env file

```shell
cp example.env .env # copy env
```



Run project

```shell
npm run start # start the application
```

Run project in docker container

```shell
docker build --no-cache -t library-client:1 .
docker run -p 3000:3000 library-client:1
```