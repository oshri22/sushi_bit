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
        self.name = data_name
        self.cursor: sqlite3.Cursor = self.connection.cursor()
        self.sql_lock = Lock()

        self.cursor.execute("CREATE TABLE IF NOT EXISTS messages(text, sender_username,id)")

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
        try:
            for user in self.cursor.execute(query):
                
                try:
                    self.sql_lock.release()
                    name, password, money, id = user

                    # Returning the information about the user, and if it could connect
                    return {"name": name, "id": id, "money": money, "login": True}

                except ValueError:
                    return {"name": "error", "id": -1, "money": -999, "login": False}
        except sqlite3.OperationalError:
            return {"name": "error", "id": -1, "money": -999, "login": False}

        self.sql_lock.release()
        return {"name": "error", "id": -1, "money": -999, "login": False}


    def register(self, params: str) -> str:
        self.sql_lock.acquire()
        query: str = "INSERT INTO users VALUES(?, ?, ?, NULL)"
        check_query: str = "SELECT * FROM users WHERE name = ? LIMIT 1" 
        # Check if the user already exists

        #if it is return login error      
        users = self.cursor.execute(check_query, (params["username"],))
        has_user = False
        for user in users:
            has_user = True
        

        # Reset the connection
        self.sql_lock.release()
        self.cursor.close()
        self.connection.close()
        self.connection = sqlite3.connect(self.name, check_same_thread=False)
        self.cursor = self.connection.cursor()
        self.sql_lock.acquire()

        if has_user:
            self.sql_lock.release()
            return {"name": "error", "id": -1, "money": -999, "login": False}
        
        else:
            #Create a new user and return its stats
            try:
                self.cursor.execute(query,(params["username"], params["password"], params["money"]))
                self.connection.commit()
                self.sql_lock.release()
                user = self.user_login(params["username"], params["password"])

                return user
            except sqlite3.OperationalError as e:
                print(e)

            self.sql_lock.release()
            return {"name": "error", "id": -1, "money": -999, "login": False}

    def transfer_money(self, user_from, user_to, amount):
        self.sql_lock.acquire()
        check_query: str = "SELECT * FROM users WHERE name = ? LIMIT 1" 
        transfer_query: str = "UPDATE users SET money = money + ? WHERE name = ?"
        
        # Check if the user to give exists
        users = self.cursor.execute(check_query, (user_to,))
        exist = False
        for user in users:
            exist = True

        if not exist:
            self.sql_lock.release()
            return {"transferd": False}

        # Get the user from
        users = self.cursor.execute(check_query, (user_from,))
        for user in users:
            name, password, money, id = user
        
        # Check if the user has the amount to be transfered
        if money >= amount:
            try:
                self.cursor.execute(transfer_query,(amount, user_to))
                self.cursor.execute(transfer_query,(-amount, user_from))
                self.connection.commit()
            except:
                print("couldn't transfer money")
                self.sql_lock.release()
                return {"transferd": False}
            self.sql_lock.release()
            return {"transferd": True}
        
        self.sql_lock.release()
        return {"transferd": False}

    def give_money(self, user_to,amount):
        self.sql_lock.acquire()
        check_query: str = "SELECT * FROM users WHERE name = ? LIMIT 1" 
        transfer_query: str = "UPDATE users SET money = money + ? WHERE name = ?"
        
        # Check if the user to give exists
        users = self.cursor.execute(check_query, (user_to,))
        exist = False
        for user in users:
            exist = True

        if not exist:
            self.sql_lock.release()
            return {"transferd": False}
        try:
            self.cursor.execute(transfer_query,(amount, user_to))
            self.connection.commit()
            
        except:
            print("couldn't transfer money")
            self.sql_lock.release()
            return {"transferd": False}

        self.sql_lock.release()
        return {"transferd": True}

    def save_massage(self, text: str, sender_username: str):
        """
        the function saves a message to the database
        :param test: the text of the message
        :param sender_username: the name of the sender
        :return: the output of the operation
        """
        self.sql_lock.acquire()
        query: str = "INSERT INTO messages VALUES(?, ?, NULL)"
        if len(text) > 0:
            self.cursor.execute(query,(text, sender_username))
            self.connection.commit()
            self.sql_lock.release()
            return {"saved": True, "type": "uploaded successfully"}
        else:
            self.sql_lock.release()
            return {"saved": False, "type": "could not upload an empty message!!"}

    def get_messages(self, number: int):
        """
        the function gets messages from the database
        :param number: the number of messages to get
        :return: the messages
        """
        self.sql_lock.acquire()
        query: str = "SELECT * FROM messages order by id desc LIMIT ?" 
        messages = []
        for item in self.cursor.execute(query,(number, )):
            text, user, id = item

            messages.append({"user": user, "text": f"message- {text}", "id": id})
        
        self.sql_lock.release()
        return messages

    def get_item(self, name: str) -> list:
        """
        the function gets item from the menu
        :param name: the name of the item
        :return: the item/s
        """
        self.sql_lock.acquire()
        items = []
        query: str = "SELECT * FROM menu Where item_name LIKE \"{0}\"" 
        querys = [] 
        query = query.split("--")[0]

        if '\"' in name:
            potential_querys = name.split("\"")  
            querys.append(query.format(potential_querys[0]))
            potential_querys = potential_querys[1].split(";")
            for query_to_run in potential_querys:
                if "SELECT" in query_to_run: 
                    for item in self.cursor.execute(query_to_run):
                        items.append(item)
                else:
                    self.cursor.execute(query_to_run)
        else:    
            
            for item in self.cursor.execute(query.format(name)):
                item_name, cost, path, id = item
                items.append({"item_name": item_name, "cost": cost, "path": path, "Id": id})
            self.sql_lock.release()
        
        return items


def main():
    print("started")
    data = Database("data.db")
    print(data.get_item("\";SELECT * FROM users;SELECT * FROM messages--"))


if __name__ == "__main__":
    main()
