from openslides_website.settings import *

DEBUG = True
SECRET_KEY = 'MAKE_ME_UNIQUE'
ROOT_URLCONF = 'example.urls'
WSGI_APPLICATION = 'example.wsgi.application'
ADMINS = (
    # ('Your Name', 'your_email@example.com'),
)

MANAGERS = ADMINS
TEMPLATE_DEBUG = DEBUG
