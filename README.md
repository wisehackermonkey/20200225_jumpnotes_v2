# 20200225_jumpnotes_v2
------
simple note taking app
![](#)


### build the project 
```
>npm run compile
```
### Build docker image
```bash
>docker build -t jumpnotes2 .
```

### Run Docker locally
```bash
>docker run -i --name jumpnotes2 -p 80:3000 jumpnotes2:latest
```
### Publish docker image
```bash
>docker tag jumpnotes2 wisehackermonkey/jumpnotes2:latest
>docker login
>docker push wisehackermonkey/jumpnotes2:latest
```
### Docker run for hosting
```bash
>docker run -d --name jumpnotes2 -p 80:3000 wisehackermonkey/jumpnotes2:latest
```
### Docker run for hosting with autorestart
```bash
>docker run -d --name jumpnotes2 --restart=always -p 80:3000 wisehackermonkey/jumpnotes2:latest

```

NOTE: by default docker sets visiblity of the image to private, [FIX]: go to docker hub and make it publick

Live build docker with nodemon and a watch folder
```bash
>nodemon -e js,html,css --watch .compiled  --watch web --exec "docker stop jumpnote2 & docker rm jumpnote2 & docker build -t jumpnote2 . & docker run -d --name jumpnote2 -p 80:3000 jumpnote2:latest"
```
