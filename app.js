const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const expressJSDocSwagger = require('express-jsdoc-swagger');

const options = {
  info: {
    version: '1.0.0',
    title: 'SPOT_Agency_API',
    description:'SPOT Agency Backend',
    license: {
      name: 'MIT',
    },
  },
 /* security: {
    BasicAuth: {
      type: 'http',
      scheme: 'basic',
    },
  },*/
  // Base directory which we use to locate your JSDOC files
  baseDir: __dirname,
  // Glob pattern to find your jsdoc files (multiple patterns can be added in an array)
  filesPattern: ['./routes/auth.routes.js','./routes/question.routes.js','./routes/scripts.routes.js','./routes/user.routes.js'],
  // URL where SwaggerUI will be rendered
  swaggerUIPath: '/api-docs',
  // Expose OpenAPI UI
  exposeSwaggerUI: true,
  // Expose Open API JSON Docs documentation in `apiDocsPath` path.
  exposeApiDocs: true,
  // Open API JSON Docs endpoint.
  apiDocsPath: '/v3/api-docs',
  // Set non-required fields as nullable by default
  notRequiredAsNullable: false,
  // You can customize your UI options.
  // you can extend swagger-ui-express config. You can checkout an example of this
  // in the `example/configuration/swaggerOptions.js`
  swaggerUiOptions: {},
  // multiple option in case you want more that one instance
  multiple: true,
};

const app = express();
const APP_PORT = 8001;
expressJSDocSwagger(app)(options);


//middlewares

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());



//db connection
require('./config/db.config');

//aws connections
require('./aws_s3_connections.js');

//routes

//a dummy route for testing. [remove this later]
/**
 * GET /ping
 * @summary A dummy route for testing.
 * @return {object} 200 - success response
 */
app.get('/ping', (req, res)=> {
    return res.json({"msg":"hello from captain Storm"});
});

require('./routes/admin.routes')(app);
require('./routes/scripts.routes')(app);
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);
require('./routes/agent.routes')(app);


//restrict this endpoint to be used by admins only.
require('./routes/question.routes')(app);


//start application
app.listen(APP_PORT, ()=> {
   console.log('starting SPOT agency backend on port', APP_PORT); 
});