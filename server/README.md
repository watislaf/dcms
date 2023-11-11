REMOVE from mongodb 
```
docker build -t api -f ./Dockerfile .  &&  docker run --env MONGO_PATH=host.docker.internal:27017/test -p 8080:8080 --network host api
```
