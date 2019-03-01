'use strict';

import { response, fileHelper } from '../helpers';
import fs from 'fs';


export default class FileController {

    cropVideo = async (req, res, next) => {
       try {
           const { filePath, quality = 480, ouput } = req.body;
           if(!Number.isInteger(quality)) {
               return response.returnError(res, new Error('quality is invalid !'));
           }
           if (!filePath) {
              return response.returnError(res, new Error('filePath is not exist !'));
           }
           if (!fs.existsSync(filePath)) {
               return response.returnError(res, new Error('File is not exist !'));
           }
           const isCropVideo = fileHelper.cropVideo(filePath, quality, ouput);
           if(!isCropVideo) {
               return response.returnError(res, new Error('Error Crop Video !'))
           }
           return response.returnSuccess(res, 'Crop video done !' );

       } catch (error) {
           return response.returnError(res, error);
       }
    };

}