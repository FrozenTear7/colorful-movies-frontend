const puppeteer = require('puppeteer')

const appUrlBase = 'http://localhost:3000/colorful-movies-frontend'
const routes = {
    public: {
        panel: `${appUrlBase}/`,
        noMatch: `${appUrlBase}/404test`,
    },
    private: {
        movies: `${appUrlBase}/movies`,
        profile: `${appUrlBase}/profile`,
    },
}

let browser
let page

beforeAll(async () => {
    browser = await puppeteer.launch({
            headless: true,
            slowMo: 250,
        },
    )

    page = await browser.newPage()
})

describe('Main panel test', () => {
    test('Main panel loads correctly', async () => {
        await page.goto(routes.public.panel)
        await page.waitForSelector('.container-fluid')

        const title = await page.$eval('.container-fluid .welcome-fade h2', e => e.innerHTML)
        expect(title).toBe('Welcome to Afterimage!')
    }, 1600000)
})

describe('404 Page', () => {
    test('404 page for nonexistent views', async () => {
        await page.goto(routes.public.noMatch)
        await page.waitForSelector('.container-fluid')

        const title = await page.$eval('.container-fluid h1', e => e.innerHTML)
        expect(title).toBe('Page not found!')
    }, 9000000)
})

afterAll(() => {
    browser.close()
})
