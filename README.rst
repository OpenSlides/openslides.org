============================================
 openslides.org - The website of OpenSlides
============================================


This is the GitHub repository of the website http://www.openslides.org of OpenSlides only!
The sofware project OpenSlides is managed in an own `repository <https://github.com/OpenSlides/OpenSlides/>`_


Setup website locally
=====================

Requirements: Python, setuptools and virtualenv should be installed.
Follow `OpenSlides README <https://github.com/OpenSlides/OpenSlides/blob/master/README.rst>`_
for general install instructions of python stack.

If you want to help improving this website, please contact us via our
`mailing lists <http://openslides.org/contact/>`_.

If you want to help translating openslides.org into your language you can use our
`transifex project <https://www.transifex.com/projects/p/openslidesorg/>`_. Currently,
German is our source language.


Installation and start of the current website
---------------------------------------------
Use command line on GNU/Linux or MacOS X. For using on Windows see general hints in
`OpenSlides' README <https://github.com/OpenSlides/OpenSlides/blob/master/README.rst>`_.


1. Get source code of openslides.org

   Clone current master version from `openslides.org GitHub repository
   <https://github.com/OpenSlides/openslides.org>`_. This requires `Git
   <http://git-scm.com/>`_.

       $ git clone https://github.com/OpenSlides/openslides.org.git
       $ cd openslides.org

2. Setup a virtual environment with Virtual Python Environment builder

       $ virtualenv .virtualenv
       $ source .virtualenv/bin/activate

3. Install all required python packages

       $ pip install -r requirements.txt

4. Run openslides.org server

       $ python manage.py runserver

   To get help on the command line options run::

       $ python manage.py runserver --help

Open browser at http://127.0.0.1:8000/


Used software
=============

openslides.org uses the following projects or parts of them:

* `Django <https://www.djangoproject.com>`_, License: BSD

* `Twitter Bootstrap <http://getbootstrap.com/2.3.2/>`_, License: Apache
  License v2.0


License and authors
===================

openslides.org (with all texts and images) is Free/Libre Open Source Software
(FLOSS) and distributed under the MIT License, see LICENSE file.

Main author of openslides.org is Emanuel Schütze.
