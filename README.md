## Create DB 

### 1. Installing modules
   ```bash
   $ /bin/bash settings.sh
   ```

### 2. Setting User/Password for remote connection to DB
   ```bash
   (in DB)
   > CREATE DATABASE dog_kg;
   > use mysql
   > update user set plugin='' where User='root';
   > set password = password('root');
   > flush privileges;
   > create user 'root'@'%' identified by 'root';
   > grant all privileges on *.* to 'root'@'%' with grant option;
   ```
   ```bash
   $ sudo vim /etc/mysql/mariadb.conf.d/50-server.cnf
      -> # bind-address (Annotation)
   $ sudo service mysql restart
   ```

### 3. Creating Tables
   ```bash
   $ python3 db_init.py
   $ python3 meta_print.py
   ```
