//task 1: take a screenshot.

const puppeteer = require('puppeteer')

async function start() {
    const browser = await puppeteer.launch() //launch a browser and 
    //wait

    const page = await browser.newPage() //launch a new page

    await page.goto("https://learnwebcode.github.io/practice-requests/") //redirect to this page


    await page.screenshot({path: "amazing.png", fullPage: true/*so, long page will still be taken screenshot wholly.*/})

    await browser.close()
}

start()