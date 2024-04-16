import { USERS } from './users'

export const POSTS = [
    {
        id: 1,
        imageUrl: "https://i.ibb.co/7CQVJNm/1.jpg",
        user: USERS[0].user,
        likes: 3500,
        // generate a really long caption
        //caption: "hey there! this is a really long caption for image 1. I hope you like it. I'm just trying to make it as long as possible so that it looks good on the screen. I hope you like it. I'm just trying to make it as long as possible so that it looks good on the screen. I hope you like it. I'm just trying to make it as long as possible so that it looks good on the screen. I hope you like it. I'm just trying to make it as long as possible so that it looks good on the screen. I hope you like it. I'm just trying to make it as long as possible so that it looks good on the screen. I hope you like it. I'm just trying to make it as long as possible so that it looks good on the screen. I hope you like it. I'm just trying to make it as long as possible so that it looks good on the screen. I hope you like it. I'm just trying to make it as long as possible so that it looks good on the screen.",
        caption: "This is a caption for image 1",
        profile_picture: USERS[0].imageUri,
        comments: [
            {
                user: "User2",
                comment: "Nice post!",
            },
            {
                user: "User3",
                comment: "I agree with User2",
            },
        ],
    },
    {
        id: 2,
        imageUrl: "https://i.ibb.co/7CQVJNm/2.jpg",
        user: USERS[1].user,
        likes: 7870,
        caption: "This is a caption for image 2",
        profile_picture: USERS[1].imageUri,
        comments: [
            {
                user: "User5",
                comment: "Great post!",
            },
            {
                user: "User6",
                comment: "I agree with User5",
            },
        ],
    },
    // Add more posts as needed
];