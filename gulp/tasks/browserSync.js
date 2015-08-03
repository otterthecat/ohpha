var browserSync = require('browser-sync');
var bSyncOptions = require('../config/options').browserSync;

module.exports = function () {
	'use strict';
	return browserSync({
				proxy: bSyncOptions.proxy
			});
};
