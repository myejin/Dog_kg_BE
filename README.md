## Create DB 

### 1. Installing modules
   ```bash
   $ /bin/bash settings.sh
   ```

### 2. Setting User/Password for DB access
   ```bash
   > CREATE DATABASE dog_kg;
   > use mysql
   > update user set plugin='' where User='root';
   > set password = password('root');
   > flush privileges;
   ```

### 3. Creating Tables
   ```bash
   $ python3 db_init.py
   $ python3 meta_print.py
   ```
