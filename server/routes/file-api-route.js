'use strict';

import {fileController} from '../controllers';


module.exports = (app) => {

	app.route('/api/cropVideo')
		.post( fileController.cropVideo)


};
