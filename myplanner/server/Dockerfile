FROM python:3

ENV PYTHONUNBUFFERED=1

RUN mkdir /code
COPY ./src /code/
COPY ./requirements.txt /code/

WORKDIR /code
RUN pip install -r requirements.txt --no-cache-dir

CMD python app.py