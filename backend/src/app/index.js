const  express =require("express")
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const userRoutes = require('./routes/UsersRoutes.js')
const tasksRoutes = require('./routes/TasksRoutes.js')
var cors = require('cors');
dotenv.config()
const app = express();
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use("/tasks", tasksRoutes);

app.use("/users", userRoutes);

app.listen(8080, () => console.log("On Aplication"))
