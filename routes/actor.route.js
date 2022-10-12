import express from 'express';
import {logError, logInfo} from '../utils/log.js';

import actorModel from '../models/actor.model.js';

const router = express.Router();

router.get('/', async function (req, res) {
  try {
    const list = await actorModel.findAll();
    res.json(list);
    logInfo(req, res);

  } catch (error) {
    logError(error, req, res);
  }
})

router.get('/:id', async function (req, res) {
  
  try {
    const id = req.params.id || 0;
    const film = await actorModel.findById(id);
    if (film === null) {
      return res.status(204).end();
    }
    res.json(film);
    logInfo(req, res);

  } catch (error) {
    logError(error, req, res);
  }
})

router.post('/', async function (req, res) {
  
  try {
    let film = req.body;
    const ret = await actorModel.add(film);
    film = {
      film_id: ret[0],
      ...film
    }
    res.status(201).json(film);
    logInfo(req, res);

  } catch (error) {
    logError(error, req, res);
  }
})

router.delete('/:id', async function (req, res) {
  
  try {
    const id = req.params.id || 0;
    const n = await actorModel.del(id);
    res.json({
      affected: n
    });
    logInfo(req, res);

  } catch (error) {
    logError(error, req, res);
  }
})

router.patch('/:id', async function (req, res) {
  try {
    const id = req.params.id || 0;
    const film = req.body;
    const n = await actorModel.patch(id, film);
    res.json({
      affected: n
    });
    logInfo(req, res);

  } catch (error) {
    logError(error, req, res);
  }
})

export default router;