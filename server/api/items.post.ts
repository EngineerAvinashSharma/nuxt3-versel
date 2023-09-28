import { Iitem } from '~/types/item';
import prisma from '../dbConnection'
import { IResponse } from '~/types/response';
import { H3Event } from 'h3';
import Joi from 'joi';

export default defineEventHandler(async (event: H3Event) => {
    try {
        const body: Iitem = await readBody(event);
        
        let itemSchema = Joi.object({
            name: Joi.string().required(),
            description: Joi.string().required(),
            price: Joi.number().required()
        })

        let { error, value } = await itemSchema.validateAsync(body)

        if (error) {
            throw createError({
                statusCode: 400,
                statusMessage: error,
            })
        }

        const newItem: Iitem = await prisma.item.create({
            data: {
                name: body.name,
                description: body.description,
                price: body.price
            }
        });

        if (!newItem.id) {
            throw createError({
                statusCode: 400,
                statusMessage: 'Item Not Added',
            })
        }

        setResponseStatus(event, 200);

        let responseToSend: IResponse = {
            data: newItem,
            message: 'Product Succesfully Added'
        }

        return responseToSend;

    } catch (err: any) {
        throw createError({
            statusCode: 400,
            statusMessage: err
        })
    }
})