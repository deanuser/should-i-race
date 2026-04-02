import { c as createComponent } from './consts_DGtZZUut.mjs';
import 'piccolore';
import { m as maybeRenderHead, e as addAttribute, r as renderTemplate } from './ssr-function_DFINGRnz.mjs';
import 'clsx';

const $$WindArrow = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$WindArrow;
  const { windDeg, speed } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="flex flex-col items-center justify-center p-4"> <div class="w-32 h-32 rounded-full border-2 border-brightcyan/30 flex items-center justify-center bg-card-border/50 relative shadow-[0_0_20px_rgba(34,227,213,0.1)]">  <span class="absolute top-2 text-xs font-bold text-slate-500">N</span> <span class="absolute bottom-2 text-xs font-bold text-slate-500">S</span> <span class="absolute right-2 text-xs font-bold text-slate-500">E</span> <span class="absolute left-2 text-xs font-bold text-slate-500">W</span> <div class="text-brightcyan transition-transform duration-500 drop-shadow-[0_0_8px_rgba(34,227,213,0.6)]"${addAttribute(`transform: rotate(${windDeg + 180}deg);`, "style")}> <svg xmlns="http://www.w3.org/2000/svg" class="w-14 h-14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"> <line x1="12" y1="19" x2="12" y2="5"></line> <polyline points="5 12 12 5 19 12"></polyline> </svg> </div> </div> <div class="mt-6 text-center"> <div class="flex items-baseline justify-center gap-1"> <span class="text-4xl font-extrabold text-white">${speed.toFixed(1)}</span> <span class="text-slate-400 font-medium">m/s</span> </div> <div class="text-sm font-medium text-slate-400 mt-1">Wind Speed</div> </div> </div>`;
}, "/Users/deandavis/Documents/Work/Should I Run/astro/src/components/WindArrow.astro", void 0);

function getRelativeWind(windDeg, trackDirection) {
  const relativeBearing = (windDeg - trackDirection + 360) % 360;
  if (relativeBearing > 330 || relativeBearing <= 30) {
    return "Headwind. Go training instead";
  }
  if (relativeBearing >= 31 && relativeBearing <= 70) {
    return "Headwind for 100m & 200m";
  }
  if (relativeBearing >= 71 && relativeBearing <= 90) {
    return "Crosswind. Not great for the 200m";
  }
  if (relativeBearing >= 91 && relativeBearing <= 150) {
    return "Slight tailwind 100m, headwind on the bend";
  }
  if (relativeBearing >= 151 && relativeBearing <= 220) {
    return "Tailwind. Great for a 100m";
  }
  if (relativeBearing >= 221 && relativeBearing <= 270) {
    return "Following crosswind. Good for 200m";
  }
  if (relativeBearing >= 271 && relativeBearing <= 330) {
    return "Headwind 100m. Ok for 200m bend";
  }
  return "Variable wind";
}
function getWindCategory(windDeg, trackDirection) {
  const relativeBearing = (windDeg - trackDirection + 360) % 360;
  if (relativeBearing > 330 || relativeBearing <= 30) return "headwind";
  if (relativeBearing >= 31 && relativeBearing <= 70) return "headwind";
  if (relativeBearing >= 71 && relativeBearing <= 90) return "crosswind";
  if (relativeBearing >= 91 && relativeBearing <= 150) return "mixed";
  if (relativeBearing >= 151 && relativeBearing <= 220) return "tailwind";
  if (relativeBearing >= 221 && relativeBearing <= 270) return "tailwind";
  if (relativeBearing >= 271 && relativeBearing <= 330) return "mixed";
  return "mixed";
}
function shieldWindSpeed(speed) {
  return speed * 0.3;
}
function getWindColor(windDesc) {
  switch (windDesc) {
    case "Headwind. Go training instead":
    case "Headwind for 100m & 200m":
    case "Crosswind. Not great for the 200m":
      return "red";
    case "Slight tailwind 100m, headwind on the bend":
    case "Headwind 100m. Ok for 200m bend":
      return "orange";
    case "Following crosswind. Good for 200m":
    case "Tailwind. Great for a 100m":
      return "green";
    default:
      return "slate";
  }
}

const $$ForecastGrid = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$ForecastGrid;
  const { forecasts, trackDirection } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full"> ${forecasts.map((f) => {
    const date = new Date(f.dt * 1e3);
    const time = date.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Europe/London"
    });
    const iconUrl = `https://openweathermap.org/img/wn/${f.weather[0].icon}@2x.png`;
    getWindCategory(f.wind.deg, trackDirection);
    const windDesc = getRelativeWind(f.wind.deg, trackDirection);
    const windColor = getWindColor(windDesc);
    let borderClass = "border-white/5";
    if (windColor === "green")
      borderClass = "border-green-500/40 shadow-[0_0_10px_rgba(34,197,94,0.1)]";
    else if (windColor === "orange")
      borderClass = "border-orange-500/40 shadow-[0_0_10px_rgba(249,115,22,0.1)]";
    else if (windColor === "red")
      borderClass = "border-red-500/40 shadow-[0_0_10px_rgba(239,68,68,0.1)]";
    return renderTemplate`<div${addAttribute(`flex flex-col items-center p-4 rounded-2xl bg-gradient-to-br from-card-border/40 to-card-border/10 border-2 transition-all hover:scale-[1.03] ${borderClass}`, "class")}> <span class="text-sm font-semibold text-slate-300 mb-1">${time}</span> <div class="relative"> <img${addAttribute(iconUrl, "src")}${addAttribute(f.weather[0].description, "alt")} class="w-12 h-12 drop-shadow-lg scale-110"> </div> <div class="flex flex-col items-center mt-2 text-center w-full"> <div class="flex items-center gap-1.5 text-brightcyan"> <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 mt-0.5 opacity-80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"${addAttribute(`transform: rotate(${f.wind.deg + 180}deg)`, "style")}> <line x1="12" y1="19" x2="12" y2="5"></line> <polyline points="5 12 12 5 19 12"></polyline> </svg> <span class="font-extrabold text-lg tracking-tight"> ${f.wind.speed.toFixed(1)} <span class="text-[10px] ml-0.5 opacity-70">m/s</span> </span> </div> <span class="text-xs text-slate-400 mt-1 capitalize leading-tight"> ${f.weather[0].description} </span> <div class="mt-2.5 pt-2.5 border-t border-white/5 w-full"> <span${addAttribute(`text-[10px] font-bold leading-tight block ${windColor === "red" ? "text-red-400" : windColor === "orange" ? "text-orange-400" : windColor === "green" ? "text-green-400" : "text-slate-300"}`, "class")}> ${windDesc} </span> </div> </div> </div>`;
  })} </div>`;
}, "/Users/deandavis/Documents/Work/Should I Run/astro/src/components/ForecastGrid.astro", void 0);

const $$DailyForecast = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$DailyForecast;
  const { forecasts, trackDirection } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="grid grid-cols-2 md:grid-cols-5 gap-4 w-full"> ${forecasts.map((f, i) => {
    const date = new Date(f.dt * 1e3);
    const label = i === 0 ? "Today" : date.toLocaleDateString("en-GB", { weekday: "short", timeZone: "Europe/London" });
    const iconUrl = `https://openweathermap.org/img/wn/${f.weather[0].icon}@2x.png`;
    getWindCategory(f.wind.deg, trackDirection);
    const windDesc = getRelativeWind(f.wind.deg, trackDirection);
    const windColor = getWindColor(windDesc);
    let borderClass = "border-white/5";
    if (windColor === "green") borderClass = "border-green-500/40 shadow-[0_0_10px_rgba(34,197,94,0.1)]";
    else if (windColor === "orange") borderClass = "border-orange-500/40 shadow-[0_0_10px_rgba(249,115,22,0.1)]";
    else if (windColor === "red") borderClass = "border-red-500/40 shadow-[0_0_10px_rgba(239,68,68,0.1)]";
    return renderTemplate`<div${addAttribute(`flex flex-col items-center p-4 rounded-2xl bg-gradient-to-br from-card-border/40 to-card-border/10 border-2 transition-all hover:scale-[1.03] ${borderClass}`, "class")}> <span class="text-sm font-semibold text-slate-300 mb-1">${label}</span> <div class="relative"> <img${addAttribute(iconUrl, "src")}${addAttribute(f.weather[0].description, "alt")} class="w-12 h-12 drop-shadow-lg scale-110"> </div> <div class="flex flex-col items-center mt-2 w-full text-center"> <div class="text-white font-bold text-lg mb-1">${f.temp.toFixed(0)}°</div> <div class="flex items-center gap-1 text-brightcyan"> <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 mt-0.5 opacity-80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"${addAttribute(`transform: rotate(${f.wind.deg + 180}deg)`, "style")}> <line x1="12" y1="19" x2="12" y2="5"></line> <polyline points="5 12 12 5 19 12"></polyline> </svg> <span class="font-extrabold text-sm tracking-tight">${f.wind.speed.toFixed(1)}m/s</span> </div> <span class="text-xs text-slate-400 mt-1 capitalize truncate w-full px-2 leading-tight"${addAttribute(f.weather[0].description, "title")}>${f.weather[0].description}</span> <div class="mt-2.5 pt-2.5 border-t border-white/5 w-full"> <span${addAttribute(`text-[10px] font-bold leading-tight block ${windColor === "red" ? "text-red-400" : windColor === "orange" ? "text-orange-400" : windColor === "green" ? "text-green-400" : "text-slate-300"}`, "class")}> ${windDesc} </span> </div> </div> </div>`;
  })} </div>`;
}, "/Users/deandavis/Documents/Work/Should I Run/astro/src/components/DailyForecast.astro", void 0);

export { $$WindArrow as $, getWindCategory as a, $$ForecastGrid as b, $$DailyForecast as c, getRelativeWind as g, shieldWindSpeed as s };
