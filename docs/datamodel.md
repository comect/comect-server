### The overall process
It all starts when a *Grower* producing grain,
then it is packaged in a *Batch* at some location,
then it is shipped to a *Producer*,
then it is made in some location into a *Brew*,
after which it is distributed to *Venues* and finally,
the *Consumer* enjoys a *Serving*.

``
Batch -> Brew -> Serving
``

### The data model

## Actors
- grower
- producer/maker
- consumer


## Batch
- name: string
- grower: ref
- location: geo-coords
- meta:
    - createdAt: timestamp
    - state: (ready-for-distribution/ready-for-sale/sold)
    - size: (small/medium/large)
    - variety: string/enum

## Brew
- name: string
- batch(es): ref array
- producer/maker: ref
- meta:
    - createdAt: timestamp
    - location (of production): geo-coords
    - tasting_notes: text
    - style: string

## Serving
- brew: ref
- location: geo-coords
- meta:
    - createdAt: timestamp
    - consumer: ref
    - type (small/medium/large): string/enum
    - venue: ref

## Venue
- name: string
- location: geo-coords

## Location
- long: number;
- lat: number;

## Marker
- name: string
- type: string  (Grower / Batch / Producer / Brew / Venues)
- location: Location

## Itinerary
- markers: Marker[];
- routes: Location[];


