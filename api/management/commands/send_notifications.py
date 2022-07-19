import logging
import os
from datetime import date

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
            tasks = ChecklistItem.objects \
                .filter(due__lte=date.today()) \
                .filter(Q(status="NOT_STARTED") | Q(status="IN_PROGRESS")) \
                .filter(archived=False).filter(deleted=False)

            if len(tasks) == 0:
                self.logger.info("No tasks found for notifications")
                return

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
                SendGridAPIClient(os.environ['DJANGO_EMAIL_API_KEY']).send(mail)
                self.logger.info("Notification email for task {} sent to {}".format(task.id, ','.join(
                    list(map(lambda to: to['email'], personalization.tos)))))
        except HTTPError as ex:
            self.logger.error("Could not send notifications: {}".format(ex.to_dict))
        except Exception as ex:
            self.logger.error("Could not send notifications: {}".format(ex))
