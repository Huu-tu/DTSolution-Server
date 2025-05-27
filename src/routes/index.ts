import { Application } from 'express';
import blogRoutes from './blog.route';

const setupRoutes = (app: Application): void => {
  app.use('/api/blogs', blogRoutes);
};

export default setupRoutes;