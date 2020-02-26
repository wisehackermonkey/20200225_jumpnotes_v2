# 20200225_jumpnotes_v2
------
simple note taking app
![](#)


build the project 
>npm run compile

Live build docker with nodemon and a watch folder
>nodemon -e js,html --watch .compiled  --watch web --exec "docker stop jumpnote2 & docker rm jumpnote2 & docker build -t jumpnote2 . & docker run -d --name jumpnote2 -p 80:3000 jumpnote2:latest"
