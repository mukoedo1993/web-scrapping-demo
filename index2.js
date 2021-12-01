//task 2: save image file to hard drive.

const puppeteer = require('puppeteer')

const fs = require('fs/promises')

async function start() {
    const browser = await puppeteer.launch() //launch a browser and 
    //wait

    const page = await browser.newPage() //launch a new page

    await page.goto("https://learnwebcode.github.io/practice-requests/") //redirect to this page


    const names = await page.evaluate(() =>{
        return Array.from(document.querySelectorAll(".info strong")).map(x => x.textContent)
    })
    await fs.writeFile("names.txt", names.join("\r\n"))//join: how do you glue together different items in a string

    const photos = await page.$$eval("img", (imgs) => {
        return imgs.map(x => x.src)
    })

    for(const photo of photos) {
        const imagepage = await page.goto(photo)
        await fs.writeFile(photo.split("/").pop(), await imagepage.buffer())
    }

    await browser.close() //otherwise, run endlessly.
}

start()