import psycopg2 
from flask import current_app as app
from config import app_configuration
from psycopg2.extras import RealDictCursor
from .relations_commands import sqlcommands
import os

class DatabaseConnect:

    def __init__(self):
        
        self.credentials = dict(
                dbname ='',
                user = 'postgres',
                password='mine',
                host='localhost',
                port = 5432
            )
        self.conn =  psycopg2.connect(**self.credentials, cursor_factory=RealDictCursor)
        self.conn.autocommit = True
        self.cursor = self.conn.cursor()
        

        if app.config.get('ENV') == 'development':
            dbname = app_configuration['development'].DATABASE_URI
            self.credentials['dbname'] = dbname

            
        if app.config.get('ENV') == 'testing':
            dbname = app_configuration['testing'].DATABASE_URI
            self.credentials['dbname'] = dbname
    
        if app.config.get('ENV') == 'production':
 
            self.credentials_heroku ="""
            dbname='detk3fqvhdhgj8' user= 'gvvebchmfhkiba' host='ec2-54-225-89-195.compute-1.amazonaws.com' port =5432  password ='133f5978415d87eb5495f7abe7bb89e6fd3ff2755c00cfef2aa92645467a96af' 
            """
            self.credentials =self.credentials_heroku
        
        try:
            self.conn =  psycopg2.connect(**self.credentials, cursor_factory=RealDictCursor)
            self.conn.autocommit = True
            self.cursor = self.conn.cursor()
        except:
            print("failed to connect")
def drop_table(self,tablename):
        command = f"""
        DROP TABLE IF EXISTS {tablename} CASCADE
        """
        return self.cursor.execute(command)