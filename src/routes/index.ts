import { Application } from 'express';
import blogRoutes from './blog.route';
import solutionRoutes from './solution.route';

const setupRoutes = (app: Application): void => {
  app.use('/api/blogs', blogRoutes);
  app.use('/api/solution', solutionRoutes);
};

export default setupRoutes;