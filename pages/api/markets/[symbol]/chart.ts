import {NextApiRequest, NextApiResponse} from "next";
import mockResults from '../../../../mocks/companyChart.json'

export default (req: NextApiRequest, res: NextApiResponse) => {

    const {symbol} = req.query

    return res.status(200).json({data: {chart: mockResults}})
}
