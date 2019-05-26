const puppeteer = require('puppeteer')

const appUrlBase = 'http://localhost:3000/colorful-movies-frontend'
const routes = {
    public: {
        panel: `${appUrlBase}/`,
        noMatch: `${appUrlBase}/404test`,
        movies: `${appUrlBase}/movies`,
        movie: `${appUrlBase}/movies/tt1951264`,
        profile: `${appUrlBase}/profile`,
    },
    // private: {
    //     movies: `${appUrlBase}/movies`,
    //     profile: `${appUrlBase}/profile`,
    // },
}

let browser
let page

beforeAll(async () => {
    browser = await puppeteer.launch({
            headless: true,
            slowMo: 100,
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

// TODO: Change when authorization is implemented
describe('Movies test', () => {
    test('Fetching movies', async () => {
        await page.goto(routes.public.movies)
        await page.waitForSelector('.container-fluid')

        await page.click('#root > div > div.container-fluid > form > input:nth-child(1)')
        await page.type('#root > div > div.container-fluid > form > input:nth-child(1)', 'Fire')

        await page.click('#root > div > div.container-fluid > form > input:nth-child(2)')
        await page.type('#root > div > div.container-fluid > form > input:nth-child(2)', '2016')

        await page.click('#root > div > div.container-fluid > form > input.btn.btn-primary')

        await page.waitForSelector('#root > div > div.container-fluid > div > table > tbody > tr:nth-child(1)')

        const tableRows = await page.$$('.table tbody')

        const numberOfRows = tableRows.length
        expect(numberOfRows).toBeGreaterThan(0)
    }, 1600000)
})

// TODO: Change when authorization is implemented
describe('Movie test', () => {
    test('Fetching movie', async () => {
        await page.goto(routes.public.movie)
        await page.waitForSelector('#root > div > div.container-fluid > h1')

        const title = await page.$eval('#root > div > div.container-fluid > h1', e => e.innerHTML)

        expect(title).toBe('The Hunger Games: Catching Fire')
    }, 1600000)

    test('Rating', async () => {
        await page.goto(routes.public.movie)
        await page.waitForSelector('#root > div > div.container-fluid > div > div:nth-child(2) > div > button.btn-sm.btn-info.mr-2')

        await page.click('#root > div > div.container-fluid > div > div:nth-child(2) > div > button.btn-sm.btn-info.mr-2')

        const ratings = await page.$$('#root > div > div.container-fluid > div > div:nth-child(2) > div > ul > li > div')

        expect(ratings.length).toBeGreaterThan(0)
    }, 1600000)
})

describe('404 Page test', () => {
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
