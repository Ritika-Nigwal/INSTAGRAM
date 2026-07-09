import smtplib
from email.message import EmailMessage
from pathlib import Path
from pydantic import EmailStr
from string import Template 

def sendEmail(request:dict,message:str):
    template_path = Path(__file__).parent / "template.html"
    content = Template(template_path.read_text(encoding="utf-8"))
  
    HOST="smtp.gmail.com"
    PORT=587
    email=EmailMessage()
    email["to"]=request['email']
    email["from"]="Instagram"
    email["subject"]="Welcome to instagram community."
    email.set_content(content.substitute({"username":request["username"],"message":message,"email":request["email"]}),"html")
    server=smtplib.SMTP(HOST,PORT)
    server.ehlo()
    server.starttls()
    server.login("parisramnigwal@gmail.com","xejg ptqy zrby jshj")
    server.send_message(email)
    return "sahi he"
