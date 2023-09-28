import { IGETQuery, IPagination } from '~/types/request';
import prisma from '../dbConnection'
import { H3Event } from 'h3';
import { Iitem } from '~/types/item';
import { IResponse } from '~/types/response';
import Joi from 'joi'


export default defineEventHandler(async (event: H3Event): Promise<IResponse> => {

    try {
        const query: IGETQuery = getQuery(event)

        let itemFindSchema = Joi.object({
            id: Joi.number().optional(),
            pageNo: Joi.number().optional(),
            limit: Joi.number().optional()
        })

        let { error, value } = await itemFindSchema.validateAsync(query);

        if (error) {
            throw createError({
                statusCode: 400,
                statusMessage: error.message
            })
        }

        if (query.id) {

            const item: Iitem | null = await prisma.item.findFirst({
                where: { id: Number(query.id) }
            });

            setResponseStatus(event, 200);

            let responseToSend: IResponse = { data: item || null }

            return responseToSend
        }

        let options: IPagination = {}

        if (query.pageNo && query.limit) {

            options.skip = (query.pageNo - 1) * query?.limit;
            options.take = Number(query?.limit);
        }

        const items: Iitem[] = await prisma.item.findMany({
            ...options
        });

        setResponseStatus(event, 200);

        let responseToSend: IResponse = { data: items, count: items.length }

        return responseToSend;

    } catch (err: any) {
        throw createError({
            statusCode: 400,
            statusMessage: err.message
        })
    }

})