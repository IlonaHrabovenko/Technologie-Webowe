import Controller from '../interfaces/controller.interface';
import { Request, Response, NextFunction, Router } from 'express';

// Testowa tablica z przykładowymi wartościami
let testArr = [4, 5, 6, 3, 5, 3, 7, 5, 13, 5, 6, 4, 3, 6, 3, 6];

class DataController implements Controller {
  public path = '/api/data';
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/latest`, this.getLatestReadingsFromAllDevices);
    this.router.get(`${this.path}/:id`, this.getDataById);
    this.router.get(`${this.path}/:id/latest`, this.getLatestValueById);
    this.router.get(`${this.path}/:id/:num`, this.getMultipleFromId);
    this.router.delete(`${this.path}/all`, this.deleteAll);
    this.router.delete(`${this.path}/:id`, this.deleteById);
    this.router.post(`${this.path}/:id`, this.addData);
  }

  private getLatestReadingsFromAllDevices = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    res.status(200).json(testArr);
  };

  private getDataById = (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    if (isNaN(id) || id < 0 || id >= testArr.length) {
      return res.status(404).json({ message: 'Nie znaleziono elementu o podanym id' });
    }
    res.status(200).json(testArr[id]);
  };

  private getLatestValueById = (req: Request, res: Response) => {
    const max = Math.max(...testArr);
    res.status(200).json(max);
  };

  private getMultipleFromId = (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const num = parseInt(req.params.num);

    if (isNaN(id) || isNaN(num) || id < 0 || num <= 0) {
      return res.status(400).json({ message: 'Nieprawidłowe parametry' });
    }

    const sliced = testArr.slice(id, id + num);
    res.status(200).json(sliced);
  };

  private deleteAll = (req: Request, res: Response) => {
    testArr = [];
    res.status(200).json({ message: 'Wszystkie dane zostały usunięte' });
  };

  private deleteById = (req: Request, res: Response) => {
    const id = parseInt(req.params.id);

    if (isNaN(id) || id < 0 || id >= testArr.length) {
      return res.status(404).json({ message: 'Nie znaleziono elementu do usunięcia' });
    }

    testArr.splice(id, 1);
    res.status(200).json({ message: `Usunięto element o indeksie ${id}`, data: testArr });
  };

  private addData = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { elem } = req.body;

    if (typeof elem !== 'number') {
      return res.status(400).json({ message: 'Brak lub nieprawidłowa wartość "elem"' });
    }

    testArr.push(elem);
    res.status(201).json(testArr);
  };
}

export default DataController;
