require("dotenv").config();
const { expect } = require("chai");
const puppeteer = require("puppeteer-extra");

const StealthPlugin = require("puppeteer-extra-plugin-stealth");
puppeteer.use(StealthPlugin());

let page;

describe("Change Availability on Malt Website", () => {
    before(async () => {
        browser = await puppeteer.launch({
            headless: true,
            args: [
                "--window-size=1920,1080",
                "--no-sandbox",
                "--disable-setuid-sandbox"
            ]
        });
        page = await browser.newPage();
    });

    beforeEach(async () => {
        await new Promise((resolve) =>
            setTimeout(resolve, process.env.TESTS_TIMEOUT)
        );
    });

    it("GoTo Main Page", async () => {
        await page.goto("https://en.malt.fr/signin");
    });

    it("Fill the connection form", async () => {
        // Fill the email field
        await page.focus("#j_username");
        await page.keyboard.type(process.env.USER_EMAIL);
        // Fill the password field
        await page.focus("#j_password");
        await page.keyboard.type(process.env.USER_PASSWORD);
        // Click on the login button
        await page.keyboard.press("Enter");
        await page.waitForNavigation();
        await expect(page.url()).is.not.equal(
            "https://en.malt.fr/signin?error=bad_credentials"
        );
    });

    it("Switch to Profile", async () => {
        await page.goto("https://en.malt.fr/profile#edit-availability");
    });

    it("Accepte Legal Popup if present", async () => {
        await page.evaluate(() => {
            let accept = document.querySelector("#legalAcceptCta > button");
            accept.click();
        });
    });

    if (process.env.AVAILABLE == "AVAILABLE") {
        it("Select Available", async () => {
            // Click on the Radio button
            await page.evaluate(() => {
                let radio = document.querySelector("#availabilityAVAILABLE");
                radio.click();
            });
            const checkAvailable = await page.$eval(
                "#availabilityAVAILABLE",
                (el) => el.checked
            );
            expect(checkAvailable).to.be.true;
        });

        it("Select Frequency", async () => {
            page.select("#frequency", process.env.AVAILABILITY_FREQUENCY);
        });

        it("Submit the availability", async () => {
            // Click on the Submit button
            await page.click(
                "#profileAvailability > form > div > div > joy-button:nth-child(2) > button"
            );
        });

        it("Check Updated Status", async () => {
            const availability = await page.$eval(
                "#profileAvailabilityEdit > joy-tooltip-trigger > div > joy-availability",
                (el) => el.label
            );
            expect(availability).to.include("Available (confirmed)");
        });
    } else {
        it("Select Not Available", async () => {
            // Click on the Radio button
            await page.evaluate(() => {
                let radio = document.querySelector("#availabilityNOT_AVAILABLE");
                radio.click();
            });
            const checkAvailable = await page.$eval(
                "#availabilityNOT_AVAILABLE",
                (el) => el.checked
            );
            expect(checkAvailable).to.be.true;
        });

        it("Select Frequency Being Available", async () => {
            // Click on the Radio button
            if (process.env.NOT_AVAILABLE != "CUSTOM_DATE") {
                const frequency =
                    "#input-next-availability-date-" + process.env.NOT_AVAILABLE;
                await page.evaluate(
                    ({ frequency }) => {
                        let radio = document.querySelector(frequency);
                        radio.click();
                    }, { frequency }
                );
                const checkAvailable = await page.$eval(
                    "#availabilityNOT_AVAILABLE",
                    (el) => el.checked
                );
                expect(checkAvailable).to.be.true;
            } else {
                await page.focus(
                    "#profileAvailability > form > fieldset:nth-child(3) > div > label > input[type=text]:nth-child(1)"
                );
                await page.keyboard.type(process.env.NOT_AVAILABLE_CUSTOM_DATE);
                await page.keyboard.press("Enter");
            }
        });

        it("Submit the availability", async () => {
            // Click on the Submit button
            await page.click(
                "#profileAvailability > form > div > div > joy-button:nth-child(2) > button"
            );
        });

        it("Check Updated Status", async () => {
            const availability = await page.$eval(
                "#profileAvailabilityEdit > joy-tooltip-trigger > div > joy-availability",
                (el) => el.label
            );
            expect(availability).to.include("Available at a later");
        });
    }

    after(async () => {
        await browser.close();
    });
});