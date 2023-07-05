import { GetObjectCommand, type GetObjectCommandInput } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

import { env } from '~/src/config/env'
import { s3Client } from '~/src/helpers/aws'
import type { NextFunction, Request, Response } from 'express'

export const downloadFile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.query.filename) {
      return res.status(400).send({
        message: 'Filename is required'
      })
    }

    const getObjectParams: GetObjectCommandInput = {
      Bucket: env.BUCKETNAME,
      Key: req.query.filename as string
    }

    const cmd = new GetObjectCommand(getObjectParams)
    const signedUrl = await getSignedUrl(s3Client, cmd, {
      expiresIn: 60 * 15 // 15 minutes
    })

    return res.status(200).send({
      signedUrl
    })
  } catch (e) {
    console.log('🚀 ~ file: controller.ts:30 ~ downloadFile ~ e:', e)
    return next(e)
  }
}
