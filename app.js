const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const expressJSDocSwagger = require("express-jsdoc-swagger");
const multer = require("multer");

const options = {
	info: {
		version: "1.0.0",
		title: "SPOT_Agency_API",
		description: "SPOT Agency Backend",
		license: {
			name: "MIT",
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
	filesPattern: [
		"./routes/auth.routes.js",
		"./routes/question.routes.js",
		"./routes/scripts.routes.js",
		"./routes/user.routes.js",
		"./routes/media.routes.js",
	],
	// URL where SwaggerUI will be rendered
	swaggerUIPath: "/api-docs",
	// Expose OpenAPI UI
	exposeSwaggerUI: true,
	// Expose Open API JSON Docs documentation in `apiDocsPath` path.
	exposeApiDocs: true,
	// Open API JSON Docs endpoint.
	apiDocsPath: "/v3/api-docs",
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
const APP_PORT = process.env.PORT || 8080;
expressJSDocSwagger(app)(options);

//middlewares

app.use(
	cors({
		origin: "*",
		methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
		allowedHeaders: ["x-access-token", "Content-Type", "Authorization"],
	})
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// app.use((req, res, next) => {
// 	res.header("Access-Control-Allow-Origin", "*");
// 	res.header(
// 		"Access-Control-Allow-Headers",
// 		"Origin, X-Requested-With, Content-Type, Accept, Authorization"
// 	);
// 	if (req.method === "OPTIONS") {
// 		res.header(
// 			"Access-Control-Allow-Methods",
// 			"GET, POST, PUT, PATCH, DELETE"
// 		);
// 		return res.status(200).json({});
// 	}
// 	next();
// });

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
// app.use(
// 	cors({
// 		allowedHeaders: ["x-access-token", "Content-Type", "Authorization"],
// 	})
// );

//db connection
require("./config/db.config");

//aws connections
require("./aws_s3_connections.js");

//routes

//a dummy route for testing. [remove this later]
/**
 * GET /ping
 * @summary A dummy route for testing.
 * @return {object} 200 - success response
 */
app.get("/api/ping", (req, res) => {
	return res.json({ message: "a new hello from captain storm." });
});

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

require("./routes/admin.routes")(app);
require("./routes/scripts.routes")(app);
require("./routes/auth.routes")(app);
require("./routes/user.routes")(app);
require("./routes/agent.routes")(app);
require("./routes/media.routes")(app, upload);

//restrict this endpoint to be used by admins only.
require("./routes/question.routes")(app);

//start application
app.listen(APP_PORT, () => {
	console.log("starting SPOT agency backend on port", APP_PORT);
});
