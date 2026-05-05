# Low-Fidelity Wireframes

These wireframes define responsive structure for the 5 key pages.

## 1. Home / Route Planner

### Desktop

```
+--------------------------------------------------------------+
| Navbar: Logo | Plan Trip | My Bookings | Add Charger | User |
+--------------------------------------------------------------+
| Hero: "Plan smarter EV trips with shared chargers"           |
| [Verified chargers] [Live availability] [AI predictions]     |
+------------------------------+-------------------------------+
| RouteForm                    | RoutePreviewCard (if planned) |
| Source [______________]      | Distance: 142 km              |
| Destination [_________]      | ETA: 2h 20m                   |
| Battery % [---slider----]    | Arrival SoC: 18%              |
| Vehicle [dropdown]           | Stops Needed: 1               |
| [ Plan Route ]               | [ View on Map ]               |
+------------------------------+-------------------------------+
```

### Mobile

```
Navbar
Hero
RouteForm (stacked)
Plan Route button (full width)
Route preview card
```

## 2. Map View

### Desktop

```
+-----------------------------+-------------------------------+
| Map (route polyline)        | Summary Tab                   |
| Start/End pins              | Charger Tab                   |
| Charger markers             | Stops Tab                     |
| Recommended marker (pulse)  | Filter chips                 |
+-----------------------------+-------------------------------+
```

### Mobile

```
Full-screen map
BottomSheet (drag handle)
Tabs: Summary | Chargers | Stops
```

## 3. Charger Details

```
Header: Charger Name + Verified + Rating
Address / Distance
Price per kWh + Dynamic pricing badge
Availability timeline
Connector + Power info
Owner notes / photos
Sticky bottom: [Book This Charger]
```

## 4. Booking Page

```
Step 1: Date picker + Time slot grid
Step 2: Booking summary card
Step 3: Confirmation card with Booking ID
Primary CTA changes by step
```

## 5. Add Charger

```
Section 1: Location search + map pin
Section 2: Charger specs
Section 3: Pricing + dynamic pricing toggle
Section 4: Availability schedule
Section 5: Notes + photos
[Preview] [Save Draft] [Publish]
```

