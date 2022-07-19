from time import strftime

from .base import *
from datetime import timedelta

APP_URL = 'http://ayt.pythonanywhere.com'

ALLOWED_HOSTS = [
    'ayt.pythonanywhere.com',
]

GRAPHIQL_AVAILABLE = False

GRAPHQL_JWT = {
    'JWT_VERIFY_EXPIRATION': True,
    'JWT_LONG_RUNNING_REFRESH_TOKEN': True,
    'JWT_EXPIRATION_DELTA': timedelta(minutes=5),
    'JWT_REFRESH_EXPIRATION_DELTA': timedelta(days=7),
}

DEBUG = False

LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'formatters': {
        'verbose': {
            'format': 'LOG:%(levelname)s TIME: %(asctime)s MESSAGE: %(message)s PATHNAME: %(pathname)s'
        }
    },
    'handlers': {
        'file': {
            'level': 'INFO',
            'class': 'logging.FileHandler',
            'filename': APP_DIR / 'logs' / 'planner_{}.log'.format(strftime('%Y_%m_%d')),
            'formatter': 'verbose',
        }
    },
    'loggers': {
        'planner': {
            'handlers': ['file'],
            'level': os.getenv('DJANGO_LOG_LEVEL', 'INFO'),
            'propagate': False,
        },
    }
}
