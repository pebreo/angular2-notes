
INSTALLED_APPS = (
    #...
    'webpack_loader',
)

WEBPACK_LOADER = {
    'DEFAULT': {
        'BUNDLE_DIR_NAME': 'bundle/NAME/js/',
        'STATS_FILE': os.path.join(BASE_DIR, 'webpack-stats-NAME.json'),
    },
    'PACMAN': {
        'BUNDLE_DIR_NAME': 'bundle/PACMAN/js/',
        'STATS_FILE': os.path.join(BASE_DIR, 'webpack-stats-pacman.json'),
    }
}

"""
index.html


{% render_bundle 'main' 'js' 'DEFAULT' %}

{% render_bundle 'main' 'css' 'DEFAULT' %}


{% render_bundle 'main' 'js' 'PACMAN' %}

"""