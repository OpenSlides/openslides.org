from django.conf.urls import patterns, include, url
from django.conf.urls.i18n import i18n_patterns
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from django.views.generic import TemplateView, RedirectView

from .views import orderform, contactform

urlpatterns = i18n_patterns('',
    url(r'^i18n/', include('django.conf.urls.i18n')),
    url(r'^$', TemplateView.as_view(template_name="home.html"), name='home'),
    url(r'^about/$', TemplateView.as_view(template_name="about.html"), name='about'),
    url(r'^about/features/$', TemplateView.as_view(template_name="features.html"), name='features'),
    url(r'^about/license/$', TemplateView.as_view(template_name="license.html"), name='license'),
    url(r'^about/references/$', TemplateView.as_view(template_name="references.html"), name='references'),
    url(r'^about/press/$', TemplateView.as_view(template_name="press.html"), name='press'),
    url(r'^download/$', TemplateView.as_view(template_name="download.html"), name='download'),
    url(r'^plugins/$', TemplateView.as_view(template_name="plugins.html"), name='plugins'),
    url(r'^support/$', TemplateView.as_view(template_name="support_overview.html"), name='support_overview'),
    url(r'^support/packages$', TemplateView.as_view(template_name="support_packages.html"), name='support_packages'),
    url(r'^support/community$', TemplateView.as_view(template_name="support_community.html"), name='support_community'),
    url(r'^support/manual/$', TemplateView.as_view(template_name="support_manual.html"), name='support_manual'),
    url(r'^support/faq/$', TemplateView.as_view(template_name="support_faq.html"), name='support_faq'),
    url(r'^support/packages/order/(?P<package>(1|2|3))$', orderform, name='orderform'),
    url(r'^support/packages/thanks/$', TemplateView.as_view(template_name="thanks-order.html"), name='thanksorder'),
    url(r'^development/$', TemplateView.as_view(template_name="development.html"), name='development'),
    url(r'^contact/$', TemplateView.as_view(template_name="contact.html"), name='contact'),
    url(r'^contact/form/$', contactform, name='contactform'),
    url(r'^contact/thanks/$', TemplateView.as_view(template_name="thanks-contact.html"), name='thankscontact'),
    url(r'^donate/$', TemplateView.as_view(template_name="donate.html"), name='donate'),
    url(r'^demo/$', TemplateView.as_view(template_name="demo.html"), name='demo'),
    url(r'^impressum/$', TemplateView.as_view(template_name="impressum.html"), name='impressum'),
    url(r'^about/press/20110915/$', TemplateView.as_view(template_name="pm-20110915.html"), name='pm-20110915'),
    url(r'^about/press/20120416/$', TemplateView.as_view(template_name="pm-20120416.html"), name='pm-20120416'),
    url(r'^about/press/20120726/$', TemplateView.as_view(template_name="pm-20120726.html"), name='pm-20120726'),
    url(r'^about/press/20121022/$', TemplateView.as_view(template_name="pm-20121022.html"), name='pm-20121022'),
    url(r'^about/press/20121211/$', TemplateView.as_view(template_name="pm-20121211.html"), name='pm-20121211'),
    url(r'^about/press/20130710/$', TemplateView.as_view(template_name="pm-20130710.html"), name='pm-20130710'),
    url(r'^authors/$', TemplateView.as_view(template_name="authors.html"), name='authors'),
    url(r'^news/20121119/virtuelle-mitgliederversammlung/$', TemplateView.as_view(template_name="news-20121119.html"), name='news-20121119'),
)

# permanent redirect patterns
urlpatterns += patterns('',
    # redirect old web pages to new pages
    (r'^(de|en)/index.html$', RedirectView.as_view(url='/')),
    (r'^(de|en)/about.html$', RedirectView.as_view(url='/about/')),
    (r'^(de|en)/features.html$', RedirectView.as_view(url='/about/features/')),
    (r'^(de|en)/download.html$', RedirectView.as_view(url='/download/')),
    (r'^(de|en)/demo.html$', RedirectView.as_view(url='/demo/')),
    (r'^(de|en)/contact.html$', RedirectView.as_view(url='/contact/')),
    (r'^(de|en)/pricing/(.*)$', RedirectView.as_view(url='/support/')),
)
