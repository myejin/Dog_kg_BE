import pymysql

def db_init():
    sql = '''
        CREATE TABLE Kindergarden(
            kg_code CHAR(2) NOT NULL PRIMARY KEY,
            name VARCHAR(10) NOT NULL,
            region VARCHAR(5) NOT NULL
    );
    '''
    curs.execute(sql)
    
    sql = '''
        CREATE TABLE User(
            u_code INT(8) NOT NULL PRIMARY KEY,
            u_cat CHAR(1) NOT NULL,
            u_id VARCHAR(15) NOT NULL,
            u_pw VARCHAR(15) NOT NULL,
            u_name VARCHAR(10) NOT NULL,
            u_kg CHAR(2) NOT NULL,
            FOREIGN KEY(u_kg) REFERENCES Kindergarden(kg_code)
    );
    '''
    curs.execute(sql)

    sql = '''
        CREATE TABLE Dog(
            d_code INT(9) NOT NULL PRIMARY KEY,
            d_name VARCHAR(10),
            birth DATE,
            other VARCHAR(20),
            d_user INT(8) NOT NULL,
            d_kg CHAR(2) NOT NULL,
            d_coach INT(8) NOT NULL,
            FOREIGN KEY(d_user) REFERENCES User(u_code),
            FOREIGN KEY(d_kg) REFERENCES Kindergarden(kg_code),
            FOREIGN KEY(d_coach) REFERENCES User(u_code)
    );
    '''
    curs.execute(sql)

    sql = '''
        CREATE TABLE Board(
            b_num INT NOT NULL,
            b_cat CHAR(1) NOT NULL,
            b_title VARCHAR(20) NOT NULL,
            content VARCHAR(100),
            b_writer INT(8) NOT NULL,
            b_kg CHAR(2) NOT NULL,
            FOREIGN KEY(b_writer) REFERENCES User(u_code),
            FOREIGN KEY(b_kg) REFERENCES Kindergarden(kg_code),
            PRIMARY KEY(b_num, b_kg)
    );
    '''
    curs.execute(sql)

    sql = '''
        CREATE TABLE Diary(
            di_num INT NOT NULL,
            content VARCHAR(100),
            di_dog INT(9) NOT NULL,
            di_writer INT(8) NOT NULL,
            FOREIGN KEY(di_dog) REFERENCES Dog(d_code),
            FOREIGN KEY(di_writer) REFERENCES User(u_code),
            PRIMARY KEY(di_num, di_dog)
    );
    '''
    curs.execute(sql)

    sql = '''
        CREATE TABLE Meal(
            m_date DATE NOT NULL,
            m_time CHAR(1) NOT NULL,
            CONTENT VARCHAR(100),
            m_kg CHAR(2) NOT NULL,
            m_writer INT(8) NOT NULL,
            FOREIGN KEY(m_kg) REFERENCES Kindergarden(kg_code),
            FOREIGN KEY(m_writer) REFERENCES User(u_code),
            PRIMARY KEY(m_date, m_time, m_kg)
    );
    '''
    curs.execute(sql)


if __name__ == '__main__':
    conn = pymysql.connect(host = 'localhost', user = 'root', password = 'root', db = 'dog_kg')
    curs = conn.cursor()
    db_init()
    conn.commit()
    conn.close()
