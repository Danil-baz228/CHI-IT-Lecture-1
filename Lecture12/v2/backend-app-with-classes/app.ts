import 'reflect-metadata';
import { createExpressServer } from 'routing-controllers';
import { UserController } from './UserController';

const app = createExpressServer({
    controllers: [UserController],
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
