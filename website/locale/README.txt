Instruction to update translation for openslides.org:
-----------------------------------------------------

1. Go to the website directory (which contains the 'locale' directory):
   $ cd website

2. Update the English po file (locale/en/LC_MESSAGES/django.po):
   $ django-admin.py makemessages -l en

3. Edit the English po file: locale/en/LC_MESSAGES/django.po
   (Search for "fuzzy" and empty msgstr entries.)

4. Update the English mo file (locale/en/LC_MESSAGES/django.mo):
   $ django-admin.py compilemessages

5. Restart server:
   $ python manage.py runserver

