# stivens-hotel

Sistema de gerenciamento hoteleiro desenvolvido com Spring Boot.

## Requisitos

- Java 21
- Docker e Docker Compose
- Gradle (ou use o wrapper do projeto ./gradlew)

## Tecnologias

- Spring Boot 3.5.6
- Spring Security
- Spring Data JPA
- PostgreSQL
- JWT para autenticação
- Lombok
- Docker

## Configuração e Execução

1. Clone o repositório:
```bash
git clone <repository-url>
cd stivens-hotel
```

2. Inicie o banco de dados PostgreSQL usando Docker Compose:
```bash
docker-compose up -d
```

Isso iniciará um container PostgreSQL com as seguintes configurações:
- Porta: 5432
- Usuário: postgres
- Senha: root
- Banco de dados: stivens_hotel_db

3. Execute a aplicação:

Usando o wrapper do Gradle:
```bash
./gradlew bootRun
```

Ou gere o JAR e execute-o:
```bash
./gradlew build
java -jar build/libs/stivens-hotel-0.0.1-SNAPSHOT.jar
```

A aplicação estará disponível em `http://localhost:8080`

## Desenvolvimento

Para desenvolvimento, você pode usar o Spring Boot DevTools que já está configurado no projeto para hot-reload.

## Testes

Para executar os testes:
```bash
./gradlew test
```

## Docker

O projeto inclui um arquivo Docker Compose para gerenciar o ambiente de desenvolvimento. 
Para parar os containers:
```bash
docker-compose down
```

Para remover também os volumes (isso apagará os dados do banco):
```bash
docker-compose down -v
```
