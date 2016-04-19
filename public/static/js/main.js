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
            // press news
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
                    { code: 'pt', name: 'Português' },
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
    'gettextCatalog',
    'Languages',
    function($rootScope, $state, gettextCatalog, Languages) {
        // set detected browser language as default language (fallback: 'en')
        Languages.setCurrentLanguage(Languages.getBrowserLanguage());

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
    'Languages',
    'filterFilter',
    function ($scope, Languages, filterFilter) {
        // get all available languages
        $scope.languages = Languages.getLanguages();
        // get detected browser language code
        $scope.selectedLangCode = filterFilter($scope.languages, {selected: true})[0].code;
        // controller to switch app language
        $scope.switchLanguage = function (lang) {
            $scope.languages = Languages.setCurrentLanguage(lang);
            $scope.selectedLangCode = filterFilter($scope.languages, {selected: true})[0].code;
        };
    }
])

.controller('ReferenceCtrl', [
    '$scope',
    function ($scope) {
        $scope.page = 0;
        $scope.numberPerPage = 5;
        $scope.logos = [
            { name: 'SPD',
              event: 'Landes-AK "Digitale Gesellschaft"',
              src:  'spd-logo.png' },
            { name: 'BÜNDNIS 90/DIE GRÜNEN',
              event: 'Landesparteitage Hamburg / Hessen',
              src:  'gruene-logo.png' },
            { name: 'Grüne Jugend',
              event: 'Bundeskongress',
              src:  'gruene-jugend-logo.png' },
            { name: 'Sächsische Landesärztekammer',
              event: 'Kammerversammlung',
              src:  'slaek-logo.png' },
            { name: 'Landesärztekammer Hessen',
              event: 'Delegiertenversammlung',
              src:  'laekh-logo.png' },
            { name: 'Piratenpartei Deutschland / Schweiz',
              event: 'Bundes-, Landes- und Kreisparteitage',
              src:  'piraten-logo.png' },
            { name: 'Piraten ohne Grenzen',
              event: 'Piratenversammlung',
              src:  'pog-logo.png' },
            { name: 'Junge Generation in der SPÖ Wien',
              event: 'Landeskonferenz',
              src:  'jgspoe-logo.png' },
            { name: 'innovate!',
              event: 'innovate!Award-Preisverleihung (mit elektronischer Abstimmung) am 7.11.2013',
              src:  'innovate2013-logo.png' },
            { name: 'Evangelische StudentInnengemeinde in der Bundesrepublik Deutschland (ESG)',
              event: 'Bundesversammlung',
              src:  'esg-logo.png' },
            { name: 'Arbeitsgemeinschaft der Evangelischen Jugend in Deutschland e. V. (aej)',
              event: 'Mitgliederversammlung',
              src:  'aej-logo.png' },
            { name: 'Opennet Initiative e.V.',
              event: 'Jahresversammlung',
              src:  'opennet-logo.png' },
            { name: 'Studierende Cusanerinnen und Cusaner',
              event: 'Cusanerkonferenz, Vollversammlung',
              src:  'cusaner-logo.png' },
            { name: 'AStA der Universität des Saarlandes',
              event: 'Studierendenparlament',
              src:  'asta-uni-saarland-logo.png' },
            { name: 'Evangelischer Kirchenkreis Krefeld-Viersen',
              event: 'Kreissynode',
              src:  'ev-kirche-krefeld-viersen-logo.png' },
        ];
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
            if (nextLogoIndex < $scope.logos.length) {
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
        $scope.stableVersion = '2.0';
        $scope.stableDate = '2016-04-18';
        //$scope.betaVersion = '2.0b5';
        //$scope.betaDate = '2016-03-21';
    }
])

.controller('PluginCtrl', [
    '$scope',
    'gettext',
    function ($scope, gettext) {
        $scope.plugins = [
            { name: 'Export Plugin',
              desc: gettext('Exports OpenSlides data in several formats (e.g. ODT, HTML, CSV).'),
              url:  'https://github.com/OpenSlides/openslides-export',
              tags: ['1.7']
            },
            { name: 'VoteCollector Plugin',
              desc: gettext('Connects OpenSlides with the electronic voting system VoteCollector.'),
              url:  'https://github.com/OpenSlides/openslides-votecollector',
              tags: ['1.7']
            },
            { name: 'Protocol Plugin (Beta)',
              desc: gettext('Provides protocolling of agenda items in OpenSlides.'),
              url:  'https://github.com/OpenSlides/openslides-protocol',
              tags: ['1.7']
            }
        ];
    }
])

