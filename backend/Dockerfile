FROM python:3.9

WORKDIR /app

RUN pip install flask 

RUN pip install markupsafe

RUN pip install flask_cors

COPY . .

ENV PORT 8080

EXPOSE 8080

CMD [ "python","BackEndServer.py" ]