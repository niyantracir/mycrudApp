A small to app just to practice the docker and kubernetes.

Create the database and table before using the app.

Method @1

#####################   Automatic   Process    #########################################

  STEP-1 : Download both Dokerfile and docker-compose.yaml files in a empty folder/Directory.

  STEP-2 : Run the below command to build and run containers and Check: http://<machine-ip>:3000
              [Shell] $ docker compose up -d 

################################   END   ################################################



METHOD @2 


############################ Manual  PROCESS #################################

#1 Create a docker image using the docker file. RUN below command of that.
  $ docker build -t imageName:v1  -f Dockerfile .
  
#2 Pull the Postgres Sql DB image. RUN below command of that.
  $ docker pull postgres

#3 Create a isolated network for conatainers. RUN below command.
  $ docker network create todo
  
#4 Run the container from the image. modify and RUN  below command.
  $ docker run -d --name todo-db -v todo-db:/var/lib/postgresql --network todo -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=123 -e POSTGRES_DB=todoapp postgres

#6 After exiting from container shell. Run the below command.
  $ docker run -d --name todo-frontend -p 3000:3000 -e DB_HOST=todo-db --network todo --rm imageName:v1

#7 Check the on the browser it should work.... "http://<ip-or-localhost>:3000"

########################### END ###############################################################################




