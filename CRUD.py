import mysql.connector
from mysql.connector import Error

def Create():
    idn = input("Enter ID Number: ")
    lname = input("Enter Lastname: ")
    fname = input("Enter Firstname: ")
    sect = input("Enter Section: ")

    try:
        con = mysql.connector.connect(host = "localhost", database = "studentinfo", user = "root", password = "")
        query = "INSERT INTO student_information (ID, Lastname, Firstname, Section) VALUES ('"+idn+"', '"+lname+"','"+fname+"','"+sect+"')"
        cur = con.cursor()
        cur.execute(query)
        con.commit()
        print("Record Created.")
        cur.close()
    except Error as error:
        print("Record Creation failed. {}".format(error))
    finally:
        if con.is_connected():
            con.close()

def Read():
    con = mysql.connector.connect(host = "localhost", database = "studentinfo", user = "root", password = "")
    cur = con.cursor()
    cur.execute('Select * from student_information')
    records = cur.fetchall()
    print("\nNumber of student records in the database: ", cur.rowcount)
    print("Student Records:\n")
    for row in records:
        print("ID : ", row[0])
        print("Lastname : ", row[1])
        print("Firstname : ", row[2])
        print("Section : ", row[3])
        print("********************************\n")

def Update():
    try:
        con = mysql.connector.connect(host = "localhost", database = "studentinfo", user = "root", password = "")
        squery = 'Select * from student_information'
        cur = con.cursor()
        cur.execute(squery)
        records = cur.fetchall()
        print("\nNumber of student records in the database: ", cur.rowcount)
        print("Student Records:\n")
        for row in records:
            print("ID : ", row[0])
            print("Lastname : ", row[1])
            print("Firstname : ", row[2])
            print("Section : ", row[3])
            print("********************************\n")
        idn = input('Enter Id Number of record to be Updated: ')
        if (idn) in records:   
            squery = "Select * From student_information Where Id = '"+idn+"'" 
            cur = con.cursor()
            cur.execute(squery)
            record = cur.fetchone()

            lname = input('Update Lastname: ')
            fname = input('Update Firstname: ')
            sect = input('Update Section: ')

            uquery = "Update student_information set lastname='"+lname+"', firstname='"+fname+"',section='"+sect+"' where id='"+idn+"'"
            cur.execute(uquery)
            con.commit()

            cur.execute(squery)
            record = cur.fetchone()
            print(record)
            print("Record Updated.")
        else:
            print("Record not found.")

    except Error as error:
        print("Update failed. {}".format(error))

    finally:
        if con.is_connected():
            cur.close()
            con.close()

def Delete():
    try:
        con = mysql.connector.connect(host = "localhost", database = "studentinfo", user = "root", password = "")
        squery = 'Select * from student_information'
        cur = con.cursor()
        cur.execute(squery)
        records = cur.fetchall()
        print("\nNumber of student records in the database: ", cur.rowcount)
        print("Student Records:\n")
        for row in records:
            print("ID : ", row[0])
            print("Lastname : ", row[1])
            print("Firstname : ", row[2])
            print("Section : ", row[3])
            print("********************************\n")
        idn = input('Enter Id Number of record to be Deleted: ')
        if (idn) in records:
            c = input('Confirm to delete this record (Y/N):').upper()
            if c == 'Y':   
                dquery = "Delete From student_information Where Id = '"+idn+"'" 
                cur.execute(dquery)
                con.commit()
                print("Record Deleted.")
            else:
                print("Record Deletion Cancelled.")
        else:
            print("Record not found.")

    except Error as error:
        print("Deletion failed {}".format(error))

    finally:
        if con.is_connected():
            cur.close()
            con.close()

def main():
    print('Menu: \n[C] Create \n[R] Read \n[U] Update \n[D] Delete \n[X] Exit')
    choice = input('Pick an Operation: ').upper()

    if choice == 'C':
        Create()
    elif choice == 'R':
        Read()
    elif choice == 'U':
        Update()
    elif choice == 'D':
        Delete()
    elif choice == "X":
        exit()
    else:
        print('Choice not recognized, pick an operation from the list below.')
        main()

ans = "Y"
while ans == "Y":
    main()
    