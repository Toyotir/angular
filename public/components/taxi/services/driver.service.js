taxi
    .factory('Driver', function($resource) {
        return $resource(
            'http://localhost:8000/drivers/:id/',
            {},
            {
                'query': {
                    method: 'GET',
                    isArray: true,
                    headers: {
                        'Content-Type':'application/json'
                    }
                }
            },
            {
                stripTrailingSlashes: false
            }
        );
    });