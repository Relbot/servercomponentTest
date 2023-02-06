import { NextApiRequest, NextApiResponse } from "next";
import { CompareVideoInfoHl1, CompareVideoInfoHl2, DetailVideoInfo, VideoInfo } from "../../core/types";
import NextCors from "nextjs-cors";
var cache = require('memory-cache');


function randomIntFromInterval(min: number, max: number) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}

const getVideoList = async (channelId: string): Promise<{data: VideoInfo[] | null, error: unknown | null}> => {

  try {
    const result = await fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&maxResults=100&order=date&type=video&key=AIzaSyAnMuqtj-wrgQ7af51aB-czivANUujM8U4`)

    const data = (await result.json()).items as VideoInfo[]

    console.log(data);
    
    return {data, error: null}
  } catch (error) {
    console.log(error);
    return {data: null, error: null}
  }

}
  

const pickRandomVideo = async (videoId: string) => {
  try {
    const result = await fetch(`https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=AIzaSyAnMuqtj-wrgQ7af51aB-czivANUujM8U4&part=snippet,contentDetails,statistics,status`)

    const data = (await result.json()).items as any []

    if (data[0]) {
      return data[0] as DetailVideoInfo
    } else 
    {
      return null
    }

  } catch (error) {
    console.log("Error pickRandomVideo");

    console.log(error);
    return null
  }
}



export default async function Page(req: NextApiRequest, res: NextApiResponse) {

  await NextCors(req, res, {
    // Options
    methods: ['GET'],
    origin: '*',
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  });
  
    
    const channelId = req.query.channelId as string;
    const videoId = req.query.videoId as string;
    

    var videos: VideoInfo[] = [];

    const cachedResponse = cache.get(channelId);
    if (cachedResponse) {
        console.log("Cached Dateien");
      
        videos = cachedResponse //res.status(200).json(cachedResponse)
    } else {
        console.log("kein Cached Dateien");
        
        const hours = 2;


        const {data, error} = await getVideoList(channelId)


            
        if (!error && data) {
          cache.put(channelId, data, hours * 1000 * 60 * 60);
          videos = data
          res.status(200).json(data)
        } else {
            res.status(400).json({"Error": error})
        }
    }

    if (!videos || videos.length < 20) {
      console.log("sind wir hier rein?");
      
      res.status(400).json({"Error": "Kanal muss mehr als 20 Videos haben"})
      return
    }

    var randomNumber1: number = randomIntFromInterval(0, videos.length-1)

    console.log(randomNumber1);
    console.log("####");
    
    var randomNumber2: number

    if (videoId) {
      randomNumber1 = videos.findIndex((video) => { return video.id.videoId == videoId})
    }

    do {
      randomNumber2 = randomIntFromInterval(0, videos.length-1)
      console.log(randomNumber2);
    } while (randomNumber1 == randomNumber2)

    var videoInfo1 = await pickRandomVideo(videos[randomNumber1].id.videoId)
    cache.put(videos[randomNumber1].id.videoId, videoInfo1, 120);

    const videoInfo2 = await pickRandomVideo(videos[randomNumber2].id.videoId)
    cache.put(videos[randomNumber2].id.videoId, videoInfo2, 120);


    if (!videoInfo1 || !videoInfo2) {
      res.status(400).json({"Error": "Es ist ein Fehler aufgetreten"})
      return 
    }

    const compareVideoReturn: CompareVideoInfoHl2 = {
      video1: {
        videoId: videoInfo1.id,
        thumbnailURL: videoInfo1.snippet.thumbnails.high.url,
        title: videoInfo1.snippet.title,
        views: parseInt(videoInfo1.statistics.viewCount)
      },
      video2: {
        videoId: videoInfo2.id,
        thumbnailURL: videoInfo2.snippet.thumbnails.high.url,
        title: videoInfo2.snippet.title
      }
    }

    res.status(200).json(compareVideoReturn)
 
}