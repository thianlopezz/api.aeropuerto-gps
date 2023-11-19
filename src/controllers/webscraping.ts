import puppeteer from "puppeteer";

interface Flight {
  airlineLogo?: string;
  flightNumber: string;
  destination: string;
  itineraryTime: string;
  departureEstimateTime: string;
  status: string;
  departureTime: string;
}

export class WebScrapingController {
  static async getAllNationalDepartureFligths(): Promise<Flight[]> {
    // Launch the browser and open a new blank page
    const browser = await puppeteer.launch(
      process.env.NODE_ENV != "production"
        ? { headless: "new" }
        : {
            headless: "new",
            executablePath: "/usr/bin/chromium-browser",
            args: [
              "--no-sandbox",
              "--headless",
              "--disable-gpu",
              "--disable-dev-shm-usage",
            ],
          }
    );
    const page = await browser.newPage();

    // Navigate the page to a URL
    await page.goto("https://www.tagsa.aero/vuelos-pn.html");

    const flights: Flight[] = await page.evaluate(() => {
      const tds = Array.from(document.querySelectorAll("table#tconsola td"));
      const flights = [];
      for (let i = 0; i < tds.length; i += 7) {
        flights.push({
          airlineLogo: tds[i].querySelector("img")?.src,
          flightNumber: tds[i + 1].textContent || "",
          destination: tds[i + 2].textContent || "",
          itineraryTime: tds[i + 3].textContent || "",
          departureEstimateTime: tds[i + 4].textContent || "",
          status: tds[i + 5].textContent || "",
          departureTime: tds[i + 6].textContent || "",
        });
      }
      return flights;
    });

    await browser.close();

    flights.shift();
    return flights;
  }
}
