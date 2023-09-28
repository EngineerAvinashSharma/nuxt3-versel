import Joi from "joi";
import { Iitem } from "~/types/item";
import prisma from "../dbConnection";
import { IResponse } from "~/types/response";

export default defineEventHandler(async (event) => {
    try {
        const body: Iitem = await readBody(event);

        let itemSchema = Joi.object({
            id: Joi.number().required(),
            name: Joi.string().optional(),
            description: Joi.string().optional(),
            price: Joi.number().optional()
        })

        let { error, value } = await itemSchema.validateAsync(body)

        if (error) {
            throw createError({
                statusCode: 400,
                statusMessage: error,
            })
        }

        body.updated_at = new Date();

        const updated: Iitem = await prisma.item.update({
            where: { id: body.id },
            data: body
        });

        if (!updated) {
            throw createError({
                statusCode: 400,
                statusMessage: 'Item Not Updated',
            })
        }

        setResponseStatus(event, 200);

        let responseToSend: IResponse = {
            message: 'Product Succesfully Updated'
        }

        return responseToSend;

    } catch (err: any) {
        throw createError({
            statusCode: 400,
            statusMessage: err
        })
    }
})