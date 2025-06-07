import { Application } from 'express';
import blogRoutes from './blog.route';
import solutionRoutes from './solution.route';
import consultationRoutes from './consultation.route';
import serviceRoutes from './service.route';
import userRoutes from './user.route';

const setupRoutes = (app: Application): void => {
  app.use('/api/user', userRoutes);
  app.use('/api/blog', blogRoutes);
  app.use('/api/solution', solutionRoutes);
  app.use('/api/consultation', consultationRoutes);
  app.use('/api/service', serviceRoutes);
};

export default setupRoutes;