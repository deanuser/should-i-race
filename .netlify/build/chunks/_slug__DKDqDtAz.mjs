import { c as createComponent } from './consts_DGtZZUut.mjs';
import 'piccolore';
import { g as renderComponent, r as renderTemplate, m as maybeRenderHead, h as Fragment, e as addAttribute } from './ssr-function_DFINGRnz.mjs';
import { g as getCollection, $ as $$Layout, a as $$Navbar, b as $$PartnerBanner } from './PartnerBanner_D2JhUW7f.mjs';
import { s as shieldWindSpeed, g as getRelativeWind, a as getWindCategory, $ as $$WindArrow, b as $$ForecastGrid, c as $$DailyForecast } from './DailyForecast_DnsbhNwQ.mjs';

const $$slug = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$slug;
  const { country, region, subRegion, slug } = Astro2.params;
  const tracks = await getCollection("tracks");
  const track = tracks.find(
    (t) => t.data.slug === slug && t.data.country === country && t.data.region === region && t.data.subRegion === subRegion
  );
  if (!track) {
    return Astro2.redirect("/404");
  }
  if (subRegion === "all") {
    return Astro2.redirect(`/${country}/${region}/${slug}`);
  }
  const API_KEY = "bf68f7bbea8ccf9cca32c3bda4ff35f0";
  let isMocked = !API_KEY;
  let currentWind = { speed: 0, deg: 0, desc: "", icon: "" };
  let currentTemp = 0;
  let forecasts = [];
  let dailyForecasts = [];
  if (!isMocked) {
    try {
      const weatherRes = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${track.data.lat}&lon=${track.data.lng}&appid=${API_KEY}&units=metric`
      );
      if (weatherRes.ok) {
        const weatherData = await weatherRes.json();
        currentWind = {
          speed: shieldWindSpeed(weatherData.wind.speed),
          deg: weatherData.wind.deg,
          desc: weatherData.weather[0].description,
          icon: weatherData.weather[0].icon
        };
        currentTemp = weatherData.main.temp;
      } else {
        isMocked = true;
      }
      const forecastRes = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${track.data.lat}&lon=${track.data.lng}&appid=${API_KEY}&units=metric`
      );
      if (forecastRes.ok) {
        const forecastData = await forecastRes.json();
        forecasts = forecastData.list.slice(0, 4).map((f) => ({
          dt: f.dt,
          main: { temp: f.main.temp },
          wind: { speed: shieldWindSpeed(f.wind.speed), deg: f.wind.deg },
          weather: f.weather
        }));
        const dailyData = [];
        const seenDates = /* @__PURE__ */ new Set();
        for (const f of forecastData.list) {
          const dateStr = new Date(f.dt * 1e3).toDateString();
          if (!seenDates.has(dateStr)) {
            const noonEntry = forecastData.list.find(
              (entry) => new Date(entry.dt * 1e3).toDateString() === dateStr && entry.dt_txt?.includes("12:00:00")
            );
            dailyData.push(noonEntry || f);
            seenDates.add(dateStr);
          }
        }
        dailyForecasts = dailyData.slice(0, 5).map((f) => ({
          dt: f.dt,
          temp: f.main.temp,
          wind: { speed: shieldWindSpeed(f.wind.speed), deg: f.wind.deg },
          weather: f.weather
        }));
      }
    } catch (e) {
      console.error("Failed to fetch from OpenWeather, using mock", e);
      isMocked = true;
    }
  }
  if (isMocked) {
    currentWind = {
      speed: shieldWindSpeed(3.2),
      deg: 210,
      desc: "scattered clouds",
      icon: "01d"
    };
    currentTemp = 14.5;
    const now = Math.floor(Date.now() / 1e3);
    forecasts = [
      {
        dt: now + 3600 * 3,
        main: { temp: 15 },
        wind: { speed: shieldWindSpeed(2.1), deg: 190 },
        weather: [{ description: "clear sky", icon: "01d" }]
      },
      {
        dt: now + 3600 * 6,
        main: { temp: 14 },
        wind: { speed: shieldWindSpeed(3.5), deg: 180 },
        weather: [{ description: "few clouds", icon: "02d" }]
      },
      {
        dt: now + 3600 * 9,
        main: { temp: 12 },
        wind: { speed: shieldWindSpeed(4.8), deg: 150 },
        weather: [{ description: "scattered clouds", icon: "03n" }]
      },
      {
        dt: now + 3600 * 12,
        main: { temp: 10 },
        wind: { speed: shieldWindSpeed(5.2), deg: 140 },
        weather: [{ description: "light rain", icon: "10n" }]
      }
    ];
    dailyForecasts = [
      {
        dt: now,
        temp: 15,
        wind: { speed: shieldWindSpeed(3.5), deg: 180 },
        weather: [{ description: "few clouds", icon: "02d" }]
      },
      {
        dt: now + 86400,
        temp: 14,
        wind: { speed: shieldWindSpeed(4.8), deg: 150 },
        weather: [{ description: "scattered clouds", icon: "03n" }]
      },
      {
        dt: now + 86400 * 2,
        temp: 12,
        wind: { speed: shieldWindSpeed(5.2), deg: 140 },
        weather: [{ description: "light rain", icon: "10n" }]
      },
      {
        dt: now + 86400 * 3,
        temp: 10,
        wind: { speed: shieldWindSpeed(6.5), deg: 120 },
        weather: [{ description: "moderate rain", icon: "10d" }]
      },
      {
        dt: now + 86400 * 4,
        temp: 16,
        wind: { speed: shieldWindSpeed(2.1), deg: 210 },
        weather: [{ description: "clear sky", icon: "01d" }]
      }
    ];
  }
  const relativeWindDescription = getRelativeWind(
    currentWind.deg,
    track.data.trackDirection
  );
  const currentWindCategory = getWindCategory(
    currentWind.deg,
    track.data.trackDirection
  );
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": `${track.data.name} Wind Conditions | Should I Race?`, "description": `Live wind directions for ${track.data.name}` }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Navbar", $$Navbar, {})} ${maybeRenderHead()}<main class="container mx-auto px-4 py-8 lg:py-12 mt-16 max-w-6xl animate-fade-in"> ${isMocked && renderTemplate`<div class="mb-6 p-4 rounded-xl bg-orange-500/10 border-2 border-orange-500/20 text-orange-200 text-sm flex items-center gap-3"> <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"> ${renderComponent($$result2, "Fragment", Fragment, {}, { "default": async ($$result3) => renderTemplate` <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path> <line x1="12" y1="9" x2="12" y2="13"></line> <line x1="12" y1="17" x2="12.01" y2="17"></line> ` })} </svg> <span>
Running with mocked weather data. Set OPENWEATHER_API_KEY in .env to
            enable live data.
</span> </div>`} <!-- Breadcrumbs --> <nav class="flex text-sm text-slate-400 font-medium mb-8 bg-card-bg/50 border border-white/5 w-fit px-4 py-2 rounded-lg flex-wrap items-center gap-2"> <a href="/" class="hover:text-brightcyan transition-colors">Home</a> <span class="opacity-50">/</span> <a${addAttribute(`/${country}`, "href")} class="hover:text-brightcyan capitalize transition-colors">${country}</a> <span class="opacity-50">/</span> <a${addAttribute(`/${country}/${region}`, "href")} class="hover:text-brightcyan capitalize transition-colors">${region?.replace(/-/g, " ")}</a> <span class="opacity-50">/</span> <a${addAttribute(`/${country}/${region}/${subRegion}`, "href")} class="hover:text-brightcyan capitalize transition-colors">${subRegion?.replace(/-/g, " ")}</a> <span class="opacity-50">/</span> <span class="text-white capitalize font-bold">${track.data.name}</span> </nav> <!-- Header Section --> <header class="mb-8"> <h1 class="text-4xl md:text-5xl lg:text-6xl text-white mb-2"> ${track.data.name} </h1> <p class="text-slate-400 text-lg flex items-center gap-2"> <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg> ${track.data.city} (Track Heading: ${track.data.trackDirection}°)
</p> </header> <!-- Bento Box Grid --> <div class="grid grid-cols-1 md:grid-cols-3 gap-6"> <!-- Current Conditions (Large Box) --> <div${addAttribute(`bento-card md:col-span-2 relative overflow-hidden flex flex-col justify-between group transition-all duration-300 border-2 ${currentWindCategory === "tailwind" ? "border-brightcyan/40 shadow-[0_0_15px_rgba(34,227,213,0.15)]" : currentWindCategory === "headwind" ? "border-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.15)]" : "border-white/10 hover:border-white/20"}`, "class")}> <div class="absolute inset-0 bg-gradient-to-br from-brightcyan/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div> <div class="relative z-10 flex justify-between items-start mb-6"> <div class="flex items-center gap-4"> ${currentWind.icon && renderTemplate`<div class="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center border border-white/5"> <img${addAttribute(`https://openweathermap.org/img/wn/${currentWind.icon}@2x.png`, "src")}${addAttribute(currentWind.desc, "alt")} class="w-full h-full object-contain"> </div>`} <div> <h2 class="text-2xl font-bold text-white mb-1">Live Wind</h2> <p class="text-slate-400 capitalize">${currentWind.desc}</p> </div> </div> </div> <div class="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 mt-auto"> <div class="flex-1"> <p class="text-3xl md:text-5xl capitalize font-extrabold text-white leading-tight"> ${relativeWindDescription} </p> </div> <div class="flex-shrink-0 bg-deepdark/50 rounded-full p-4 border border-white/5"> ${renderComponent($$result2, "WindArrow", $$WindArrow, { "windDeg": currentWind.deg, "speed": currentWind.speed })} </div> </div> </div> <!-- Track Map View (Small Box) --> <div class="bento-card p-0 overflow-hidden relative group min-h-[300px]"> <iframe width="100%" height="100%" style="border:0; filter: contrast(1.1) brightness(0.9) saturate(1.1);" loading="lazy" allowfullscreen${addAttribute(`https://maps.google.com/maps?q=${track.data.lat},${track.data.lng}&t=k&z=17&ie=UTF8&iwloc=&output=embed`, "src")}></iframe> <!-- Overlay for Track Direction --> <div class="absolute bottom-4 left-4 right-4 bg-deepdark/80 backdrop-blur-md border border-white/10 rounded-xl p-3 flex items-center justify-between group-hover:bg-deepdark transition-colors duration-300 pointer-events-none"> <div> <p class="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-0.5">
Track Heading
</p> <p class="text-xl font-black text-white leading-none"> ${track.data.trackDirection}°
</p> </div> <div class="bg-brightcyan/20 p-2 rounded-lg text-brightcyan"> <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path><line x1="4" y1="22" x2="4" y2="15"></line></svg> </div> </div> <!-- Open in Google Maps link --> <a${addAttribute(`https://www.google.com/maps/search/?api=1&query=${track.data.lat},${track.data.lng}`, "href")} target="_blank" rel="noopener noreferrer" class="absolute top-4 right-4 bg-white/10 hover:bg-brightcyan hover:text-deepdark backdrop-blur-md text-white p-2 rounded-lg transition-all duration-300 border border-white/10" title="Open in Google Maps"> <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg> </a> </div> <div class="bento-card md:col-span-3 hover:border-card-border hover:translate-y-0 hover:shadow-lg"> <h2 class="text-xl font-bold text-white mb-4 flex items-center gap-2"> <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-brightcyan" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
Upcoming Forecast
</h2> ${renderComponent($$result2, "ForecastGrid", $$ForecastGrid, { "forecasts": forecasts, "trackDirection": track.data.trackDirection })} </div> <!-- 5-Day Forecast Grid (Spans full width) --> <div class="bento-card md:col-span-3 hover:border-card-border hover:translate-y-0 hover:shadow-lg"> <h2 class="text-xl font-bold text-white mb-4 flex items-center gap-2"> <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-brightcyan" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
5-Day Forecast
</h2> ${renderComponent($$result2, "DailyForecast", $$DailyForecast, { "forecasts": dailyForecasts, "trackDirection": track.data.trackDirection })} </div> </div> ${renderComponent($$result2, "PartnerBanner", $$PartnerBanner, { "page": "tracks" })} </main> ` })}`;
}, "/Users/deandavis/Documents/Work/Should I Run/astro/src/pages/[country]/[region]/[subRegion]/[slug].astro", void 0);
const $$file = "/Users/deandavis/Documents/Work/Should I Run/astro/src/pages/[country]/[region]/[subRegion]/[slug].astro";
const $$url = "/[country]/[region]/[subRegion]/[slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$slug,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
