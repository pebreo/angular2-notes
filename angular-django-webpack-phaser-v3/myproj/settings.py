
INSTALLED_APPS = (
    #...
    'webpack_loader',
)

STATICFILES_DIRS = [
    os.path.join(BASE_DIR, "static"),
]

WEBPACK_LOADER = {
    'DEFAULT': {
        'BUNDLE_DIR_NAME': 'bundle/blah/js/',
        'STATS_FILE': os.path.join(BASE_DIR, 'webpack-stats-blah.json'),
    },
    'NAME': {
        'BUNDLE_DIR_NAME': 'bundle/NAME/js/',
        'STATS_FILE': os.path.join(BASE_DIR, 'webpack-stats-NAME.json'),
    }
}

"""
index.html


{% render_bundle 'main' 'js' 'DEFAULT' %}

{% render_bundle 'main' 'css' 'DEFAULT' %}


{% render_bundle 'main' 'js' 'NAME' %}

"""