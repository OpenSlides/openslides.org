from django import forms
from django.utils.translation import ugettext_lazy


class FormMixin(object):
    error_css_class = 'error'
    required_css_class = 'required'


class ContactForm(FormMixin, forms.Form):
    subject = forms.CharField(label=ugettext_lazy("Betreff"))
    message = forms.CharField(widget=forms.Textarea(),
                              label=ugettext_lazy("Nachricht"))
    sender = forms.EmailField(label=ugettext_lazy("Absender"))
    cc_myself = forms.BooleanField(required=False,
                                   label=ugettext_lazy("Kopie an meine Adresse"))


class OrderEventForm(FormMixin, forms.Form):
    event_name = forms.CharField(label=ugettext_lazy("Veranstaltungsname"))
    event_description = forms.CharField(
        max_length=100, label=ugettext_lazy("Kurzbeschreibung der Veranstaltung"))
    event_date = forms.CharField(label=ugettext_lazy("Veranstaltungszeitraum"))
    event_location = forms.CharField(label=ugettext_lazy("Veranstaltungsort"))
    event_participants = forms.CharField(label=ugettext_lazy("Erwartete Teilnehmer"))


class OrderContactForm(FormMixin, forms.Form):
    contact_organisation = forms.CharField(label=ugettext_lazy("Organisation"))
    contact_street = forms.CharField(label=ugettext_lazy("Strasse"))
    contact_postcode = forms.CharField(label=ugettext_lazy("PLZ"))
    contact_location = forms.CharField(label=ugettext_lazy("Ort"))
    contact_name = forms.CharField(label=ugettext_lazy("Ansprechpartner"))
    contact_phone = forms.CharField(label=ugettext_lazy("Telefon"))
    contact_email = forms.EmailField(label=ugettext_lazy("E-Mail"))
