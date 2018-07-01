import { Router } from 'express';

const scoreRoute = Router();

scoreRoute.get('/scores');
scoreRoute.post('/scores');
scoreRoute.get('/scores/:id');
scoreRoute.put('/scores/:id');
scoreRoute.delete('/scores/:id');

export default scoreRoute;
