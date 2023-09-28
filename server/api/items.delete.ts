
import { H3Event } from 'h3';
import prisma from '../dbConnection';
import { IResponse } from '~/types/response';
import { IGETQuery } from '~/types/request';

export default defineEventHandler(async (event: H3Event): Promise<IResponse> => {
    try {

        const query: IGETQuery = getQuery(event);

        let item = await prisma.item.findFirst({
            where: { id: Number(query.id) },
        });

        if (!item) {
            throw createError({
                statusCode: 400,
                statusMessage: 'Item Not Found'
            })
        }

        await prisma.item.delete({
            where: { id: Number(query.id) },
        });

        setResponseStatus(event, 200);

        let responseToSend: IResponse = {
            message: 'Product Succesfully Deleted'
        }

        return responseToSend;

    } catch (err: any) {
        throw createError({
            statusCode: 400,
            statusMessage: err.message
        })
    }
})