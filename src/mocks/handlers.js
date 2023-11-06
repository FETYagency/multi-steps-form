import { HttpResponse, http, delay } from "msw";
export const handlers = [
  http.post("/toServer", async ({ request }) => {
    console.log("dlkfjasl");
    const data = await request.json();
    await delay(1300);
    return HttpResponse.json(data);
  }),
];
