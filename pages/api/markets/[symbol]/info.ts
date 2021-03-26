import {NextApiRequest, NextApiResponse} from "next";
import mockResults from '../../../../mocks/companyInfo.json'

export default async (req: NextApiRequest, res: NextApiResponse) => {

    const {symbol} = req.query
    return res.status(200).json({data: {info: mockResults}})
}
