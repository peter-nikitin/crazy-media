# Insane media

## Подготовка среды

### Mac OS

1. Установить [Homebrew](https://brew.sh):
    ```shell
    /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
    ```

2. Установить [Node.js](https://nodejs.org/en/) и [Yarn](https://yarnpkg.com/lang/en/):
    ```shell
    brew install yarn
    ```
3. Установить [Mongo DB](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/)
    ```shell
    brew install mongodb-community@4.0
    ```

### Windows

1. [Скачать](https://nodejs.org/en/) и установить Node.js.

2. [Скачать](https://yarnpkg.com/lang/en/docs/install/#windows-stable) и установить Yarn.

3. [Скачать](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/) и установить Mongo DB.

## Как начать пользоваться

1. Перейти в папку проекта.

2. Запустить сайт:
    ```shell
    yarn start
    ```

3. Сайт будет автоматически открыт в браузере по адресу [http://localhost:1234](http://localhost:1234).

4. Телеграм может запросить авторизацию. Если это произойдет, то надо написать мне :)


## Подключение к АПИ телеграма

1. В корен котола положить файл `.env` с прописанными ключами.
2. В src должна лежать папка storage с файлами:  selected.json, telegram.json. Первый - это список каналов, второй - ключи телеги.

##  Важное про работу демки

Каналы и посты можно перезаписывать. За это отвечает флак `eraseDatabaseOnSync: true/false,`  в `/src/server/config.js`. Если он `true` то в БД перезапишутся каналы и все их посты. Если `false`, то в БД будут подливаться только новые посты.

Демка может запуститься на сразу (как жигули). Если после старта не выводятся посты, то надод проверить флаг `eraseDatabaseOnSync` и перевести его в `false`
