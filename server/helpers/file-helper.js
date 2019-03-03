'use strict';
import ffmpeg from'fluent-ffmpeg';
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;

export default class FileHelper {

    async cropVideo (filePath) {
        try {
            const videoInfo = await this.getVideoInfor(filePath);
            if (videoInfo.size > 720) {
                await this.genQuality(filePath, videoInfo.name);
                return true;
            }
          } catch (error) {
              return false;
          }      
    };
    getVideoInfor (filePath) {
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
            const video = proc.videoBitrate(720)
            .on('end', function() {
                console.log('file has been converted succesfully');
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