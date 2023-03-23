# dev mode
- change OAUTH_HH_REDIRECT_URL=http://localhost:4000/auth
- change /frontend/src/utils/api.js - const URL = `http://localhost:4000`;
# use command:
- docker-compose -f docker-compose-dev.yml up -d

# prod mode
- change OAUTH_HH_REDIRECT_URL=http://45.84.224.70:4000/auth
- change /frontend/src/utils/api.js - const URL = `http://45.84.224.70:4000`;
# use command:
- docker-compose -f docker-compose.yml up -d --build