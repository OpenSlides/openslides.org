============================================
 openslides.org - The website of OpenSlides
============================================


This is the GitHub repository of the website http://www.openslides.org of OpenSlides only!
The software project OpenSlides is managed in an own `repository <https://github.com/OpenSlides/OpenSlides/>`_.


Setup website locally
=====================

If you want to help translating openslides.org into your language contribute to our
`transifex project <https://www.transifex.com/openslides/>`_.


Installation and start of the current website
---------------------------------------------

1. Check requirements

   You need to have `Node.js (>=0.10) <https://nodejs.org/>`_ and `Git <http://git-scm.com/>`_
   installed.

2. Get source code of openslides.org

   Clone current master version from `openslides.org GitHub repository
   <https://github.com/OpenSlides/openslides.org>`_::

       $ git clone https://github.com/OpenSlides/openslides.org.git
       $ cd openslides.org

3. Install all npm and bower packages::

       $ npm install

4. Start http server::

       $ npm start

Open browser at http://localhost:8080/


Used software
=============

openslides.org uses the following JavaScript packages (see bower.json):

* `angular <http://angularjs.org>`_, License: MIT
* `angular-bootstrap <http://angular-ui.github.io/bootstrap>`_, License: MIT
* `angular-gettext <http://angular-gettext.rocketeer.be/>`_, License: MIT
* `angular-scroll <https://github.com/oblador/angular-scroll/>`_, License: MIT
* `angular-ui-router <http://angular-ui.github.io/ui-router/>`_, License: MIT
* `bootstrap <http://getbootstrap.com>`_, License: MIT
* `font-awesome-bower <https://github.com/tdg5/font-awesome-bower>`_, License: MIT
* `open-sans-fontface <https://github.com/FontFaceKit/open-sans>`_, License: Apache License version 2.0
* `roboto-condensed <https://github.com/davidcunningham/roboto-condensed>`_, License: Apache 2.0


License and authors
===================

openslides.org (with all texts and images) is Free/Libre Open Source Software
(FLOSS) and distributed under the MIT License, see LICENSE file.

Main author of openslides.org is Emanuel Schütze.
