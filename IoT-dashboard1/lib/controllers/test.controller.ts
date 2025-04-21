import { Router } from 'express';

class TestController {
   public router = Router();

   constructor() {
       this.initializeRoutes();
   }

   private initializeRoutes() {
       this.router.get('/test', this.handleTestRequest);
   }

   private handleTestRequest = (req: any, res: any) => {
       res.send('This is a test endpoint');
   }
}

export default TestController;
