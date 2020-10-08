import sqlite3
import json
from threading import Lock


class Database():
    """
    The class is responsible for the database manipulation and searching
    """
    def __init__(self, data_name: str):
        """
        The function inits a new Database
        :param data_name: the name of the database to connect to 
        """
        self.connection: sqlite3.Connection = sqlite3.connect(data_name, check_same_thread=False)
        self.cursor: sqlite3.Cursor = self.connection.cursor()
        self.sql_lock = Lock()

    def user_login(self, user_name: str, user_password: str):
        """
        The function gets a user from the database and tries to connect to it 
        :param user_name: the user name to connect
        :param password: the user password to connect
        :return: an json formated string containing the user information/ if it could connect or not
        """
        self.sql_lock.acquire()
        query: str = "SELECT * FROM users WHERE name = \"{0}\" AND password = \"{1}\"".format(user_name, user_password)
        
        # Adding limit at the end, and aplying the -- removal
        query = query.split("--")[0] + " LIMIT 1"

        for user in self.cursor.execute(query):
            
            try:
                self.sql_lock.release()
                name, password, money, id = user

                # Returning the information about the user, and if it could connect
                return json.dumps({"name": name, "id": id, "money": money, "login": True})

            except ValueError:
                return json.dumps({"name": "error", "id": -1, "money": -999, "login": False})
        
        self.sql_lock.release()
        return json.dumps({"name": "error", "id": -1, "money": -999, "login": False})


def main():
    data = Database("data.db")
    print(data.user_login('gal"--', "sesam"))


if __name__ == "__main__":
    main()
