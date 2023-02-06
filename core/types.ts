

export type VideoInfo = {
    "kind": string,
    "etag": string
    "id": {
        "kind": string
        "videoId": string
    },
    "snippet": {
        "publishedAt": string
        "channelId": string
        "title": string
        "description": string
        "thumbnails": {
            "default": {
                "url": string
                "width": number,
                "height": number
            },
            "medium": {
                "url": string,
                "width": number,
                "height": number
            },
            "high": {
                "url": string,
                "width": number,
                "height": number
            }
        },
        "channelTitle": string,
        "liveBroadcastContent": string,
        "publishTime": number
    }
}

export type DetailVideoInfo = {
    
    "kind": string
    "etag": string
    "id": string
    "snippet": {
        "publishedAt": string
        "channelId": string
        "title": string
        "description": string
        "thumbnails": {
            "default": {
                "url": string
                "width": number
                "height": number
            },
            "medium": {
                "url": string
                "width": number
                "height": number
            },
            "high": {
                "url": string
                "width": number
                "height": number
            },
            "standard": {
                "url": string
                "width": number
                "height": number
            },
            "maxres": {
                "url": string
                "width": number
                "height": number
            }
        },
        "channelTitle": string
        "tags": string[]
        "categoryId": string
        "liveBroadcastContent": string
        "defaultAudioLanguage": string
    },
    "statistics": {
        "viewCount": string
        "likeCount": string
        "favoriteCount": string
        "commentCount": string
    }
    
}


export type CompareVideoInfoHl1 = {
    "video1": {
      "videoId": string
      "thumbnailURL": string
      "title": string
    }
    "video2": {
      "videoId": string
      "thumbnailURL": string
      "title": string
    }
}

export type CompareVideoInfoHl2 = {
    "video1": {
      "videoId": string
      "thumbnailURL": string
      "title": string
      "views": number
    }
    "video2": {
      "videoId": string
      "thumbnailURL": string
      "title": string
    }
}

export type CompareVideoResult = {
    "richtig": boolean,
    "video1": {
      "views": number
    },
    "video2": {
      "views": number
    }
}


export type UserType = {
    "id": string | null
}