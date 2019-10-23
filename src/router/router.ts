import { Router, Request, Response } from 'express';
import MySQL from '../mysql/mysql';


const router = Router();


router.get('/heroes', (req: Request, resp:Response) => {

    const query = `
        SELECT *
        FROM heroes`;

    MySQL.ejecutarQuery( query, (err:any, heroes:Object[]) => {

        if(err){
            resp.status(400).json({
                ok:false,
                error:err
            });
        }else{
            resp.json({
                ok:true,
                heroes: heroes
            })
        }

    });

});

router.get('/heroes/:id', (req: Request, resp:Response) => {

    const id = req.params.id;

    const escapeId = MySQL.instance.connection.escape( id );

    const query = `
        SELECT *
        FROM heroes
        where id = ${ escapeId }`;

    MySQL.ejecutarQuery( query, (err:any, heroe:Object[]) => {

        if(err){
            resp.status(400).json({
                ok:false,
                error:err
            });
        }else{
            resp.json({
                ok:true,
                heroe: heroe[0]
            })
        }

    });

});

export default router;


