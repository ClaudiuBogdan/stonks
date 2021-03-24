// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import {NextApiRequest, NextApiResponse} from "next";

type Data = {
    data: any
}

export default (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const {q} = req.query
    if (!q || q.length < 2) {
        return res.status(200).json({data: {}})
    }
    return res.status(200).json({data: {name: 'John Doe'}})
}
