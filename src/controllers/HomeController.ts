import { Request, Response } from 'express';
import {User} from '../models/User'
import { Product } from '../models/Product';
import { Op } from 'sequelize';

export const home = async (req: Request, res: Response)=>{
    await User.create({ name: 'Diego', age:12 });

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