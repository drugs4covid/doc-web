FROM python:3.10
COPY . /usr/src/app
WORKDIR /usr/src/app
RUN \
    apt-get update -y \
    && apt-get install -y \
    curl \
    python3 \
    python3-dev \
    python3-pip \
    && pip3 install pip --upgrade
RUN  pip3 install -U PyMuPDF
RUN python3 -m pip install -r requirements.txt
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]