FROM python:3.4-alpine
ADD local_devel /code
WORKDIR /code/
RUN pip install -r requirements.txt
CMD ["python", "devel_server.py"]
