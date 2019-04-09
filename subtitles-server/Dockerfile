FROM python:3.6
RUN apt-get update -y
RUN apt-get install -y python-pip python-dev build-essential

RUN wget https://ftp.mozilla.org/pub/mozilla.org/firefox/releases/45.0.2/linux-x86_64/en-US/firefox-45.0.2.tar.bz2
RUN tar -xjvf firefox*.tar.bz2
RUN mv firefox /opt/firefox
RUN ln -sf /opt/firefox/firefox /usr/bin/firefox

RUN apt-get install -y xvfb

RUN apt-get install -y libasound2

RUN apt-get update -y
RUN apt-get install -y python3-pip build-essential python3-dev nginx
RUN pip install -U gunicorn

ENV DISPLAY=:10

COPY . /app
WORKDIR /app
RUN pip install -r requirements.txt
ENTRYPOINT ["python"]
CMD ["main.py"]