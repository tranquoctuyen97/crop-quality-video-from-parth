'use strict';
import ffmpeg from'fluent-ffmpeg';
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;

export default class FileHelper {

    async cropVideo (filePath, quality, output) {
        try {
            ffmpeg.setFfmpegPath(ffmpegPath);
            const proc = ffmpeg(filePath);
            // set video bitrate
            proc.videoBitrate(quality)
            // set target codec
            // .videoCodec('divx')
            // set aspect ratio
                .aspect('16:9')
                // set size in percent
                .size('50%')
                // set fps
                .fps(24)
                // set audio bitrate
                .audioBitrate('128k')
                // set audio codec
                .audioCodec('libmp3lame')
                // set number of audio channels
                .audioChannels(2)
                // set custom option
                .addOption('-vtag', 'DIVX')
                // set output format to force
                .format('avi')
                // setup event handlers
                .on('end', function() {
                    console.log('file has been converted succesfully');
                    return true;
                })
                .on('error', function(err) {
                    console.log('an error happened: ' + err.message);
                    return false;
                })
                // save to file
                .save(output);
        } catch (error) {
            
        }
    };

     

}