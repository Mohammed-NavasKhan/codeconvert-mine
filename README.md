# React and tailwind css

1. npm create vite@latest my-project -- --template react
2. npm install -D tailwindcss@3 postcss autoprefixer
3. npx tailwindcss init -p

## Docker

1. docker build -t codeconvert .
2. docker run -d -p 4200:80 --name codeconvert-container codeconvert
3. docker-compose up -d
4. docker-compose build => to rebuild
