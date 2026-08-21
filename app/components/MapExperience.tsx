"use client";

import { useEffect, useRef, useState } from "react";
import { AttributionControl, GeolocateControl, Map as LibreMap, Marker, NavigationControl, setWorkerUrl } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { beaches } from "../lib/beaches";
import { DataIcon } from "./ProductShell";

setWorkerUrl("/maplibre/maplibre-gl-worker.mjs");
const tileUrl = process.env.NEXT_PUBLIC_MAP_TILE_URL || "https://tile.openstreetmap.org/{z}/{x}/{y}.png";

export function MapExperience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<LibreMap | null>(null);
  const markersRef = useRef(new Map<string, HTMLElement>());
  const [selectedSlug, setSelectedSlug] = useState("stella-maris");
  const [mapUnavailable, setMapUnavailable] = useState(false);
  const selected = beaches.find((beach) => beach.slug === selectedSlug) ?? beaches[0];

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;
    const markerElements = markersRef.current;
    try {
      const map = new LibreMap({
        container: containerRef.current,
        center: [-38.425, -12.982],
        zoom: 10.45,
        minZoom: 10,
        maxZoom: 17,
        maxBounds: [[-38.64, -13.16], [-38.20, -12.78]],
        attributionControl: false,
        cooperativeGestures: true,
        style: {
          version: 8,
          sources: { osm: { type: "raster", tiles: [tileUrl], tileSize: 256, attribution: "© OpenStreetMap contributors" } },
          layers: [{ id: "osm", type: "raster", source: "osm", paint: { "raster-saturation": -0.55, "raster-contrast": 0.18, "raster-brightness-min": 0.16, "raster-brightness-max": 0.72 } }],
        },
      });
      map.addControl(new NavigationControl({ showCompass: false }), "top-left");
      map.addControl(new GeolocateControl({ positionOptions: { enableHighAccuracy: true }, trackUserLocation: false }), "top-left");
      map.addControl(new AttributionControl({ compact: true, customAttribution: "Mapa QuiPraia" }), "bottom-left");
      beaches.forEach((beach) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = `surf-map-marker condition-${beach.condition.toLowerCase()}${beach.slug === "stella-maris" ? " selected" : ""}`;
        button.setAttribute("aria-label", `Selecionar ${beach.name}`);
        button.innerHTML = `<i></i><span>${beach.name}</span>`;
        button.addEventListener("click", () => {
          setSelectedSlug(beach.slug);
          map.easeTo({ center: [beach.lon, beach.lat], zoom: Math.max(map.getZoom(), 13), duration: 700 });
        });
        markerElements.set(beach.slug, button);
        new Marker({ element: button, anchor: "bottom-left" }).setLngLat([beach.lon, beach.lat]).addTo(map);
      });
      mapRef.current = map;
      return () => { markerElements.clear(); map.remove(); mapRef.current = null; };
    } catch {
      queueMicrotask(() => setMapUnavailable(true));
    }
  }, []);

  useEffect(() => {
    markersRef.current.forEach((element, slug) => element.classList.toggle("selected", slug === selectedSlug));
  }, [selectedSlug]);

  function selectFromFallback(slug: string) {
    setSelectedSlug(slug);
    const beach = beaches.find((item) => item.slug === slug);
    if (beach && mapRef.current) mapRef.current.easeTo({ center: [beach.lon, beach.lat], zoom: 13, duration: 700 });
  }

  return <div className="map-experience">
    <section className="session-map real-session-map" aria-label="Mapa interativo das praias de Salvador">
      <div ref={containerRef} className="maplibre-container" />
      {mapUnavailable ? <div className="map-fallback"><strong>Mapa temporariamente indisponível</strong><span>Escolha uma praia na lista para ver as condições.</span>{beaches.map((beach) => <button key={beach.slug} onClick={() => selectFromFallback(beach.slug)}>{beach.name}<small>{beach.condition}</small></button>)}</div> : null}
      <label className="map-picker">Escolher praia<select value={selectedSlug} onChange={(event) => selectFromFallback(event.target.value)}>{beaches.map((beach) => <option value={beach.slug} key={beach.slug}>{beach.name}</option>)}</select></label>
      <div className="map-legend"><span><i className="good" /> Bom</span><span><i className="regular" /> Regular</span><span><i className="weak" /> Fraco</span></div>
    </section>
    <aside className="map-detail"><figure><img src={selected.image} style={{ objectPosition: selected.imagePosition }} alt={`Vista editorial de ${selected.name}`} /><figcaption>Imagem editorial QuiPraia</figcaption></figure><span className="hot-kicker">Praia selecionada</span><h2>{selected.name}</h2><b className={`condition-pill ${selected.condition.toLowerCase()}`}>● {selected.condition}</b><div className="map-metrics"><Metric icon="waves" label="Ondas" value={`${selected.wave.toFixed(1)} m`} /><Metric icon="period" label="Período" value={`${selected.period} s`} /><Metric icon="wind" label="Vento" value={`${selected.windDirection} · ${selected.wind} km/h`} /><Metric icon="tide" label="Nível do mar" value={`${selected.tide.toFixed(1)} m ↑`} /></div><p>Session Pulse <strong>{selected.score}/100</strong></p><div className="pulse-track"><i style={{ width: `${selected.score}%` }} /></div><a className="coral-action" href={`/praias/${selected.slug}`}>Abrir praia</a></aside>
  </div>;
}

function Metric({ icon, label, value }: { icon: string; label: string; value: string }) { return <div><DataIcon name={icon} /><span>{label}<strong>{value}</strong></span></div>; }
