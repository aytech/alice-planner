import logging
import os

from django.core.management import BaseCommand
from django.db.models import Q
from python_http_client import HTTPError
from sendgrid import Mail, Personalization, To, SendGridAPIClient

from api.models.ChecklistItem import ChecklistItem
from api.schemas.helpers.DateHelper import DateHelper


class Command(BaseCommand):
    help = "Send notifications for non-processes tasks"

    def __init__(self):
        super().__init__()
        self.logger = logging.getLogger("planner")

    def handle(self, *args, **options):
        try:
            env = os.environ['DJANGO_SETTINGS_MODULE']

            if env == 'alice_planner.settings.development':
                from alice_planner.settings import development as settings
            else:
                from alice_planner.settings import production as settings

            tasks = ChecklistItem.objects \
                .filter(Q(status="NOT_STARTED") | Q(status="IN_PROGRESS")) \
                .filter(archived=False).filter(deleted=False)

            for task in tasks:
                mail = Mail(from_email=("oyapparov@gmail.com", "Plánovač"))
                names = []

                personalization = Personalization()
                for user in task.people.all():
                    personalization.add_email(To(user.email))
                    if user.name is not None:
                        names.append(user.name)
                mail.add_personalization(personalization)

                mail.dynamic_template_data = {
                    'due_date': DateHelper.get_formatted_date(task.due),
                    'multiple_recipients': 1 if len(names) > 1 else 0,
                    'name': ', '.join(names),
                    'task_name': task.description,
                }

                mail.template_id = os.environ['DJANGO_NOTIFICATION_TEMPLATE']
                SendGridAPIClient(os.environ['DJANGO_EMAIL_API_KE']).send(mail)
        except HTTPError as ex:
            self.logger.error("Could not send notifications: {}".format(ex.to_dict))
        except Exception as ex:
            self.logger.error("Could not send notifications: {}".format(ex))
