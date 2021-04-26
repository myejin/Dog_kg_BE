import pymysql

def all_table_columns():
    curs.execute('SHOW TABLES')
    tables = curs.fetchall()
    for table in tables:
        print('[', table[0], ']')
        curs.execute('SHOW FULL COLUMNS FROM ' + table[0])
        cols = curs.fetchall()

        for col in cols:
            print(col[0], '(' + col[1] + ')', end = '  ')
        print(end = '\n\n')
    

if __name__ == '__main__':
    conn = pymysql.connect(host = 'localhost', user = 'root', password = 'root', db = 'dog_kg')
    curs = conn.cursor()
    all_table_columns()
    conn.close() 
