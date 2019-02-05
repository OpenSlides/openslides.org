/* openslides-site.js */

angular.module('openslides-website', [
    'duScroll',
    'gettext',
    'ngAnimate',
    'ui.bootstrap',
    'ui.router'
])

.config([
    '$urlRouterProvider',
    '$locationProvider',
    function($urlRouterProvider, $locationProvider) {
        // define fallback url and html5Mode
        $urlRouterProvider.otherwise('/');
        $locationProvider.html5Mode(true);
    }
])

.config([
    '$stateProvider',
    '$locationProvider',
    '$urlRouterProvider',
    function ($stateProvider, $locationProvider, $urlRouterProvider) {
        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'static/views/home.html'
            })
            .state('press', {
                url: '/press',
                templateUrl: 'static/views/press.html'
            })
            .state('references', {
                url: '/references',
                templateUrl: 'static/views/references.html'
            })
            .state('legalnotice', {
                url: '/legalnotice',
                templateUrl: 'static/views/legalnotice.html'
            })
            .state('privacypolicy', {
                url: '/privacypolicy',
                templateUrl: 'static/views/privacypolicy.html'
            })
            // press news
            .state('dgb-bundeskongress2018', {
                url: '/dgb-bundeskongress2018',
                templateUrl: 'static/views/dgb-bundeskongress2018.html'
            })
            .state('20141125', {
                url: '/20141125',
                templateUrl: 'static/views/news-20141125.html'
            })
            .state('20121119', {
                url: '/20121119',
                templateUrl: 'static/views/news-20121119.html'
            });

        // redirect to 'home' for error states
        $urlRouterProvider.otherwise(function ($injector, $location) {
            $injector.invoke(['$state', function ($state) { $state.go('home'); }]);
            return true;
        });
    }
])


// gets all available languages
.factory('Languages', [
    'gettext',
    'gettextCatalog',
    function (gettext, gettextCatalog) {
        return {
            // get all available languages
            getLanguages: function () {
                var current = gettextCatalog.getCurrentLanguage();
                // Define here new languages...
                var languages = [
                    { code: 'en', name: 'English' },
                    { code: 'de', name: 'Deutsch' },
                    { code: 'es', name: 'Español' },
                    { code: 'pt', name: 'Português' },
                    { code: 'cs', name: 'Český' },
                    { code: 'ru', name: 'русский' },
                ];
                angular.forEach(languages, function (language) {
                    if (language.code == current)
                        language.selected = true;
                });
                return languages;
            },
            // get detected browser language code
            getBrowserLanguage: function () {
                var lang = navigator.language || navigator.userLanguage;
                if (lang.indexOf('-') !== -1)
                    lang = lang.split('-')[0];
                if (lang.indexOf('_') !== -1)
                    lang = lang.split('_')[0];
                return lang;
            },
            // set current language and return updated languages object array
            setCurrentLanguage: function (lang) {
                var languages = this.getLanguages();
                angular.forEach(languages, function (language) {
                    language.selected = false;
                    if (language.code == lang) {
                        language.selected = true;
                        gettextCatalog.setCurrentLanguage(lang);
                        if (lang != 'en') {
                            gettextCatalog.loadRemote("static/i18n/" + lang + ".json");
                        }
                    }
                });
                return languages;
            }
        };
    }
])

// set browser language as default language for OpenSlides
.run([
    '$rootScope',
    '$state',
    '$location',
    'gettextCatalog',
    'Languages',
    function($rootScope, $state, $location, gettextCatalog, Languages) {
        // set language spezified by query params (?lang=en) or browser language
        var urlQuery = $location.search(),
            langCodes = [],
            languages = Languages.getLanguages();
        for (var key in languages) { // I would prefer a quick _.map
            langCodes.push(languages[key].code);
        }

        if (urlQuery.lang && langCodes.indexOf(urlQuery.lang) > -1) {
            Languages.setCurrentLanguage(urlQuery.lang);
        } else {
            Languages.setCurrentLanguage(Languages.getBrowserLanguage());
        }

        // Set this to true for debug. Helps to find untranslated strings by
        // adding "[MISSING]:".
        gettextCatalog.debug = false;
    }
])
.controller('ScrollCtrl', [
    '$document',
    function ($document ) {
        $document.scrollTop(0);
    }
])

.controller('MenuCtrl', [
    '$scope',
    function ($scope) {
        $scope.isMenuOpen = false;
        $scope.closeMenu = function () {
            $scope.isMenuOpen = false;
        };
    }
])

.controller('LanguageCtrl', [
    '$scope',
    '$location',
    'Languages',
    'filterFilter',
    function ($scope, $location, Languages, filterFilter) {
        // get all available languages
        $scope.languages = Languages.getLanguages();
        // get detected browser language code
        $scope.selectedLangCode = filterFilter($scope.languages, {selected: true})[0].code;
        // controller to switch app language
        $scope.switchLanguage = function (lang) {
            $scope.languages = Languages.setCurrentLanguage(lang);
            $scope.selectedLangCode = filterFilter($scope.languages, {selected: true})[0].code;
        };
        $scope.getLanguageHref = function (lang) {
            return $location.$$absUrl.split('?')[0] + '?lang=' + lang;
        };
    }
])

.controller('ReferenceCtrl', [
    '$scope',
    function ($scope) {
        $scope.page = 0;
        $scope.numberPerPage = 6;
        $scope.logos_parteien = [
            { name: 'BÜNDNIS 90/DIE GRÜNEN',
              event: 'Landesparteitage Hamburg / Hessen / Schleswig-Holstein',
              src:  'gruene-logo.png' },
            { name: 'SPD',
              event: 'Kreisparteitag Nordfriesland / Landes-AK "Digitale Gesellschaft"',
              src:  'spd-logo.png' },
            { name: 'DIE LINKE.',
              event: 'Kreisparteitag Görlitz',
              src:  'linke-logo.png' },
            { name: 'Piratenpartei Deutschland / Schweiz',
              event: 'Bundes-, Landes- und Kreisparteitage',
              src:  'piraten-logo.png' },
            { name: 'Grüne Jugend',
              event: 'Bundeskongress',
              src:  'gruene-jugend-logo.png' },
            { name: 'Jusos',
              event: 'Bezirk Hessen Süd / Kreis Nordfriesland / Ortsgruppe Föhr',
              src:  'jusos-logo.png' },
            { name: 'Linksjugend',
              event: 'Landesjugendplenum Sachsen',
              src:  'linksjugend-logo.png' },
            { name: 'Piraten ohne Grenzen',
              event: 'Piratenversammlungen',
              src:  'pog-logo.png' },
            { name: 'Junge Generation in der SPÖ Wien',
              event: 'Landeskonferenz',
              src:  'jgspoe-logo.png' },
        ];
        $scope.logos_gewerkschaften = [
            { name: 'Deutscher Gewerkschaftsbund (DGB)',
              event: 'DGB-Bundeskongress 2018, DGB-Bezirkskonferenzen',
              src:  'dgb-logo.png' },
            { name: 'DGB Jugend',
              event: 'DGB-Bundesjugendkonferenz 2017, DGB-Bezirksjugendkonferenzen',
              src:  'dgb-jugend-logo.png' },
            { name: 'Industriegewerkschaft Bauen Agrar Umwelt',
              event: 'Gewerkschaftstag 2017',
              src:  'igbau-logo.png' },
            { name: 'Gewerkschaft der Polizei (GdP)',
              event: 'Bundeskongress 2018, Bundeskonferenzen der Frauen/Senioren/Jugend 2018',
              src:  'gdp-logo.png' },
            { name: 'Gewerkschaft Nahrung Genuss Gaststätten (NGG)',
              event: 'Gewerkschaftstag 2018, Bundesjugendkonferenz 2018',
              src:  'ngg-logo.png' },
            { name: 'Gewerkschaft Erziehung und Wissenschaft (GEW)',
              event: 'Landesvertreterversammlungen 2018 Thüringen, Brandenburg',
              src:  'gew-logo.png' },
        ];
        $scope.logos_misc = [
            { name: 'Amnesty International',
              event: 'Jahresversammlung 2018',
              src:  'amnesty-logo.png' },
            { name: 'Sächsische Landesärztekammer',
              event: 'Kammerversammlungen',
              src:  'slaek-logo.png' },
            { name: 'Landesärztekammer Hessen',
              event: 'Delegiertenversammlungen',
              src:  'laekh-logo.png' },
            { name: 'Ärztekammer Saarland',
              event: 'Vertreterversammlungen',
              src:  'aeksaar-logo.png' },
            { name: 'Landesärztekammer Brandenburg',
              event: 'Kammerversammlungen',
              src:  'laekb-logo.png' },
            { name: 'Deutscher Hebammenverband',
              event: 'Bundesdelegiertentagung 2018',
              src:  'dhv-logo.png' },
            { name: 'Deutsche Pfadfinderschaft Sankt Georg (DPSG)',
              event: 'Bundesversammlungen',
              src:  'dpsg-logo.png' },
            { name: 'Bund der Pfadfinderinnen und Pfadfinder e.V.',
              event: 'Bundesversammlung',
              src:  'bdp-logo.png' },
            { name: 'Bund der Deutschen Katholischen Jugend',
              event: 'Diözesanversammlung Diözesanverband Osnabrück',
              src:  'bdkj-os-logo.png' },
            { name: 'Evangelische StudentInnengemeinde in der Bundesrepublik Deutschland (ESG)',
              event: 'Bundesversammlungen',
              src:  'esg-logo.png' },
            { name: 'Arbeitsgemeinschaft der Evangelischen Jugend in Deutschland e. V. (aej)',
              event: 'Mitgliederversammlung',
              src:  'aej-logo.png' },
            { name: 'Stipendiatinnen und Stipendiaten des Cusanuswerks',
              event: 'Cusanerkonferenz, Vollversammlung',
              src:  'cusaner-logo.png' },
            { name: 'AStA der Universität des Saarlandes',
              event: 'Studierendenparlament',
              src:  'asta-uni-saarland-logo.png' },
            { name: 'Opennet Initiative e.V.',
              event: 'Jahresversammlung',
              src:  'opennet-logo.png' },
            { name: 'Mensa in Deutschland e.V.',
              event: 'Mitgliederversammlungen',
              src:  'mensa-logo.png' },
            { name: 'Berufsverband der Kinder- und Jugendärzte e.V.',
              event: 'Delegiertenversammlungen',
              src:  'bvkj-logo.png' },
            { name: 'Deutscher Verband für Neuro-Linguistisches Programmieren e.V.',
              event: 'Mitgliederversammlungen',
              src:  'dvnlp-logo.png' },
            { name: 'Junge Europäische Föderalisten Deutschland e.V.',
              event: 'Bundeskongress',
              src:  'jef-logo.png' },
            { name: 'Evangelischer Kirchenkreis Krefeld-Viersen',
              event: 'Kreissynoden',
              src:  'ev-kirche-krefeld-viersen-logo.png' },
            { name: 'innovate!',
              event: 'innovate!Award-Preisverleihung (mit elektronischer Abstimmung) am 7.11.2013',
              src:  'innovate2013-logo.png' },
            { name: 'Gemeinde Neu Wulmstorf',
              event: 'Gemeinderat',
              src:  'neu-wulmstorf-logo.png' },
        ];
        $scope.logos = $scope.logos_parteien.concat($scope.logos_gewerkschaften, $scope.logos_misc);
        $scope.logos.sort(function() { return 0.5 - Math.random() });
        $scope.maxpage = Math.ceil($scope.logos.length / $scope.numberPerPage) - 1;

        $scope.moveLeft = function () {
            if ($scope.page > 0) {
                $scope.page--;
            } else {
                $scope.page = $scope.maxpage;
            }
        };
        $scope.moveRight = function () {
            var nextLogoIndex = ($scope.page + 1) * $scope.numberPerPage + 1;
            if (nextLogoIndex <= $scope.logos.length) {
                $scope.page++;
            } else {
                $scope.page = 0;
            };
        };
    }
])

.controller('DownloadCtrl', [
    '$scope',
    function ($scope) {
        $scope.stableVersion = '2.3';
        $scope.stableDate = '2018-09-20';
        //$scope.betaVersion = '2.3b1';
        //$scope.betaDate = '2018-08-30';
    }
])

.controller('PluginCtrl', [
    '$scope',
    'gettext',
    function ($scope, gettext) {
        $scope.plugins = [
            { name: 'Voting Plugin',
              desc: gettext('Provides electronic voting for motions and elections in OpenSlides.'),
              url:  'https://github.com/OpenSlides/openslides-votecollector',
              tags: ['2.3']
            },
            { name: 'Protocol Plugin',
              desc: gettext('Provides protocolling of agenda items in OpenSlides.'),
              url:  'https://github.com/OpenSlides/openslides-protocol',
              tags: ['2.3']
            },
            { name: 'OpenSlides Presenter',
              desc: gettext('Provides presenter view and clicker support for pdf presentations.'),
              url:  'https://github.com/OpenSlides/openslides-presenter',
              tags: ['2.3']
            },
            { name: 'OpenSlides SAML',
              desc: gettext('Provides a login via a SAML single sign on service.'),
              url:  'https://github.com/OpenSlides/openslides-saml',
              tags: ['2.3']
            },
            { name: 'OpenSlides Conversations (Beta)',
              desc: gettext('Supports audio and video conferences using WebRTC.'),
              url:  'https://github.com/OpenSlides/openslides-conversations',
              tags: ['2.2']
            },
            { name: 'CSV Export Plugin',
              desc: gettext('Provides a CSV export of the lists of speakers. It is also useful as an example how to write plugins for OpenSlides.'),
              url:  'https://github.com/OpenSlides/openslides-csv-export',
              tags: ['2.3']
            }
        ];
    }
])

