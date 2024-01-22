
const normalGifs = [
    "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExam1oazc3aDY0cTdiYjRpcG1mYWJqaml0cWtpdWMxc2R2amVwZnVvOCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/gCANwADwdazG8/giphy.gif",
    "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExcmE4cjE5N2hqNnpwcTF5eXpxOWljZnp1cW93azUzdHNxdDlrcjVmcSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/37LZIKnmJyzQs/giphy.gif",
    "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExZXN0YndtbjI5Nm1rdW50NTc0ODlzMDgyNWdwaTd5aGhibW9nMnF1eiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/2UIcmK4pn7rYNLRboG/giphy.gif",
    "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExaXBkOWp4b3FtcTVhdXJrcTBpbDk3dnczeHFvcDdhZng2emdobXY4dSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/ZmZ5hwzX1dgQw/giphy.gif",
    "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExYmg3ZG5xcGcweXlmcW4wMWllODYwc2R5aDM5amhvZGFpbm1tcW9jZCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/plWaIDmYUN95K/giphy.gif",
    "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExOXhlcGl6anhvb2dyNjNxNzA4ZHZqNGl1czV3azV6cjQ2aTFidzk3aiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/PfhMsDmb7tHd6/giphy.gif",
    "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExMWhmamlmdDN3amk3bGg2M3loaXZ2OGtjMHB2dDcwcnloMGR2and5dSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/E0fzCBH4UfwvS/giphy.gif",
    "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExOXh6b20xdmNxdHJra2xid2YwYXZyanZ1ZTllOGM0NWs1bHcwejZscCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/14xP57Ybt4vidG/giphy.gif",
    "https://media.giphy.com/media/JVxMKcI1qUcRW/giphy.gif"
];

const hoverGifs = [
    "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExb3ViN2x6MWQ0bXJjdWI1MmgwNm5oaDdqN2V5MGhjc3I0ZjVpb284dSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/NyGba8cVIgScw/giphy.gif",
    "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExaXBkOWp4b3FtcTVhdXJrcTBpbDk3dnczeHFvcDdhZng2emdobXY4dSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/ZmZ5hwzX1dgQw/giphy.gif",
    "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExbmhvbzRpbW92YzgzM2s0c29qMmczaDRvMHRsY2kwOGUza2E4bWs4aSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/CQw94V8AMa556/giphy.gif",
    "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExMjV1ODRsbnRwcTIyZThteDdnYjc0MW1sNW50enl0bXA2aW9tNWVueiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/XW84K7p8gu20E/giphy.gif",
    "https://media1.tenor.com/m/imuHbBdjCYQAAAAC/big-hero6-hello.gif",
    "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExajB0ZDJ3ZHBhZzU3Yml4cTRzNXVveTYxYjFhbjJwb2U3dG45ZDJpMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/PCgGxkNdjVbs4/giphy.gif",
    "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExbG4yd2tpZWllcWx0ZXZoYnN0ZmRnNzRtam83cnRkOXpzMGJlajNrMiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/iLD0cclRovNFC/giphy.gif"
];

let currentHoverGif = "";

function startHover() {
    clearInterval(normalInterval); // Clear the interval for normal GIFs

    // Choose a random hover gif
    currentHoverGif = getRandomGif(hoverGifs);
    document.querySelector('.hover').src = currentHoverGif;

    // Add a class to the container when hovering
    document.querySelector('.container').classList.add('hovering');
}

function stopHover() {
    // Change back to a random normal gif
    const randomNormalGif = getRandomGif(normalGifs);
    document.querySelector('.normal').src = randomNormalGif;

    // Start the interval to change the normal gif every 15 seconds
    normalInterval = setInterval(() => {
        document.querySelector('.normal').src = getRandomGif(normalGifs);
    }, 15000);

    // Remove the class added when not hovering
    document.querySelector('.container').classList.remove('hovering');
}

function getRandomGif(gifArray) {
    const randomIndex = Math.floor(Math.random() * gifArray.length);
    return gifArray[randomIndex];
}
