import express from 'express'
import 'express-async-errors'
import path from 'path';
import { initialize } from './util/database';

// Controller
import Members from './model/Members';
// Routes
import memberRoute from './routes/members.routes';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//home route
app.get('/', async (req, res) => {
    const members = await Members.find({})

    console.log({ members })
    
    res.render('index', {title: 'Member Manager', members})
});

//members routes
app.use('/api/members', memberRoute);

// common error handler
app.use((error, req, res, next) => {
    if (error.status) {
        res.status(error.status)
        res.json({ error: error.message })
        return
    }

    next(error)
})

app.listen(3000, async () => {
    console.log(`Server is running on port 3000`)
    const dbInstance = await initialize()

    if (!dbInstance) {
        console.error('Failed to initialize MongoDB')
        return process.exit(1)
    }

    console.log('MongoDB Ready')
});


