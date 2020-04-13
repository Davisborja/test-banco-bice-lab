const express=require('express');
const router=express.Router();

const Task=require('../models/task');

/**
 * @swagger
 * /api/track:
 *  get:
 *    description: obtener el tracking
 *    responses:
 *      '200':
 *        description: respuesta correcta
 */
router.get('/track', async (req, res) =>{
   const tasks = await Task.find();
   console.log(tasks);
   res.json(tasks);
});

/**
 * @swagger
 * /api/addTrack:
 *  post:
 *    description: agregar nuevo track
 *    parameters:
 *       - in: body
 *         name: title
 *         description: Titulo de la tarea ejecutada.
 *         schema:
 *              type: object
 *              required:
 *                  - title
 *                  - description
 *              properties:
 *                  title:
 *                      type: string
 *                  description:
 *                      type: string
 *    responses:
 *      '200':
 *        description: respuesta correcta
 */
router.post ('/addTrack', async (req, res)=>{
    const {title, description} = req.body;
    const task=new Task ({title,description});
    await task.save();
    res.json({status: 'Task saved'});
});

module.exports=router;