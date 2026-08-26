# A small CRUD app just to practice Docker.

## Create the database and table before using the app.

---

## Method @1

### Automatic Process

**STEP 1:** Download both `Dockerfile` and `docker-compose.yaml` files into an empty folder/directory.

**STEP 2:** Run the following command to build and run the containers:

```bash
docker compose up -d
```

**STEP 3:** Check the application at:

```text
http://<machine-ip>:3000
```

---

## Method @2

### Manual Process

### 1. Create a Docker Image

Use the following command to build the Docker image:

```bash
docker build -t imageName:v1 -f Dockerfile .
```

### 2. Pull the PostgreSQL Image

Pull the PostgreSQL Docker image:

```bash
docker pull postgres
```

### 3. Create an Isolated Network

Create a Docker network for the containers:

```bash
docker network create todo
```

### 4. Run the PostgreSQL Container

Run the PostgreSQL database container:

```bash
docker run -d --name todo-db \
-v todo-db:/var/lib/postgresql \
--network todo \
-e POSTGRES_USER=postgres \
-e POSTGRES_PASSWORD=123 \
-e POSTGRES_DB=todoapp \
postgres
```

### 5. Run the Application Container

Run the application container:

```bash
docker run -d --name todo-frontend \
-p 3000:3000 \
-e DB_HOST=todo-db \
--network todo \
--rm \
imageName:v1
```

### 6. Check the Application

Open the application in your browser:

```text
http://<ip-or-localhost>:3000
```

---

## END
