'use strict';
import ffmpeg from'fluent-ffmpeg';
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;

export default class FileHelper {

    async cropVideo (filePath) {
        try {
            const videoInfo = await this.getVideoInfo(filePath);
            if (videoInfo.size <= 720) {
                return false;
            }
            await this.genQuality(filePath, videoInfo.name);
            return true;
        } catch (error) {
            return false;
        }
    };
    getVideoInfo (filePath) {
        ffmpeg.setFfmpegPath(ffmpegPath);
        return new Promise((resolve, reject) => { 
            ffmpeg.ffprobe(filePath, function(err, metadata) {
                if (err) {
                     reject(err);
                } else {
                    resolve({
                        size: metadata.streams[0].height,
                        name: metadata.streams[0].width + 'x'+ metadata.streams[0].height + '_' + metadata.format.size +'kb' +'_720.mp4'
                    });   
                }
            });

        });
    };
    genQuality (filePath, output) {
        ffmpeg.setFfmpegPath(ffmpegPath);
        const proc = ffmpeg(filePath);
        return new Promise((resolve, reject) => { 
            ffmpeg(filePath)
                // set size in percent
                .size('1280x720')
                // set fps
                // .fps(24)
                // // set audio bitrate
                // .audioBitrate('128k')
                // // // set audio codec
                // .audioCodec('libmp3lame')
                // // set number of audio channels
                // .audioChannels(2)
                // // set custom option
                // .addOption('-vtag', 'DIVX')
                // // set output format to force
                // .format('avi')
                // setup event handlers

            .on('end', function() {
                console.log('file has been converted successfully');
                 resolve(true);
            })
            .on('error', function(err) {
                console.log(err);
                 reject(err);
            })
            .save(output);
        });
    }


     

}