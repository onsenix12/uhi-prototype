## Heat Resilience Dashboard (UHI Prototype)

**Heat Resilience Dashboard** is a prototype web app for **urban heat island monitoring** and **cooling intervention planning** for private estates (e.g. MCST / condo management).  
It combines a district overview, 3D building heat map, AI-recommended interventions, impact simulation, grant workflow and post‑installation tracking into a single narrative demo.

### What this app demonstrates

- **Home / Dashboard**: Summary of the user estate (Palm Gardens), showing current heat penalty vs district average, rank, and a prominent alert to explore interventions.
- **Alert view**: A detailed heat alert comparing the estate against the **Bishan district** (best performer, district average, and the user estate).
- **District view**: Map and ranking views of nearby estates, with tooltips and a “your estate” highlight that links into the building view.
- **3D building heat analysis**: Interactive 3D model of towers and ground elements, with hotspots, tooltips and a side panel explaining issues and insights.
- **AI intervention planning**: Ranked list of interventions with cooling impact, cost, ROI, grants, and co‑benefits.
- **Before/after simulation**: 3D comparison of current vs post‑intervention heat, with projected temp reduction, savings and rank improvement.
- **Grant application**: Guided, pre‑filled form for a government grant, including required documents and an auto‑generated reference number.
- **Results tracking**: Post‑installation monitoring with charts, KPIs, timeline and award eligibility.

### Tech stack

- **Frontend**: React (Create React App)
- **Styling**: Tailwind CSS + custom styling
- **3D & visuals**: `react-three-fiber`, `@react-three/drei`, custom heat‑map components
- **Icons**: `lucide-react`
- **Charts**: `recharts`

### Running the app locally

From the project root:

```bash
npm install
npm start
```

- **Dev server**: `http://localhost:3000`
- The app is a pure front‑end prototype; no backend or external APIs are required.

To build a production bundle:

```bash
npm run build
```

---

## Suggested demo flow (10–15 minutes)

This is a narrative script you can follow when demoing.

1. **Set the context (Home / Dashboard)**
   - Explain that this is a **Heat Resilience Dashboard** for a single estate (Palm Gardens) within the Bishan district.  
   - Highlight the **temperature delta** vs district average and the **rank badge**.  
   - Point out the alert banner: “Your estate is warmer than 80% of buildings in Bishan” and click **“View Details”** → this navigates to the **Alert** screen.

2. **Heat Alert & why action is needed**
   - On the **Alert** screen, show:  
     - Key metrics: `+X°C above baseline` and rank in the district.  
     - Comparison bars: **best in district**, **district average**, **your estate**.  
   - Briefly mention impact (higher AC costs, lower outdoor comfort).  
   - Transition options:
     - Click **“Compare with Neighbors”** to go to **District** view, or  
     - Click **“View Building Hotspots”** to jump directly into the 3D building view.

3. **District comparison (optional but useful)**
   - In **District** view, show:
     - Map mode: all estates plotted with color‑coded dots and tooltips.  
     - Ranking mode: list of estates with ranks and temp differences.  
   - Emphasize where the user estate sits in the ranking and that clicking the user estate leads to the **Building** view (or use the “Dashboard” button to navigate and then open Building).

4. **3D building heat map**
   - In **Building 3D View**, demonstrate:
     - Orbit and zoom controls (drag to rotate, scroll to zoom).  
     - Hovering/clicking towers to see average surface temperature and hotspot details.  
     - Side panel content: hotspot summary, building overview, and tips.  
   - Conclude this section by clicking **“Explore Interventions”** at the bottom of the side panel to open **Intervention Options**.

5. **AI‑recommended interventions**
   - On **Recommended Interventions**:
     - Explain that the system ranks interventions (e.g. cool roofs, shading, greenery) by **cooling impact**, **cost**, **grant coverage**, **ROI**, etc.  
     - Click one intervention card to select it (note the selection ring and check icon).
     - Point out the metrics grid (temp reduction, cost range, grant %, ROI years) and co‑benefits (energy, carbon, implementation time).  
   - Click **“Simulate Impact”** to move to **Impact Simulation**.

6. **Before/after impact simulation**
   - In **Impact Simulation**:
     - Show the default **Side by Side** mode (before vs after 3D view).  
     - Optionally toggle modes (**slider**, **before**, **after**) to show different ways of visualising change.  
     - Call out key KPIs: °C reduction, energy savings, cost savings, CO₂ reduction, and projected improvement in district rank.  
   - Click **“Apply for Grant”** to proceed to **Grant Application**.

7. **Grant application journey**
   - On **Grant Application**:
     - Explain that building and intervention info is **pre‑filled** from earlier steps.  
     - Show the estimated cost, grant %, and net cost.  
     - Point out the auto‑attached supporting data.  
     - Tick the required document checkboxes to enable **“Submit Application”** and click it.  
   - Highlight the confirmation screen: reference number, grant amount, and what happens next.  
   - Click **“Track Progress”** to go to **Results Tracking**.

8. **Post‑installation results & storytelling**
   - In **Results Tracking**:
     - Walk through the headline cards: actual temp reduction, rank improvement, energy savings, CO₂ reduction.  
     - Show the **before/after temperature chart** and the **project timeline**.  
     - Mention award eligibility and the call‑to‑action buttons (download/share/report, explore more interventions).  
   - Optionally return to **Dashboard** to close the loop and emphasise the full journey from **alert → analysis → planning → funding → verification**.

---

### Tips for a smooth live demo

- **Resolution**: Use a modern desktop browser at 1280px+ width so the layout shows both 3D and side panels nicely.
- **Timing**: Spend ~1–2 minutes per major screen; you can skip the optional district step if you need a 7–8 minute version.
- **Storyline**: Frame it from the perspective of an estate manager looking for **evidence‑based cooling investments** and **grant support**, guided end‑to‑end by this dashboard.
