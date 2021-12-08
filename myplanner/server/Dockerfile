FROM python:3.9.5-slim-buster

# ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
ENV DATABASE_URL=postgresql://flask:flask_myplanner@db:5432/myplanner_data

WORKDIR /usr/src
COPY ./src ./requirements.txt ./entrypoint.sh /usr/src/
RUN pip install --upgrade pip && pip install -r requirements.txt --no-cache-dir

RUN apt-get update && apt-get install -y netcat && chmod +x ./entrypoint.sh
CMD ["/usr/src/entrypoint.sh"]
