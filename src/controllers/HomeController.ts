import { Request, Response } from 'express';
import {User} from '../models/User'
import { Product } from '../models/Product';
import { Op } from 'sequelize';

export const home = async (req: Request, res: Response)=>{
    let results = await User.findAll({where: {id:5}})
    if(results.length >0){
        let user = results[0]

        user.name = 'Rocky'
        user.age++
        await user.save()
    }

    let users = await User.findAll();
    let age: number = 90;
    let showOld: boolean = false;

    if(age > 50) {
        showOld = true;
    }

    let list = Product.getAll();
    let expensiveList = Product.getFromPriceAfter(12);

    res.render('pages/home', {
        name: 'Bonieky',
        lastName: 'Lacerda',
        showOld,
        products: list,
        expensives: expensiveList,
        frasesDoDia: [],
        users
    });
}
export const novoUsuario = async (req: Request, res: Response) => {
    let { name, age } = req.body;

    if(name) {
        const newUser = User.build({ name });

        if(age) {
            newUser.age = parseInt(age);
        }

        await newUser.save();
    }

    res.redirect('/');
}