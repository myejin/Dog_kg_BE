# createdb 

### :grinning: How to Run

   - Install modules used
   ```bash
   $ /bin/bash settings.sh
   ```

   - Set User/Password for __remote connection__ to DB
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

   - Create Tables and Check schema
   ```bash
   $ python3 db_init.py
   $ python3 meta_print.py
   ```

# register-test 
UI test :point_right: https://blog.naver.com/rlagpwlsq789/222340095052

# board-test 
:pushpin: 
